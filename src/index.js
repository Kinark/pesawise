import React from 'react'
import ReactDOM from 'react-dom'
import App from '~/App'
import { Metas } from '~/components/Metas'
import Favicon from '~/components/Favicon'
import { BrowserRouter, Route } from 'react-router-dom'

// import 'skeleton-css/css/normalize.css';
import 'semantic-ui-css/semantic.min.css'
// import "../pesawise-semantic/semantic.less";
import './style.scss'

const title = 'PesaWise | M-PESA, PesaLink, PayPal, Treasury Bills'
const description = 'Calculate Safaricom M-PESA transaction charges, Airtel Money, T-Kash, PesaLink fees for all major Kenyan banks, PayPal to Equity Account fees using the up to date exchange rates, Treasury Bills Investment Return, M-PESA Agent Commission & so much more.'
// const cover = "";

if (!Object.entries) {
   window.Object.entries = function (obj) {
      var ownProps = Object.keys(obj),
         i = ownProps.length,
         resArray = new Array(i); // preallocate the Array
      while (i--)
         resArray[i] = [ownProps[i], obj[ownProps[i]]];

      return resArray;
   };
}

ReactDOM.render(
   <div>
      <Metas title={title} description={description} />
      <Favicon />
      <BrowserRouter>
         <Route component={App} />
      </BrowserRouter>
   </div>,
   document.getElementById('root')
)
