"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { registerSchema } from "@/lib/validations/auth";

const Register = () => {
  const { handleLoginAuth, userId } = useAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (userId) {
      router.push("/profile");
    }
  }, [userId, router]);

  const onSubmit = async (data) => {
    try {
      const res = await handleLoginAuth(data);
      if (res) {
        router.push("/profile");
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message || "Registration failed. Please try again.",
      });
    }
  };

  if (userId) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-card text-card-foreground rounded-xl shadow-lg border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Gallery
              </h1>
            </Link>
            <h2 className="text-2xl font-semibold mt-6 mb-2">Create account</h2>
            <p className="text-muted-foreground text-sm">
              Join our community of creators and find the perfect images
            </p>
          </div>

          {/* Error Alert */}
          {errors.root && (
            <div className="mb-6">
              <Alert variant="destructive">
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="First Name"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                  placeholder="John"
                />
              </div>
              <div>
                <Input
                  label="Last Name"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Input
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Username */}
            <div>
              <Input
                label="Username"
                {...register("username")}
                error={errors.username?.message}
                placeholder="johndoe"
                autoComplete="username"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={errors.password?.message}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  helperText="At least 6 characters"
                />
              </div>
              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  {...register("confirm_password")}
                  error={errors.confirm_password?.message}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              Create account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" className="w-full">
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <FaFacebook className="mr-2 h-4 w-4 text-blue-600" />
              Facebook
            </Button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
