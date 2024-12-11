import React from "react";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import About from "./Components/About";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />

      <section className="z-0 min-h-screen bg-black" />
    </main>
  );
};

export default App;
