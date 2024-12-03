import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopServiceProviders from '../components/TopServiceProviders'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopServiceProviders />
      <Banner/>
    </div>

  )
}

export default Home