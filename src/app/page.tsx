"use client"
import React from "react";
import Container from './components/Container'
import { HarmoniaProvider } from "./context/HarmoniaContext"; 
const Home: React.FC = () => {
  return (
    <HarmoniaProvider>
      <div>
        <h1 className="font-merriweather text-4xl font-bold mx-8 pb-4">Harmonia</h1>
        <Container />
      </div>
    </HarmoniaProvider>
  );
};

export default Home;
