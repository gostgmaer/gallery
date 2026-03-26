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
import { Alert, AlertDescription } from "@/components/ui/Alert";

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
    <div className="space-y-4">
      <div>
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 px-4 py-2 w-max bg-primary text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 transition-colors duration-200 font-medium"
          aria-label="Upload profile picture"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Upload Image
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
          aria-describedby="image-upload-help"
        />
        <p id="image-upload-help" className="text-sm text-muted-foreground mt-2">
          Click to select a profile picture (JPG, PNG, GIF)
        </p>
      </div>

      {error && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>
            Upload failed: {error.message}
          </AlertDescription>
        </Alert>
      )}

      {imagePreview && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Preview:</p>
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
            <Image
              src={imagePreview}
              alt="Profile picture preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
