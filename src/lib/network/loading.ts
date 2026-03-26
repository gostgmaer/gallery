"use client";
import { useState, useEffect } from "react";

let loadingCount = 0;
const listeners = new Set<(loading: boolean) => void>();

const notifyListeners = (): void => {
  listeners.forEach((listener) => listener(loadingCount > 0));
};

export const incrementLoading = (): void => {
  loadingCount++;
  notifyListeners();
};

export const decrementLoading = (): void => {
  loadingCount = Math.max(0, loadingCount - 1);
  notifyListeners();
};

export const useGlobalLoading = (): boolean => {
  const [isLoading, setIsLoading] = useState(loadingCount > 0);

  useEffect(() => {
    const handleLoadingChange = (loading: boolean): void => {
      setIsLoading(loading);
    };

    listeners.add(handleLoadingChange);
    return () => {
      listeners.delete(handleLoadingChange);
    };
  }, []);

  return isLoading;
};
