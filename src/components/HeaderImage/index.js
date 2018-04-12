import React from 'react';
import './styles.scss';

import { Container, Grid } from 'semantic-ui-react'

const HeaderImage = (props) => {
   return (
      <div className="header-image">
         <Container>
            <Grid>
               <Grid.Column mobile={16} tablet={16} computer={10}>
                  <h1>{props.header}</h1>
                  <h2>{props.description}</h2>
               </Grid.Column>
            </Grid>
         </Container>
      </div>
   )
}
export default HeaderImage;