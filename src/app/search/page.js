"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (obj) => {
      const params = new URLSearchParams(searchParams);

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          params.set(key, obj[key]);
        }
      }

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.replace("/search");
  }, []);
  return (
    <div>
      <button
        onClick={() =>
          router.push(
            pathname +
              "?" +
              createQueryString({ width: 5472, height: 3648, color: "#f3f3f3" })
          )
        }
        className={`opacity-50 
               
               btn ml-2`}
      >
        Next
      </button>
    </div>
  );
};

export default Page;
