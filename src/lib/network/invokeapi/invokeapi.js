import axios from "axios";

const InvokeAPI = async (endpoint, type, body, headerParams, queryParam) => {
  const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL;
  const token = process.env.NEXT_PUBLIC_IMAGE_API_TOKEN;
  const option = {
    method: type,
    url: baseURL + endpoint,
    headers: { Authorization: `bearer ${token}` },
    params: { client_id: token, ...queryParam },
    data: body,
  };
  let response;

  try {
    response = await axios.request(option);
  } catch (e) {
    throw new Error(e.message);
  }

  // if success return value
  return response?.data ? response?.data : null; // or set initial value
};
export default InvokeAPI;
