import HeroSection from "@/components/Pages/public/home/Hero";
import Home from "@/components/Pages/public/home/Home";


export default async function Index() {
  return (
    <div className="home">
      <HeroSection />
      <Home/>
    </div>
  );
}

// async function getImage() {
//   const images = await InvokeAPI("/photos/random", "get", {}, {}, {});

//   return images.json();
// }
