import React from 'react'
import Banner from './Banner/Banner'
import PricingSection from './PricingSection/PricingSection'
import SearchFilters from './SearchFilters/SearchFilters'

const Home = () => {
  return (
    <div>
      <Banner />
      <SearchFilters />
      <PricingSection />
    </div>
  )
}

export default Home
