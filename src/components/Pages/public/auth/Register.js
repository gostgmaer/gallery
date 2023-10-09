"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordField from "@/components/global/fields/PasswordField";
import { post } from "@/lib/http";
import { useAuthContext } from "@/context/authContext";
import { useAxios } from "@/lib/interceptors";
const Signup = () => {
  const { handleLoginAuth, user, userId } = useAuthContext();
  const [axios, spinner] = useAxios();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
    username: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setResume({ ...resume, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log(formData);

    const body = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      username: formData.username,
    };

    try {
      const res = await post("/user/register", body);
      if (res) {
        router.push("/auth/login");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {};

  const responseFacebook = (response) => {
    console.log(response);
  };

  useEffect(() => {
    if (userId) {
      router.push("/profile");
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-100 text-black">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleRegistration} className="text-black">
          <div className="mb-4 flex gap-5">
            <div className=" w-full">
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Kishor"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-semibold"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Sarkar"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4 flex gap-5">
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="info@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="kishoruser"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4  flex gap-5">
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password
              </label>
              <PasswordField
                value={formData.password}
                handleChange={handleChange}
                placeholder={"Password123"}
                name={"password"}
              />
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-gray-700 font-semibold"
              >
                Confirm Password
              </label>
              <PasswordField
                value={formData.confirm_password}
                handleChange={handleChange}
                placeholder={"Password123"}
                name={"confirm_password"}
              />
            </div>
          </div>
          <div className="mb-4  mt-10">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-2 mt-10">
          <div className="ab kw">
            <div className="ab lx ze awa awe awp text-center">
              <span className="alo ark axv">Or continue with</span>
            </div>
          </div>
          <div className="mb-4 flex gap-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
            >
              Google
            </button>
            <button className="w-full bg-blue-800 text-white font-semibold py-2 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900">
              {" "}
              Facebook
            </button>
          </div>
        </div>

        <p className="text-gray-700">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
      {spinner}
    </div>
  );
};

export default Signup;
