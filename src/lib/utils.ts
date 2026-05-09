import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates an image file for size and format.
 * Returns true if valid, false otherwise and shows a toast error.
 */
export const validateImage = (file: File): boolean => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!ALLOWED_FORMATS.includes(file.type)) {
    toast.error("Invalid file format. Allowed formats: JPEG, PNG, WebP, GIF");
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const maxSizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
    toast.error(
      `File size (${fileSizeMB} MB) exceeds the maximum limit of ${maxSizeMB} MB`,
    );
    return false;
  }

  return true;
};
