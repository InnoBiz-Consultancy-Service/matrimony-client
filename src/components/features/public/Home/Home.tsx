"use client";
import React from "react";
import Banner from "./Banner/Banner";
import SearchFilters from "./SearchFilters/SearchFilters";
import PricingSection from "./PricingSection/PricingSection";
import NewsLetter from "./NewsLetter/NewsLetter";

const Home = () => {
  return (
    <div>
      <Banner />
      <SearchFilters />
      <PricingSection />
      <NewsLetter />
    </div>
  );
};

export default Home;
