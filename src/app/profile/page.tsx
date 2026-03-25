"use client";
import Personal from "@/components/Pages/public/private/profile/profile";
import { useAuthContext } from "@/context/authContext";
import { useGlobalLoading } from "@/lib/network/loading";
import Spinner from "@/components/global/loader/Spinner";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Profile() {
  const loading = useGlobalLoading();
  const { userId, setPrevious } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      setPrevious("profile");
      router.push("/auth/login");
    }
  }, [userId, router]);

  return (
    <div>
      <Personal />
      {loading && <Spinner />}
    </div>
  );
}
