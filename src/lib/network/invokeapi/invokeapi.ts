import instance from "../interceptors";
import { ApiError } from "../errors";

const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL;
const token = process.env.NEXT_PUBLIC_IMAGE_API_TOKEN;

interface InvokeAPIOptions {
  endpoint: string;
  method: string;
  body?: any;
  headerParams?: Record<string, string>;
  queryParam?: Record<string, any>;
}

const InvokeAPI = async ({
  endpoint,
  method,
  body,
  headerParams = {},
  queryParam = {},
}: InvokeAPIOptions): Promise<any> => {
  const option = {
    method,
    url: baseURL + endpoint,
    headers: { ...headerParams, Authorization: `Bearer ${token}` },
    params: { client_id: token, ...queryParam },
    data: body,
  };

  try {
    const response = await instance.request(option);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Unsplash returned an error status code
      throw new ApiError(
        error.response.data?.message || error.message,
        error.response.status,
        error.response.data
      );
    }
    // Network error or other issue
    throw error;
  }
};

export default InvokeAPI;
