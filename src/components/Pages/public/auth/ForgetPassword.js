"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { post } from "@/lib/network/http";
import { useAuthContext } from "@/context/authContext";
import { ENDPOINTS } from "@/config/endpoints";
import { useGlobalLoading } from "@/lib/network/loading";
import Spinner from "@/components/global/loader/Spinner";

const ForgetPassword = () => {
  const { handleLoginAuth, user, userId } = useAuthContext();
  const loading = useGlobalLoading();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const body = {
      email: formData.email,
    };

    try {
      const res = await post(ENDPOINTS.AUTH.FORGET_PASSWORD, body);
      return res;
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) {
      router.push("/profile");
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Forget Password
        </h2>
        <form onSubmit={handleForgetPassword} action="post">
          <div className="mb-4 text-black ">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Registered Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 mt-10">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Forget Password
            </button>
          </div>
        </form>

        <p className="text-gray-700">
          Back to{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default ForgetPassword;
