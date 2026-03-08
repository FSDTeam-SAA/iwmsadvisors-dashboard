import axiosInstance from "@/lib/instance/axios-instance";
import {
  TransformingNumberResponse,
  TransformingNumberCreateInput,
  TransformingNumberUpdateInput,
  TransformingNumber,
} from "../types/transformingNumber.type";

/**
 * Get the transforming number section
 */
export const getTransformingNumber =
  async (): Promise<TransformingNumberResponse> => {
    try {
      const response = await axiosInstance.get("/number/get");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          status: true,
          message: "Number section not found",
          data: null,
        };
      }
      throw error;
    }
  };

/**
 * Create a new transforming number section
 */
export const createTransformingNumber = async (
  data: TransformingNumberCreateInput,
): Promise<TransformingNumber> => {
  const response = await axiosInstance.post("/number/create", data);
  return response.data.data;
};

/**
 * Update an existing transforming number section
 */
export const updateTransformingNumber = async (
  data: TransformingNumberUpdateInput,
): Promise<TransformingNumber> => {
  const response = await axiosInstance.patch(`/number/update`, data);
  return response.data.data;
};

/**
 * Delete a transforming number section
 */
export const deleteTransformingNumber = async (): Promise<void> => {
  await axiosInstance.delete(`/number/delete`);
};
