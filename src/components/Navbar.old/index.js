import React from 'react';
import './styles.scss';
import { LogoFullGradient } from '~/components/Logo'

import { NavbarConstructor, NavItem } from '~/components/NavbarConstructor';

import Dropdown from '~/components/SimpleDropdown'

const settings = {
   logoPosition: 'left',
   itemsPosition: 'right',
   logo: LogoFullGradient
}

const Navbar = (props) => {
   return (
      <NavbarConstructor settings={settings}>
         <li><Dropdown list={colours} selected={colours[0]}>Select</Dropdown></li>
      </NavbarConstructor>
   )
}
export default Navbar;

// const Link1 = () => {
//    return (
//       <Dropdown>
//          <Dropdown.Toggle>
//             Asasas
//          </Dropdown.Toggle>
//          <Dropdown.Menu>
//             <MenuItem eventKey={1}>Link</MenuItem>
//          </Dropdown.Menu>
//       </Dropdown>
//    )
// }