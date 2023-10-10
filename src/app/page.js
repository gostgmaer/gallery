import HeroSection from "@/components/Pages/public/home/Hero";
import Pagination from "@/components/global/fields/pagination/Pagination";
import InvokeAPI from "@/lib/network/invokeapi/invokeapi";
import Image from "next/image";



export default async function Home() {
  function performAction() {
    // Define your action here, such as opening a modal or redirecting to a new page.
    alert("Image clicked! You can perform your action here.");
  }
  // try {
  //   const data = await InvokeAPI(
  //     "/photos/random",
  //     "get",
  //     {},
  //     {},
  //     { orientation: "landscape" }
  //   );
  //   return (
  //     <div className="home">
  //       <HeroSection/>
  //     </div>
  //   );
  // } catch (error) {
  //   return <div className="home">No data found</div>;
  // }

  return (
    <div className="home">
      <HeroSection image={undefined}/>
    </div>
  );

}

// async function getImage() {
//   const images = await InvokeAPI("/photos/random", "get", {}, {}, {});

//   return images.json();
// }
