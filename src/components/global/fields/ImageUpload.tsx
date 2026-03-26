"use client";

import Image from "next/image";
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  UploadTask,
} from "firebase/storage";
import { firebaseStorage } from "@/config/firebase";

interface ImageUploadProps {
  imagePreview?: string | null;
  setImagePreview: (url: string | undefined) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreview,
  setImagePreview,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const onFileUpload = (): void => {
    if (!file) return;

    const storageRef = ref(firebaseStorage, `/Images/${file.name}`);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {
        // Progress tracking can be added later if needed
      },
      (err) => {
        setError(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImagePreview(url);
        });
      }
    );
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      onFileUpload();
    }
  }, [file]);

  return (
    <div className="">
      <div>
        <label className="block text-gray-600 font-semibold mb-2">
          Upload an Image
        </label>
        <div className="mt-2 flex items-center justify-start">
          <label
            htmlFor="file-upload"
            className="px-4 py-2 w-max flex items-center gap-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Choose File
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">
          Upload failed: {error.message}
        </p>
      )}
      <div>
        {imagePreview && (
          <div className="">
            <p className="font-semibold">Image:</p>
            <Image
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-24 h-24 rounded-lg object-cover"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
