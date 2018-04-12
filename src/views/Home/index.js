import React from 'react';
import './styles.scss';

// import Categories from './components/Categories'
import FavCalculators from '~/components/FavCalculators'
import HeaderImage from '~/components/HeaderImage'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
   'one', 'two', 'three'
]

const Home = () => {
   return (
      <div>
         <HeaderImage header="Welcome to PesaWise!" description="Please, choose your calculator from the bar above or from the options below." />
         {/* <Categories /> */}
         <div className="center">
            <FavCalculators />
         </div>
      </div>
   )
}
export default Home;