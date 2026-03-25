import axios from "axios";
import instance from "./interceptors";
import { notifySuccess, notifyerror } from "../notify/notice";
import { parseCookies } from "nookies";
import { ApiError, AuthError } from "./errors";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

function throwApiError(error: any): never {
  if (!error?.response) {
    throw new ApiError(error.message || "Network error", 0, error);
  }

  const status = error.response.status;
  const data = error.response.data;

  if (status === 401 || status === 403) {
    throw new AuthError(data.message || "Authentication failed", status, data);
  }

  throw new ApiError(data.message || `Error ${status}`, status, data);
}

function notifyIfNotSession(endpoint: string, message: string) {
  if (!endpoint.includes("session")) {
    notifySuccess(message, 2000);
  }
}

function notifyErrorIfNotSession(endpoint: string, message: string) {
  if (!endpoint.includes("session")) {
    notifyerror(message, 2000);
  }
}

export const get = async (endpoint: string, query: any = {}, id?: string) => {
  const cookies = parseCookies();
  const token = cookies["accessToken"];
  const session = cookies["session"];
  const url = id ? `${baseURL}${endpoint}/${id}` : `${baseURL}${endpoint}`;

  try {
    const response = await instance.request({
      method: "get",
      url,
      headers: {
        Authorization: token,
        session_id: session,
      },
      params: query,
    });
    return response.data;
  } catch (error: any) {
    // Re-throw typed error for caller to handle
    throw throwApiError(error);
  }
};

export const getsingle = async (endpoint: string, query: any = {}, id: string) => {
  const cookies = parseCookies();
  const token = cookies["accessToken"];
  const session = cookies["session"];
  const url = `${baseURL}${endpoint}/${id}`;

  try {
    const response = await instance.request({
      method: "get",
      url,
      headers: {
        Authorization: token,
        session_id: session,
      },
      params: query,
    });
    return response.data;
  } catch (error: any) {
    throw throwApiError(error);
  }
};

export const getServerSingle = async (endpoint: string, query: any = {}, id: string) => {
  const cookies = parseCookies();
  const token = cookies["accessToken"];
  const session = cookies["session"];
  const url = `${baseURL}${endpoint}/${id}`;

  try {
    const response = await axios.request({
      method: "get",
      url,
      headers: {
        Authorization: token,
        session_id: session,
      },
      params: query,
    });
    return response.data;
  } catch (error: any) {
    throw throwApiError(error);
  }
};

export const post = async (endpoint: string, data: any = {}) => {
  const cookies = parseCookies();
  const token = cookies["accessToken"];
  const session = cookies["session"];

  try {
    const response = await instance.request({
      method: "post",
      url: baseURL + endpoint,
      headers: {
        Authorization: token,
        session_id: session,
      },
      data,
    });
    const message = response.data.message;
    notifyIfNotSession(endpoint, message);
    return response.data;
  } catch (error: any) {
    const errData = error.response?.data || { message: error.message };
    notifyErrorIfNotSession(endpoint, errData.message);
    throw throwApiError(error);
  }
};

export const patch = async (endpoint: string, data: any = {}, id: string) => {
  const cookies = parseCookies();
  const token = cookies["accessToken"];
  const session = cookies["session"];

  try {
    const response = await instance.request({
      method: "patch",
      url: baseURL + endpoint + `/${id}`,
      headers: {
        Authorization: token,
        session_id: session,
      },
      data,
    });
    notifySuccess(response.data.message, 2000);
    return response.data;
  } catch (error: any) {
    const errData = error.response?.data || { message: error.message };
    notifyerror(errData.message, 2000);
    throw throwApiError(error);
  }
};

export const del = async (endpoint: string, id: string) => {
  const cookies = parseCookies();
  const token = cookies["accessToken"];
  const session = cookies["session"];

  try {
    const response = await instance.request({
      method: "delete",
      url: baseURL + endpoint + `/${id}`,
      headers: {
        Authorization: token,
        session_id: session,
      },
      data: {},
    });
    notifySuccess(response.data.message, 2000);
    return response.data;
  } catch (error: any) {
    const errData = error.response?.data || { message: error.message };
    notifyerror(errData.message, 2000);
    throw throwApiError(error);
  }
};
