import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from '~/components/Navbar';
import Admin from '~/views/Admin'
import Home from '~/views/Home'
import Calculator from '~/views/Calculator'
import Footer from '~/Components/Footer'
// import Sidenav from '~/Components/Sidenav'

const App = () => {
   return (
      <div>
         {/* <Sidenav> */}
         <Route component={Navbar} />
         <main>
            <Route exact path="/" component={Home} />
            <Route path="/calculator/:calculatorName" component={Calculator} />
            <Route path="/puppies" component={Admin} />
         </main>
         <Route component={Footer} />
         {/* </Sidenav> */}
      </div>
   )
}

export default App;