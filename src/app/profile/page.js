// @ts-nocheck
"use client";
import Personal from "@/components/Pages/public/private/profile/profile";
import { useAuthContext } from "@/context/authContext";
import { useAxios } from "@/lib/network/interceptors";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Profile({ data }) {
  const [axios, spinner] = useAxios();
  const { user, userId, setPrevious } = useAuthContext();
  // const { loader } = useGlobalAppContext();
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
      {spinner}
    </div>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const data = await res.json()
//   return { props: { data } }
// }
