"use client";
import ImageUpload from "@/components/global/fields/ImageUpload";
import { Select } from "@/components/ui";
import { useAuthContext } from "@/context/authContext";
import { get, getsingle, patch } from "@/lib/network/http";
import { ENDPOINTS } from "@/config/endpoints";
import { countries } from "countries-list";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Avatar } from "@/components/ui/Avatar";

const Personal = () => {
  const { user, userId } = useAuthContext();
  const [profileInfo, setProfileInfo] = useState(undefined);
  const [close, setClose] = useState(true);
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

      {profileInfo && (
        <UserprofileDetails userData={profileInfo.result} setClose={setClose} />
      )}

      {!close && profileInfo?.result && (
        <UserProfile
          data={profileInfo.result}
          setClose={setClose}
          setProfileInfo={setProfileInfo}
        />
      )}
    </div>
  );
};

export default Personal;

const UserProfile = ({ data, setClose, setProfileInfo }) => {
  const { user, userId } = useAuthContext();
  const [formData, setFormData] = useState({
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    profilePicture: data?.profilePicture || "",
    contactNumber: data?.contactNumber || "",
  });
  const [address, setAddress] = useState({
    street: data?.address?.street || "",
    city: data?.address?.city || "",
    state: data?.address?.state || "",
    postalCode: data?.address?.postalCode || "",
    country: data?.address?.country || "",
  });
  const [imagePreview, setImagePreview] = useState(data?.profilePicture || "");
  const [uploadError, setUploadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const UpdateProfile = async (e) => {
    e.preventDefault();

    const recordData = {
      ...formData,
      address: address,
      profilePicture: imagePreview,
    };

    try {
      setIsSubmitting(true);
      const res = await patch(ENDPOINTS.USER.UPDATE, recordData, userId.user_id);

      if (res) {
        setClose(true);
        const userInfoData = await getsingle(
          ENDPOINTS.USER.PROFILE,
          null,
          userId.user_id
        );
        setProfileInfo(userInfoData);
      }
    } catch (error) {
      setUploadError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  var countryArray = [];
  Object.keys(countries).forEach((code) => {
    const country = countries[code];
    const obj = {
      ...country,
      countryCode: code,
      value: code,
      label: country.name,
    };
    countryArray.push(obj);
  });

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-semibold">Basic Info</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setClose(true)}
          aria-label="Close"
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

        <form onSubmit={UpdateProfile} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Phone Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Profile Picture</label>
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
                  name="street"
                  value={address.street}
                  onChange={handleChangeAddress}
                />
              </div>
              <div>
                <Input
                  label="City"
                  name="city"
                  value={address.city}
                  onChange={handleChangeAddress}
                />
              </div>
              <div>
                <Input
                  label="State"
                  name="state"
                  value={address.state}
                  onChange={handleChangeAddress}
                />
              </div>
              <div>
                <Input
                  label="Postal Code"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChangeAddress}
                />
              </div>
              <div>
                <Select
                  label="Country"
                  options={countryArray}
                  value={address.country}
                  onChange={(value) => setAddress((prev) => ({ ...prev, country: value }))}
                  placeholder="Select a country"
                />
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

const UserprofileDetails = ({ userData, setClose }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-10">
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <label className="text-gray-700 font-bold mb-2" htmlFor="firstName">
            First Name:
          </label>
          <span className="text-gray-800">{userData.firstName}</span>
        </div>

        <div className="">
          <label className="text-gray-700 font-bold mb-2" htmlFor="lastName">
            Last Name:
          </label>
          <span className="text-gray-800">{userData.lastName}</span>
        </div>

        <div>
          <label className="text-gray-700 font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <span className="text-gray-800">{userData.username}</span>
        </div>

        <div>
          <label className="text-gray-700 font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <span className="text-gray-800">{userData.email}</span>
        </div>

        <div>
          <label className="text-gray-700 font-bold mb-2" htmlFor="role">
            Role:
          </label>
          <span className="text-gray-800">{userData.role}</span>
        </div>

        {userData?.address?.city && (
          <div className="col-span-2">
            <label
              className="text-gray-700 font-bold text-lg mb-4 pb-4"
              htmlFor="address"
            >
              Address:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  className="text-gray-700 font-bold mb-2"
                  htmlFor="street"
                >
                  Street:
                </label>
                <span className="text-gray-800">{userData.address.street}</span>
              </div>
              <div>
                <label className="text-gray-700 font-bold mb-2" htmlFor="city">
                  City:
                </label>
                <span className="text-gray-800">{userData.address.city}</span>
              </div>
              <div>
                <label className="text-gray-700 font-bold mb-2" htmlFor="state">
                  State:
                </label>
                <span className="text-gray-800">{userData.address.state}</span>
              </div>
              <div>
                <label
                  className="text-gray-700 font-bold mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code:
                </label>
                <span className="text-gray-800">
                  {userData.address.postalCode}
                </span>
              </div>
              <div>
                <label
                  className="text-gray-700 font-bold mb-2"
                  htmlFor="country"
                >
                  Country:
                </label>
                <span className="text-gray-800">
                  {userData.address.country}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className=" col-span-2 flex justify-end">
          <button
            type="button"
            onClick={() => setClose(false)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Update Information
          </button>
        </div>
      </div>
    </div>
  );
};
