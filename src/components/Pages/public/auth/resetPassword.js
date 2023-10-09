"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "@/lib/http";
import { notifyerror } from "@/lib/notify/notice";
import PasswordField from "@/components/global/fields/PasswordField";
import { useAuthContext } from "@/context/authContext";
import { useAxios } from "@/lib/interceptors";
const ResetPassword = () => {
  const { handleLoginAuth, user, userId } = useAuthContext();
  const [axios, spinner] = useAxios();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const param = useSearchParams();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!param.getAll("token")[0]) {
      notifyerror("No password reset token found", 2000);
    } else {
      if (password === confirmPassword) {
        try {
          const reset = await post(
            `/user/auth/reset-password/${param.getAll("token")[0]}`,
            { password: password }
          );
          if (reset.status == "OK") {
            router.push("/auth/login");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        notifyerror("Passwords do not match", 2000);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      router.push("/profile");
    }
  }, [userId]);


  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Reset Password
          </h2>
          <form className="mt-8" onSubmit={handleSubmit}>
            {/* Password Input */}
            <div className="rounded-md shadow-sm">
              <div>
                <PasswordField
                  value={password}
                  handleChange={handlePasswordChange}
                  placeholder={"New Password"}
                  name={"password"}
                />
              </div>
              {/* Confirm Password Input */}
              <div className="mt-4">
                <PasswordField
                  value={confirmPassword}
                  handleChange={handleConfirmPasswordChange}
                  placeholder={"Confirm Password"}
                  name={"confirmPassword"}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
      {spinner}
    </div>
  );
};

export default ResetPassword;
