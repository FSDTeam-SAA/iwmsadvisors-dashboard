import axiosInstance from "@/lib/instance/axios-instance";
import {
  TransformSectionCreateInput,
  TransformSectionUpdateInput,
  TransformSectionsResponse,
  TransformSection,
} from "../types/transforming.type";

/**
 * Get all transform sections
 */
export const getTransformSections =
  async (): Promise<TransformSectionsResponse> => {
    try {
      const response = await axiosInstance.get("/transform/all");
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { status: number } };
      if (axiosError.response?.status === 404) {
        return {
          status: true,
          message: "Transform sections not found",
          data: [],
        };
      }
      throw error;
    }
  };

/**
 * Create a new transform section
 */
export const createTransformSection = async (
  data: TransformSectionCreateInput,
): Promise<TransformSection> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);

  if (data.image1) formData.append("image1", data.image1);
  if (data.image2) formData.append("image2", data.image2);
  if (data.image3) formData.append("image3", data.image3);

  const response = await axiosInstance.post("/transform/create", formData);
  return response.data.data;
};

/**
 * Update an existing transform section
 */
export const updateTransformSection = async (
  id: string,
  data: TransformSectionUpdateInput,
): Promise<TransformSection> => {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.description) formData.append("description", data.description);

  if (data.image1) formData.append("image1", data.image1);
  if (data.image2) formData.append("image2", data.image2);
  if (data.image3) formData.append("image3", data.image3);

  const response = await axiosInstance.patch(`/transform/${id}`, formData);
  return response.data.data;
};

/**
 * Delete a transform section
 */
export const deleteTransformSection = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/transform/${id}`);
};
