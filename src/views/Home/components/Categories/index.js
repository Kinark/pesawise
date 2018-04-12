import React from 'react';
import './styles.scss';

import Card from '~/components/Card'
import { Calculators } from '~/components/Calculators'
import { Container } from 'semantic-ui-react'

const Safaricon = (
   <Card className="card-category">
      <i className="fas fa-mobile"></i>
      <div className="separator"></div>
      <p>Safaricon</p>
   </Card>
)

const Equity = (
   <Card className="card-category">
      <i className="fas fa-university"></i>
      <div className="separator"></div>
      <p>Equity Bank</p>
   </Card>
)

const Other = (
   <Card className="card-category">
      <i className="fas fa-ellipsis-h"></i>
      <div className="separator"></div>
      <p>Other</p>
   </Card>
)

const triggers = [Safaricon, Equity, Other]

const Categories = () => {
   return (
      <Container>
         <Calculators triggers={triggers} />
      </Container>
   )
}
export default Categories;