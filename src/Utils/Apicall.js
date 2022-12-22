import axios from "axios";
import { useGlobalContext } from "./Context/Context";
import { notifyerror } from "./Notification/Notification";




const InvokeAPI = async (
 
  endpoint,
  type,
  body,
  headerParams,
  queryParam
  
) => {
  


  const baseURL = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const option = {
    method: type,
    url: baseURL + endpoint,
    headers: { Authorization: `bearer ${token}` },
    params: queryParam,
    data: body,
  };
  let response;
  console.log(option);
  try {
    response = await axios.request(option);
  } catch (e) {
   
    notifyerror(e.message,5000)
    throw new Error(e.message);
  }

  // if success return value
  return response?.data ? response?.data : null; // or set initial value
};
export default InvokeAPI;
