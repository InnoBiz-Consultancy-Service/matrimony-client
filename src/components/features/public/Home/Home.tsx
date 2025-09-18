"use client";
import React from "react";
import Banner from "./Banner/Banner";
import SearchFilters from "./SearchFilters/SearchFilters";
import PricingSection from "./PricingSection/PricingSection";
import NewsLetter from "./NewsLetter/NewsLetter";
import AllTestimony from "../testimony/allTestimony/AllTestimony";


const Home = () => {
  return (
    <div>
      <Banner />
      <SearchFilters />
      
      <PricingSection />
      <AllTestimony />
      <NewsLetter />
    </div>
  );
};

export default Home;
