import React from 'react';
import './styles.scss';

import { Image, Container, Header } from 'semantic-ui-react'
import { LogoGradient } from '~/components/Logo'

const Footer = () => {
   return (
      <footer className="footer">
         <Container>
            <Image centered src={LogoGradient} size='tiny' />
            {/* <Header as="h2">
               Download our app!
               <Header.Subheader>
                  And never miss an oportunity!
               </Header.Subheader>
            </Header> */}
            <Header as="h2">
               DISCLAIMER
            </Header>
            {/* <p>You can have our calculators anywhere you go!</p> */}
            <p>We strives to ensure the accuracy and reliability of the information provided on this website. However, the information is provided "as is" without warranty of any kind. We do not accept any responsibility or liability for the accuracy, content, completeness, legality, or reliability of the information contained on this website.</p>
         </Container>
      </footer>
   )
}
export default Footer;