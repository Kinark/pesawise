import React from 'react';
import './styles.scss';

import { Container, Button, Checkbox, Form, Grid, Divider } from 'semantic-ui-react'
import Card from '~/components/Card'
import { Route } from 'react-router-dom'

import HeaderImage from '~/components/HeaderImage'
import LoginProtect from './components/LoginProtect'
import LogoutButton from './components/LogoutButton'
import CalculatorsList from './components/CalculatorsList'

const Admin = () => {
   return (
      <div>
         <HeaderImage header="Admin panel (or 🐶)" description="Let's edit some jsons." />
         <LoginProtect>
            <Route component={CalculatorsList} />
            <Container>
               <Divider section />
               <LogoutButton />
               <Divider hidden />
            </Container>
         </LoginProtect>
      </div>
   );
}

export default Admin;