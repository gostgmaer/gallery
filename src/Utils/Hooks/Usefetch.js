import { useEffect, useState } from "react";
import InvokeAPI from "../Apicall";


const useFetch =  (endpoint,method,header,query,urlParam,body) => {
  const [products, setProducts] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    apicall();
  }, [endpoint]);

  const apicall = async () => {
    const res = await InvokeAPI(endpoint, method,body, header, query);
   
    setProducts(res.data);
    setloading(false);
    
  };
  return{ products,loading,error}
};
export default useFetch
