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

const title = 'PesaWise'
const description = 'Simple, cool and fast.'
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
