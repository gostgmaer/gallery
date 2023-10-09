"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "@/lib/http";
import { notifyerror } from "@/lib/notify/notice";
import Link from "next/link";
import { useAuthContext } from "@/context/authContext";
import { useAxios } from "@/lib/interceptors";
const ConfirmAccount = () => {
  const { handleLoginAuth, user, userId } = useAuthContext();
  const router = useRouter();
  const [axios, spinner] = useAxios();
  const [userData, setUserData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const param = useSearchParams();


  const confirmAccountAction = async (e) => {
    if (!param.getAll("token")[0]) {
      notifyerror("No Account Confirmation token found", 2000);
    } else {
      try {
        const confirm = await post(
          `/user/auth/confirm-account/${param.getAll("token")[0]}`
        );
        setUserData(confirm);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      router.push("/profile");
    }
  }, [userId]);

  useEffect(() => {
    confirmAccountAction();
  }, []);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-max text-black">
          {userData && (
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-center">
                Account has been Confirmed
              </h2>
              <p className="text-lg font-medium mb-2 text-center">
                {" "}
                Welcome {userData.result.username}
              </p>
              <div className="mt-6">
                <Link
                  href={"/auth/login"}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login you Account
                </Link>
              </div>
            </div>
          )}{" "}
          {error && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center w-max">
                Account information not Confirmed
              </h2>
              <p className="text-lg font-medium mb-2 text-center">
                {" "}
                {JSON.parse(error).message}
              </p>
              <div className="mt-6"></div>
            </div>
          )}
        </div>
      </div>
      {spinner}
    </div>
  );
};

export default ConfirmAccount;
