import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import FeaturedListings from "./components/FeaturedListings";
import NHMMPackages from "./components/NHMMPackages";
import Finance from "./components/Finance";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <div
        className={`transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <HowItWorks />
          <FeaturedListings />
          <NHMMPackages />
          <Finance />
        </main>
        <Footer />
      </div>
    </>
  );
}
