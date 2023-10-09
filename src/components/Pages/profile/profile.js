"use client";
import ImageUpload from "@/components/global/fields/ImageUpload";
import SelectField from "@/components/global/fields/SelectField";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import { get, getsingle, patch } from "@/lib/http";
import { countries } from "countries-list";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const Personal = () => {
  const { user, userId } = useAuthContext();
  const { loaderFalse, loaderTrue } = useGlobalAppContext();
  const [profileInfo, setProfileInfo] = useState(undefined);
  const [close, setClose] = useState(true);

  const getProfile = async () => {
    loaderTrue();
    try {
      if (userId?.user_id) {
        const res = await get(`/user/profile`, null, userId.user_id);
        setProfileInfo(res);
      }
    } catch (error) {
      console.log(error);
    }
    loaderFalse();
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container mx-auto py-8 text-black">
      <div className=" flex justify-between items-center">
        <h1 className="text-3xl font-semibold mb-4">My Profile</h1>
        {profileInfo?.result?.profilePicture && (
          <Image
            width={100}
            height={100}
            property="false"
            src={profileInfo.result.profilePicture}
            style={{ borderRadius: "50%", height: "100px" }}
            alt=""
          />
        )}
      </div>
      {profileInfo && (
        <UserprofileDetails userData={profileInfo.result} setClose={setClose} />
      )}
      {!close && (
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
  const { loader, loaderTrue, loaderFalse } = useGlobalAppContext();
  const [formData, setFormData] = useState({
    firstName: data?.firstName,
    lastName: data.lastName,
    profilePicture: data?.profilePicture,
    contactNumber: data?.contactNumber,
  });
  const [address, setAddress] = useState({
    street: data?.address?.street,
    city: data?.address?.city,
    state: data?.address?.state,
    postalCode: data?.address?.postalCode,
    country: data?.address?.country,
  });
  const [imagePreview, setimagePreview] = useState(data?.profilePicture);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const UpdateProfile = async (e) => {
    loaderTrue();
    e.preventDefault();

    const recordData = {
      ...formData,
      address: address,
      profilePicture: imagePreview,
    };

    try {
      const res = await patch(`/user`, recordData, userId.user_id);

      if (res) {
        setClose(true);
        const userInfoDaa = await getsingle(
          `/user/profile`,
          null,
          userId.user_id
        );
        setProfileInfo(userInfoDaa);
      } else {
      }
    } catch (error) {}
    loaderFalse();
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
    <form className="bg-gray-50 p-4 rounded-lg shadow-md">
      <div className=" flex justify-between items-center">
        {" "}
        <h2 className="text-2xl font-semibold mb-4">Basic Info</h2>{" "}
        <button className="text-red-500 hover:text-red-700 cursor-pointer">
          <MdClose size={24} onClick={() => setClose(true)} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-gray-600 font-semibold mb-2"
          >
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-gray-600 font-semibold mb-2"
          >
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="contactNumber"
            className="block text-gray-600 font-semibold mb-2"
          >
            Phone Number:
          </label>
          <input
            type="text"
            name="contactNumber"
            id="contactNumber"
            className="w-full  read-only:bg-slate-100 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <ImageUpload
            imagePreview={imagePreview}
            setImagePreview={setimagePreview}
          />
        </div>

        <div className="col-span-2 mt-10">
          <h2 className="block text-gray-600 font-semibold mb-2 text-2xl">
            Address:
          </h2>
        </div>

        <div>
          <label
            htmlFor="street"
            className="block text-gray-600 font-semibold mb-2"
          >
            Street:
          </label>
          <input
            type="text"
            name="street"
            id="street"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={address.street}
            onChange={handleChangeAddress}
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-gray-600 font-semibold mb-2"
          >
            City:
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={address.city}
            onChange={handleChangeAddress}
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-gray-600 font-semibold mb-2"
          >
            State:
          </label>
          <input
            type="text"
            name="state"
            id="state"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={address.state}
            onChange={handleChangeAddress}
          />
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="block text-gray-600 font-semibold mb-2"
          >
            Postal Code:
          </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={address.postalCode}
            onChange={handleChangeAddress}
          />
        </div>

        {
          <SelectField
            options={countryArray}
            value={address.country}
            onChange={handleChangeAddress}
            id={"country"}
            label={"Country"}
            placeholder={undefined}
          />
        }
      </div>
      <div className="col-span-1 mt-4 flex justify-end">
        <button
          type="button"
          onClick={UpdateProfile}
          // disabled={loader}
          className="bg-blue-500 text-white py-2 disabled:bg-blue-200 disabled:pointer-events-none px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Save Details
        </button>
      </div>
    </form>
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
