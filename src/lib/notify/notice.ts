import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const notifySuccess = (message: string, duration?: number): void => {
  toast.success(message, { ...defaultOptions, autoClose: duration });
};

export const notifyWarning = (message: string, duration?: number): void => {
  toast.warn(message, { ...defaultOptions, autoClose: duration });
};

export const notifyInfo = (message: string, duration?: number): void => {
  toast.info(message, { ...defaultOptions, autoClose: duration });
};

export const notifyDefault = (message: string, duration?: number): void => {
  toast(message, { ...defaultOptions, autoClose: duration });
};

export const notifyError = (message: string, duration?: number): void => {
  toast.error(message, { ...defaultOptions, autoClose: duration });
};
