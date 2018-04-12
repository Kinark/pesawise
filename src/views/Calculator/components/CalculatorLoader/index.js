import React from 'react';
import './styles.scss';

import { Grid, Container, Header, Button, Checkbox, Form, List } from 'semantic-ui-react'
import Card from '~/components/Card'
import Axios from 'axios';
import { ajaxUrl } from '~/components/Paths'

const inputControlDictionary = {
   "text": "input",
   "number": "input"
}

export default class CalculatorLoader extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         calculator: [],
         loading: true,
      };
   }

   updateData() {
      const that = this;
      // console.log(this.props.calculatorName)
      let rightCalculator;
      Axios.get(ajaxUrl + '/calculators.json').then(function (response) {
         rightCalculator = response.data.find(function (calculator) {
            // console.log(calculator.calculator)
            return calculator.calculator.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "") == that.props.calculatorName;
         });
         that.setState({ calculator: rightCalculator, loading: false })
         console.log(rightCalculator)
      });
   }

   componentDidMount() {
      this.updateData();
   }

   // componentWillReceiveProps() {
   //    this.updateData();
   // }

   render() {
      return (
         <div>
            <HeaderImage header="Equity Bank" description="Equity to mpesa" />
            <Container>
               <Grid>
                  <Grid.Column width={5}>
                     <Card>
                        <Header as="h3" color="grey">Variables</Header>
                        <Form>
                           <Form.Field>
                              <label>First Name</label>
                              <input placeholder='First Name' />
                           </Form.Field>
                           <Form.Field>
                              <label>Last Name</label>
                              <input placeholder='Last Name' />
                           </Form.Field>
                           <Form.Field>
                              <Checkbox label='I agree to the Terms and Conditions' />
                           </Form.Field>
                           <Button type='submit'>Submit</Button>
                        </Form>
                     </Card>
                  </Grid.Column>
                  <Grid.Column width={11}>
                     <Card>
                        <Header as="h3" color="grey">Results</Header>


                        <List divided verticalAlign='middle' animated relaxed="very">
                           <List.Item>
                              <List.Content floated='right'>37</List.Content>
                              <List.Content>EQUITY BANK</List.Content>
                           </List.Item>
                           <List.Item>
                              <List.Content floated='right'>37</List.Content>
                              <List.Content>EQUITY BANK</List.Content>
                           </List.Item>
                           <List.Item>
                              <List.Content floated='right'>37</List.Content>
                              <List.Content>EQUITY BANK</List.Content>
                           </List.Item>
                           <List.Item>
                              <List.Content floated='right'>37</List.Content>
                              <List.Content>EQUITY BANK</List.Content>
                           </List.Item>
                        </List>


                     </Card>
                  </Grid.Column>
               </Grid>
            </Container>
         </div>
      );
   }
}