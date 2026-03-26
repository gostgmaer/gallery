"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "@/lib/network/http";
import { useAuthContext } from "@/context/authContext";
import { ENDPOINTS } from "@/config/endpoints";
import { useGlobalLoading } from "@/lib/network/loading";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Spinner from "@/components/global/loader/Spinner";

const ConfirmAccount = () => {
  const { userId } = useAuthContext();
  const router = useRouter();
  const loading = useGlobalLoading();
  const [userData, setUserData] = useState<{ result?: { username: string } } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const param = useSearchParams();

  const confirmAccountAction = async () => {
    if (!param.getAll("token")[0]) {
      setError(new Error("No Account Confirmation token found"));
      return;
    }

    try {
      const confirm = await post(
        `${ENDPOINTS.AUTH.CONFIRM_ACCOUNT_BASE}/${param.getAll("token")[0]}`
      );
      setUserData(confirm);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  useEffect(() => {
    if (userId) {
      router.push("/profile");
    }
  }, [userId, router]);

  useEffect(() => {
    confirmAccountAction();
  }, []);

  if (userId) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {loading && <Spinner />}

          {userData && !loading && (
            <div className="text-center py-4">
              <div className="mb-4 text-green-500">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Account Confirmed</h2>
              <p className="text-muted-foreground mb-6">
                Welcome <span className="font-medium text-foreground">{userData.result?.username}</span>! Your account has been successfully verified.
              </p>
              <Button asChild className="w-full" size="lg">
                <Link href="/auth/login">Go to Login</Link>
              </Button>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-4">
              <div className="mb-4 text-destructive">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Confirmation Failed</h2>
              <p className="text-muted-foreground mb-6">
                {error.message}
              </p>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      {loading && <Spinner />}
    </div>
  );
};

export default ConfirmAccount;
