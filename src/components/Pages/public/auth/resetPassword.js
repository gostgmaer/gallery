"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "@/lib/network/http";
import { notifyerror } from "@/lib/notify/notice";
import { useAuthContext } from "@/context/authContext";
import { ENDPOINTS } from "@/config/endpoints";
import { useGlobalLoading } from "@/lib/network/loading";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/validations/auth";
import Spinner from "@/components/global/loader/Spinner";

const ResetPassword = () => {
  const { handleLoginAuth, user, userId } = useAuthContext();
  const loading = useGlobalLoading();
  const router = useRouter();
  const param = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    if (!param.getAll("token")[0]) {
      notifyerror("No password reset token found", 2000);
      return;
    }

    try {
      const reset = await post(
        `${ENDPOINTS.AUTH.RESET_PASSWORD_BASE}/${param.getAll("token")[0]}`,
        { password: data.password }
      );
      if (reset.status == "OK") {
        router.push("/auth/login");
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message || "Failed to reset password. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (userId) {
      router.push("/profile");
    }
  }, [userId, router]);

  useEffect(() => {
    if (userId) {
      router.push("/profile");
    }
  }, [userId]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          {errors.root && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="New Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
                autoComplete="new-password"
              />
            </div>
            <div>
              <Input
                label="Confirm Password"
                type="password"
                {...register("confirm_password")}
                error={errors.confirm_password?.message}
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
      {loading && <Spinner />}
    </div>
  );
};

export default ResetPassword;
