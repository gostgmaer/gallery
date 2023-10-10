import ComboBox from "@/components/parts/SearchBlock/Search";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const data = ["Apples", "Bananas", "Oranges", "Grapes"];
function HeroSection({  }) {



  return (
    <section className="bg-white text-gray-900">
      <div className={`h-[calc(100vh-1.25rem)] min-h-[calc(100vh-1.25rem)] bg-[url(/homeback.avif)]  flex-col justify-center items-center`}>
        <div className="absolute  top-16 left-0 text-white right-0 bottom-0  gap-2 flex flex-col justify-center items-start mx-60">
          <h1 className=" text-6xl font-bold">Pexels</h1>
          <p className=" text-2xl mt-4">The best free stock photos creators.</p>
          <p className="text-lg mt-1">
            {" "}
            royalty free images & videos shared by
          </p>
          {/* <AutocompleteSearch fetchData={fetchData}/> */}
          <ComboBox classes={" w-2/3"} />
          <div>
            <p>
              Trending :
              {data.map((item, index) => (
                <span key={index} className=" mx-1">
                  {item}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
