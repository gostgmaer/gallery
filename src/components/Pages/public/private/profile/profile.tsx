"use client";

import ImageUpload from "@/components/global/fields/ImageUpload";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useAuthContext } from "@/context/authContext";
import { get, patch } from "@/lib/network/http";
import { ENDPOINTS } from "@/config/endpoints";
import { countries } from "countries-list";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Avatar } from "@/components/ui/Avatar";
import { Separator } from "@/components/ui/Separator";
import { profileSchema } from "@/lib/validations/profile";
import { z } from "zod";

const Personal = () => {
  const { user, userId } = useAuthContext();
  const [profileInfo, setProfileInfo] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    try {
      if (userId?.user_id) {
        const res = await get(ENDPOINTS.USER.PROFILE, null, userId.user_id);
        setProfileInfo(res);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleProfileUpdate = async () => {
    await getProfile();
    setIsEditing(false);
  };

  if (!profileInfo) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-foreground">My Profile</h1>
        {profileInfo?.result?.profilePicture && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {profileInfo.result.username}
            </span>
            <Avatar
              src={profileInfo.result.profilePicture}
              alt={`${profileInfo.result.username}'s profile`}
              size="lg"
              fallback={profileInfo.result.username?.charAt(0)}
            />
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Edit Form */}
          <UserProfile
            data={profileInfo.result}
            setClose={setIsEditing}
            setProfileInfo={handleProfileUpdate}
          />
          {/* Right: Preview */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Profile Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfilePreview userData={profileInfo.result} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <ProfileView userData={profileInfo.result} onEdit={() => setIsEditing(true)} />
        </div>
      )}
    </div>
  );
};

const ProfilePreview = ({ userData }) => {
  return (
    <div className="space-y-6">
      {/* Avatar & Name */}
      <div className="flex items-center gap-4">
        <Avatar
          src={userData.profilePicture}
          alt={`${userData.username}'s profile`}
          size="xl"
          fallback={userData.username?.charAt(0)}
        />
        <div>
          <h3 className="text-xl font-semibold">{userData.username}</h3>
          <p className="text-muted-foreground">{userData.email}</p>
        </div>
      </div>

      <Separator />

      {/* Personal Info */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">First Name</p>
            <p className="font-medium">{userData.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Name</p>
            <p className="font-medium">{userData.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{userData.contactNumber || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium">{userData.role}</p>
          </div>
        </div>
      </div>

      {/* Address */}
      {userData?.address && (
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Address
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground">Street</p>
              <p className="font-medium">{userData.address.street}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p className="font-medium">{userData.address.city}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">State</p>
              <p className="font-medium">{userData.address.state}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Postal Code</p>
              <p className="font-medium">{userData.address.postalCode}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="font-medium">{userData.address.country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileView = ({ userData, onEdit }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-semibold">Profile Details</CardTitle>
        <Button variant="outline" onClick={onEdit}>
          Edit Profile
        </Button>
      </CardHeader>
      <CardContent>
        <ProfilePreview userData={userData} />
      </CardContent>
    </Card>
  );
};

const UserProfile = ({ data, setClose, setProfileInfo }) => {
  const { userId } = useAuthContext();
  const [imagePreview, setImagePreview] = useState(data?.profilePicture || "");
  const [uploadError, setUploadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryArray = [];
  Object.keys(countries).forEach((code) => {
    const country = countries[code];
    countryArray.push({
      value: code,
      label: country.name,
    });
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      contactNumber: data?.contactNumber || "",
      address: {
        street: data?.address?.street || "",
        city: data?.address?.city || "",
        state: data?.address?.state || "",
        postalCode: data?.address?.postalCode || "",
        country: data?.address?.country || "",
      },
    },
  });

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const recordData = {
        ...formData,
        profilePicture: imagePreview,
      };

      const res = await patch(ENDPOINTS.USER.UPDATE, recordData, userId.user_id);

      if (res) {
        setClose(true);
        await setProfileInfo();
        reset(); // Reset form with successful update
      }
    } catch (error) {
      setUploadError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-semibold">Edit Profile</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setClose(false)}
          aria-label="Close edit"
        >
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent>
        {uploadError && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              {uploadError?.message || "Failed to update profile. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="First Name"
                {...register("firstName")}
                required
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Last Name"
                {...register("lastName")}
                required
              />
              {errors.lastName && (
                <p className="mt-2 text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Phone Number"
                {...register("contactNumber")}
              />
              {errors.contactNumber && (
                <p className="mt-2 text-sm text-destructive">{errors.contactNumber.message}</p>
              )}
            </div>
            <div>
              <Label>Profile Picture</Label>
              <ImageUpload
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Street"
                  {...register("address.street")}
                />
                {errors.address?.street && (
                  <p className="mt-2 text-sm text-destructive">{errors.address.street.message}</p>
                )}
              </div>
              <div>
                <Input
                  label="City"
                  {...register("address.city")}
                />
                {errors.address?.city && (
                  <p className="mt-2 text-sm text-destructive">{errors.address.city.message}</p>
                )}
              </div>
              <div>
                <Input
                  label="State"
                  {...register("address.state")}
                />
                {errors.address?.state && (
                  <p className="mt-2 text-sm text-destructive">{errors.address.state.message}</p>
                )}
              </div>
              <div>
                <Input
                  label="Postal Code"
                  {...register("address.postalCode")}
                />
                {errors.address?.postalCode && (
                  <p className="mt-2 text-sm text-destructive">{errors.address.postalCode.message}</p>
                )}
              </div>
              <div>
                <Label>Country</Label>
                <Controller
                  name="address.country"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value || undefined} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {countryArray.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                  )}
                />
                {errors.address?.country && (
                  <p className="mt-2 text-sm text-destructive">{errors.address.country.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" loading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Personal;
