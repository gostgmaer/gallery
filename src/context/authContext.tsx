"use client";
import { parseCookies, setCookie } from "nookies";
import React, { useState, useEffect, createContext, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import { post } from "@/lib/network/http";
import { ENDPOINTS } from "@/config/endpoints";

// Types
interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  profilePicture?: string;
  role?: string;
  [key: string]: any;
}

interface UserId extends User {
  user_id: string;
}

interface AuthContextType {
  user: User | undefined;
  userId: UserId | null;
  handleLoginAuth: (body: any) => Promise<any>;
  Logout: () => Promise<void>;
  setPrevious: (value: string) => void;
  previous: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userId, setUserId] = useState<UserId | null>(null);
  const [previous, setPrevious] = useState("");
  const router = useRouter();

  const handleLoginAuth = async (body: any) => {
    try {
      const res = await post(ENDPOINTS.AUTH.LOGIN, body);
      setCookie(null, "accessToken", res.token, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      setCookie(null, "session", res.session_id, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      setUser(res);
      setUserId({ ...res.user, user_id: res.user._id });

      router.push(`/${previous}`);

      return res;
    } catch (error) {
      throw error;
    }
  };

  const Logout = async () => {
    function deleteCookie(name: string) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    try {
      const res = await post(ENDPOINTS.AUTH.SIGNOUT);
      if (res.statusCode == "200") {
        sessionStorage.removeItem("user");
        deleteCookie("accessToken");
        deleteCookie("session");
        window.sessionStorage.clear();
        window.localStorage.clear();
        setUser(undefined);
        setUserId(null);
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const unsubscribe = async () => {
    try {
      const cookies = parseCookies();
      if (cookies.accessToken) {
        const decodedToken = jwt_decode<{ user_id: string }>(cookies.accessToken);
        setUserId({} as UserId); // Will be populated by verify

        if (decodedToken["user_id"]) {
          const res = await post(ENDPOINTS.AUTH.VERIFY_SESSION);
          setUser(res);
          setUserId({ ...res.user, user_id: res.user._id });
        }
      }
    } catch (error) {
      setUser(undefined);
      setUserId(null);
    }
  };

  useEffect(() => {
    unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, handleLoginAuth, Logout, userId, setPrevious, previous }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
