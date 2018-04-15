import React from 'react';
import './styles.scss';
import Axios from 'axios';
import { ajaxUrl } from '~/components/Paths'
import Card from '~/components/Card'
import { Container, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Urlfy from '~/components/Urlfy'

export default class FavCalculators extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         calculators: [],
         loading: true,
      };
   }

   componentDidMount() {
      // const favCalculators = []
      const that = this
      Axios.get(ajaxUrl + '/json/calculators.json').then(response => {
         that.setState({ calculators: response.data.filter(calculator => calculator.icon != ''), loading: false })
      })
   }

   componentWillUnmount() {
   }

   render() {
      const { loading, calculators } = this.state
      return (
         <Container>
            {!loading &&
               calculators.map((i, index) => (
                  <Link key={index} to={Urlfy('/calculator/' + i.calculator)}>
                     <Card className="card-fav">
                        {/* <i className={"fas fa-" + i.icon}></i> */}
                        <Icon name={i.icon} size='huge' />
                        {/* <div className="separator"></div> */}
                        <p>{i.calculator}</p>
                     </Card>
                  </Link>
               ))
            }
         </Container>
      );
   }
}