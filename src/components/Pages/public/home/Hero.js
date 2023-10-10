import AutocompleteSearch from "@/components/parts/SearchBlock/Search";
import InvokeAPI from "@/lib/network/invokeapi/invokeapi";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const data = [
  'Apples',
  'Bananas',
  'Oranges',
  'Grapes',
  'Strawberries',
  'Blueberries',
];
function HeroSection({ image }) {
  console.log("log",image?.urls);
  return (
    <section className="bg-white text-black text-gray-900 py-16">
      <div className="h-screen flex flex-col justify-center items-center">
        {image?.urls && (
          <Image
            src={image.urls.regular}
            alt="Pexels homepage hero image"
            layout="fill"
            objectFit="cover"
          />
        )}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 -z-10"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
          <h1 className=" text-5xl font-bold">Pexels</h1>
          <p className=" text-2xl mt-4">
            The best free stock photos, royalty free images & videos shared by
            creators.
          </p>
          <AutocompleteSearch fetchData={data}/>
          <button className="bg-white text-black px-4 py-2 rounded mt-8">
            Start browsing
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
