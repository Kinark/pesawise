import React from 'react';
import './styles.scss';

// import Categories from './components/Categories'
import FavCalculators from '~/components/FavCalculators'
import HeaderImage from '~/components/HeaderImage'
import AdSense from 'react-adsense';
import { Container } from 'semantic-ui-react'
// import { gaAddress } from '~/components/Paths'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const Home = () => {
   return (
      <div>
         <HeaderImage header="Welcome to PesaWise!" description="Please, choose your calculator from the bar above or from the options below." />
         <div className="center">
            <FavCalculators />
         </div>
         <Container>
            <AdSense.Google client="ca-pub-9133489553464763" slot="2012366852" />
         </Container>
      </div>
   )
}
export default Home;