// @ts-nocheck
"use client";
import Personal from "@/components/Pages/profile/profile";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import { useAxios } from "@/lib/interceptors";


import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Profile({ data }) {
  const [axios, spinner] = useAxios();
  const { user, userId } = useAuthContext();
  // const { loader } = useGlobalAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!userId) router.push("/auth/login");
    console.log(spinner);
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
