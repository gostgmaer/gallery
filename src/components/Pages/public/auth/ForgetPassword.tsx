"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { useAuthContext } from "@/context/authContext";
import { post } from "@/lib/network/http";
import { ENDPOINTS } from "@/config/endpoints";
import { useGlobalLoading } from "@/lib/network/loading";
import { z } from "zod";
import { forgetPasswordSchema } from "@/lib/validations/auth";
type ForgetPasswordData = z.infer<typeof forgetPasswordSchema>;
import Spinner from "@/components/global/loader/Spinner";

const ForgetPassword = () => {
  const { userId } = useAuthContext();
  const loading = useGlobalLoading();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  useEffect(() => {
    if (userId) {
      router.push("/profile");
    }
  }, [userId, router]);

  const onSubmit = async (data: ForgetPasswordData) => {
    try {
      await post(ENDPOINTS.AUTH.FORGET_PASSWORD, data);
      // Show success message or redirect
      alert("Password reset instructions have been sent to your email.");
      router.push("/auth/login");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to send reset email. Please try again.";
      setError("email", {
        type: "manual",
        message,
      });
    }
  };

  if (userId) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center mb-6">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>

          {errors.email && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errors.email.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                error={errors.email?.message}
                autoComplete="email"
              />
            </div>
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Send Reset Instructions
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      {loading && <Spinner />}
    </div>
  );
};

export default ForgetPassword;
