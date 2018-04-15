import React from 'react';
import './styles.scss';

import { Container, Grid } from 'semantic-ui-react'

const HeaderImage = (props) => {
   const noContainer = props.noContainer ? 'admin' : '';
   return (
      <div className="header-image">
         <Container className={noContainer}>
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