import React from 'react';
import './styles.scss';

import { Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Calculators = (props) => {
   const triggers = props.triggers ? props.triggers : [null, null, null]
   return (
      <div>
         <Safaricon {...props} trigger={triggers[0]} />
         <Equity {...props} trigger={triggers[1]} />
         <Other {...props} trigger={triggers[2]} />
      </div>
   )
}

const Safaricon = (props) => {
   const text = props.trigger ? null : 'Safaricon';
   return (
      <Dropdown {...props} text={text} trigger={props.trigger} icon={null}>
         <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/calculator'>Withdrawal & Transfer</Dropdown.Item>
            <Dropdown.Item as={Link} to='/calculator/agent-commission'>Agent Commission</Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   )
}

const Equity = (props) => {
   const text = props.trigger ? null : 'Equity Bank';
   return (
      <Dropdown {...props} text={text} trigger={props.trigger} icon={null}>
         <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/calculator'>Equity to mpesa</Dropdown.Item>
            <Dropdown.Item as={Link} to='/calculator'>Cash Withdrawal</Dropdown.Item>
            <Dropdown.Item as={Link} to='/calculator'>PesaLink</Dropdown.Item>
            <Dropdown.Item as={Link} to='/calculator'>PayPal to Account</Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   )
}

const Other = (props) => {
   const text = props.trigger ? null : 'Other';
   return (
      <Dropdown {...props} text={text} trigger={props.trigger} icon={null}>
         <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/calculator'>Airtel Money</Dropdown.Item>
            <Dropdown.Item as={Link} to='/calculator'>T-Kash</Dropdown.Item>
            <Dropdown.Item as={Link} to='/calculator'>PesaLink</Dropdown.Item>
            <Dropdown.Item as={Link} to='/calculator'>Treasury Bills</Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   )
}




export { Calculators, Safaricon, Equity, Other };