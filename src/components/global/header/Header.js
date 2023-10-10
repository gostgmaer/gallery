"use client";
import Link from "next/link";
import React from "react";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import Modal from "../modal/Modal";

function Header() {
  const { Logout, user, userId } = useAuthContext();
  const { setId, openModal, closeModal } = useGlobalAppContext();
  const handleSignout = async (params) => {
    const response = await Logout();
    closeModal();
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white py-3 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-3xl font-semibold">
        Pexels
        </Link>
        {userId ? (
          <nav className=" flex items-center gap-5">
            <Link
              href="/resume-builder"
              className="text-white hover:text-gray-200"
            >
              Builder
            </Link>
            <Link href="/resume" className="text-white hover:text-gray-200">
              My Resumes
            </Link>
            <Link href="/profile" className="text-white hover:text-gray-200">
              My Profile
            </Link>
            {userId && (
              <button
                onClick={openModal}
                className="bg-red-500 hover:bg-red-400 text-white hover:text-gray-800 rounded-full py-2 px-6 transition duration-300"
              >
                Sign Out
              </button>
            )}
          </nav>
        ) : (
          <nav className=" flex items-center gap-5">
            <Link
              href={"/auth/login"}
              className="text-white hover:text-gray-200"
            >
              Sign In
            </Link>

            <Link
              href={"/auth/register"}
              className="bg-white text-blue-500 hover:bg-blue-400 hover:text-gray-800 rounded-full py-2 px-6 transition duration-300"
            >
              Sign Up
            </Link>
          </nav>
        )}
      </div>
      <Modal>
        <div className=" w-full z-50">
          <h2 className=" w-full">Are you sure want to Sign Out?</h2>
          <div className="flex mt-10 justify-center gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={handleSignout}
            >
              Yes
            </button>
            <button
              onClick={closeModal}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
}

export default Header;
