"use client";
import { useState, useEffect, useCallback } from "react";

let loadingCount = 0;
const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => listener(loadingCount > 0));
};

export const incrementLoading = () => {
  loadingCount++;
  notifyListeners();
};

export const decrementLoading = () => {
  loadingCount = Math.max(0, loadingCount - 1);
  notifyListeners();
};

export const useGlobalLoading = () => {
  const [isLoading, setIsLoading] = useState(loadingCount > 0);

  useEffect(() => {
    const handleLoadingChange = (loading) => {
      setIsLoading(loading);
    };

    listeners.add(handleLoadingChange);
    return () => {
      listeners.delete(handleLoadingChange);
    };
  }, []);

  return isLoading;
};
