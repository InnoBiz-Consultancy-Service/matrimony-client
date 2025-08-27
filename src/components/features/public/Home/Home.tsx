"use client";
import React from "react";
import Banner from "./Banner/Banner";
import SearchFilters from "./SearchFilters/SearchFilters";
import PricingSection from "./PricingSection/PricingSection";
import NewsLetter from "./NewsLetter/NewsLetter";
import { LanguageSelector } from "@/components/shared/languageSelector/LanguageSelector";

const Home = () => {
  return (
    <div>
      <LanguageSelector />
      <Banner />
      <SearchFilters />
      <PricingSection />
      <NewsLetter />
    </div>
  );
};

export default Home;
