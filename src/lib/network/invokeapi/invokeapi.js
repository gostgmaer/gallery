
import instance from "../interceptors";
const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL;
const token = process.env.NEXT_PUBLIC_IMAGE_API_TOKEN;

const InvokeAPI = async (endpoint, type, body, headerParams, queryParam) => {

  const option = {
    method: type,
    url: baseURL + endpoint,
    headers: { ...headerParams, Authorization: `bearer ${token}` },
    params: { client_id: token, ...queryParam },
    data: body,
  };
  let response;

  try {
    response = await instance.request(option);
  } catch (e) {
    throw new Error(e.message);
  }

  return response?.data ? response?.data : null;
};
export default InvokeAPI;
