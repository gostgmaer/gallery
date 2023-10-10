import HeroSection from "@/components/Pages/public/home/Hero";
import Home from "@/components/Pages/public/home/Home";


export default async function Index() {
  function performAction() {
    // Define your action here, such as opening a modal or redirecting to a new page.
    alert("Image clicked! You can perform your action here.");
  }


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
