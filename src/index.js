import React from 'react'
import ReactDOM from 'react-dom'
import App from '~/App'
import { Metas } from '~/components/Metas'
import Favicon from '~/components/Favicon'
import { BrowserRouter, Route } from 'react-router-dom'

import "core-js/fn/array/find";
import "core-js/fn/object/entries";

import 'semantic-ui-css/semantic.min.css'
import './style.scss'

const title = 'PesaWise | M-PESA, PesaLink, PayPal, Treasury Bills'
const description = 'Calculate Safaricom M-PESA transaction charges, Airtel Money, T-Kash, PesaLink fees for all major Kenyan banks, PayPal to Equity Account fees using the up to date exchange rates, Treasury Bills Investment Return, M-PESA Agent Commission & so much more.'
// const cover = "";

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
