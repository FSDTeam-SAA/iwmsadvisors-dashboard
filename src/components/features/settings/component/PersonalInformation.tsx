// src/components/features/settings/component/PersonalInformation.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, User as UserIcon, Mail, Phone, Info, AlertCircle, CheckCircle } from "lucide-react";
import { useProfile, useUpdateProfile, useUploadAvatar } from "../hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";
import NextImage from "next/image";
import { UpdateProfileRequest, User } from "../types/profile.types";
import { toast } from "sonner";

export default function PersonalInformation() {
  const { data: profileResponse, isLoading } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useUploadAvatar();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  const user = profileResponse?.data;

  if (!user) return null;

  return (
    <PersonalInformationForm
      key={user._id}
      user={user}
      onUpdate={updateProfile}
      onUploadAvatar={uploadAvatar}
      isUpdating={isUpdating}
      isUploadingAvatar={isUploadingAvatar}
    />
  );
}

interface PersonalInformationFormProps {
  user: User;
  onUpdate: (data: UpdateProfileRequest) => void;
  onUploadAvatar: (file: File) => void;
  isUpdating: boolean;
  isUploadingAvatar: boolean;
}

function PersonalInformationForm({
  user,
  onUpdate,
  onUploadAvatar,
  isUpdating,
  isUploadingAvatar,
}: PersonalInformationFormProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    bio: user.bio || "",
  });

  const [avatarValidation, setAvatarValidation] = useState<{
    status: "idle" | "error" | "success";
    message: string;
  }>({ status: "idle", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Constants for validation
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const MAX_MEGAPIXELS = 10;
    const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    // Validate file type
    if (!ALLOWED_FORMATS.includes(file.type)) {
      const errorMsg = `Invalid file format. Allowed formats: JPEG, PNG, WebP, GIF`;
      setAvatarValidation({ status: "error", message: errorMsg });
      toast.error(errorMsg);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const maxSizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
      const errorMsg = `File size (${fileSizeMB} MB) exceeds the maximum limit of ${maxSizeMB} MB`;
      setAvatarValidation({ status: "error", message: errorMsg });
      toast.error(errorMsg);
      return;
    }

    // Validate image dimensions and megapixels
    const img = new Image();

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const megapixels = (width * height) / 1000000;

      console.log(`✓ Image loaded - Dimensions: ${width}x${height}, Megapixels: ${megapixels.toFixed(2)} MP`);

      if (megapixels > MAX_MEGAPIXELS) {
        const errorMsg = `Image resolution (${megapixels.toFixed(2)} MP) exceeds the maximum limit of ${MAX_MEGAPIXELS} MP. Please use a lower resolution image.`;
        setAvatarValidation({ status: "error", message: errorMsg });
        toast.error(errorMsg);
      } else {
        const successMsg = `✓ Image validated successfully (${width}x${height}, ${megapixels.toFixed(2)} MP)`;
        setAvatarValidation({ status: "success", message: successMsg });
        toast.success("Image validated successfully");
        console.log(successMsg);
        onUploadAvatar(file);
      }
    };

    img.onerror = () => {
      const errorMsg = "Failed to load image. Please ensure you've selected a valid image file.";
      setAvatarValidation({ status: "error", message: errorMsg });
      toast.error(errorMsg);
      console.error("❌ Image load error:", errorMsg);
    };

    img.onabort = () => {
      const errorMsg = "Image loading was aborted. Please try again.";
      setAvatarValidation({ status: "error", message: errorMsg });
      toast.error(errorMsg);
      console.error("❌ Image loading aborted:", errorMsg);
    };

    // Create object URL and load image
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    // Cleanup URL when done
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-gray-100 mb-8">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-primary/10 shadow-sm">
              {user?.profileImage ? (
                <NextImage
                  src={user.profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <UserIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer text-xs font-medium">
              Change
              <input type="file" className="hidden" onChange={handleAvatarChange} disabled={isUploadingAvatar} />
            </label>
            {isUploadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500 font-medium">{user?.email}</p>
              <div className="mt-2 text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full inline-block">
                {user?.role}
              </div>
            </div>
            {avatarValidation.status !== "idle" && (
              <div
                className={`mt-4 p-3 rounded-lg flex items-start gap-3 ${
                  avatarValidation.status === "error"
                    ? "bg-red-50 border border-red-200"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                {avatarValidation.status === "error" ? (
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`text-sm font-medium ${
                    avatarValidation.status === "error" ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {avatarValidation.message}
                </p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-bold text-gray-700">First Name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-bold text-gray-700">Last Name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="your.email@example.com"
    
                />
              </div>
              {/* <p className="text-xs text-gray-400">Email cannot be changed contact support for assistance.</p> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-bold text-gray-700">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-bold text-gray-700">Bio / About</Label>
            <div className="relative">
              <Info className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="min-h-[120px] pl-10 resize-none"
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 cursor-pointer rounded-lg shadow-soft transition-all"
            >
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin cursor-pointer" />}
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
