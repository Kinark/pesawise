import React from 'react';
import './styles.scss';

import { Container, Segment, Button, Loader, Dimmer, Image, List, Grid } from 'semantic-ui-react'
import Placeholder from './images/paragraph.png'
import Axios from 'axios';
import { ajaxUrl } from '~/components/Paths'
import CalculatorEditor from './components/CalculatorEditor'
import { Route, Link } from 'react-router-dom'
import qs from 'qs'

export default class CalculatorsList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         calculators: null,
         loading: true,
      };
      this.addCalculator = this.addCalculator.bind(this)
      this.changeActiveCalculator = this.changeActiveCalculator.bind(this)
      this.getActiveCalculator = this.getActiveCalculator.bind(this)
   }

   getData(here) {
      const that = here ? here : this;
      Axios.post(ajaxUrl + '/json/calculators.json').then(function (response) {
         // console.log(response.data)
         if (!deepCompare(that.state.calculators, response.data)) {
            that.setState({ calculators: response.data, loading: false })
         }
      });
   }

   componentDidMount() {
      const linkId = this.props.location.pathname.replace(/\/puppies\//g, "");
      this.changeActiveCalculator(linkId)
      // console.log(linkId)
      this.getData();
   }

   addCalculator() {
      const that = this;
      this.setState({ loading: true })
      Axios({
         method: 'post',
         url: ajaxUrl + '/save-calculator.php',
         data: qs.stringify({ "action": "add" })
      }).then(function (response) {
         if (response.data == 1) {
            that.getData();
         } else {
            swal("Oh no!", "Something went wrong D:", "error");
         }
      }).catch(function (error) {
         console.log(error);
         that.setState({ loading: false })
      });
   }

   componentDidUpdate() {
      if (this.state.loading != true) {
         if (this.state.activeCalc != null) {
            if (this.props.location.pathname == '/puppies')
               this.setState({ activeCalc: null })
            else
               this.getData();
         } else {
            this.getData();
         }
      }
   }

   changeActiveCalculator(id) {
      this.setState({ activeCalc: id })
   }

   getActiveCalculator(e, { id }) {
      this.changeActiveCalculator(id)
   }

   render() {
      return (
         <Container className="admin">
            <Grid columns='equal'>
               <Grid.Row>
                  <Grid.Column style={{marginBottom: '20px'}}>
                     <Route path="/puppies/:calculatorId" component={UnloadCalculator} />
                     <Segment attached>
                        {this.state.loading ? (<Loading />) : (<CalculatorItems activeCalc={this.state.activeCalc} onClick={this.getActiveCalculator} calculators={this.state.calculators} />)}
                     </Segment>
                     <Button compact color="blue" attached="bottom" onClick={this.addCalculator}>ADD CALCULATOR</Button>
                  </Grid.Column>
                  {/* <Route path="/puppies/:calculatorId" component={CalculatorEditor} /> */}
                  <Route path="/puppies/:calculatorId" render={props => <CalculatorEditor list={this} updateList={this.getData} {...props} />} />
               </Grid.Row>
            </Grid>
         </Container>
      );
   }
}

const UnloadCalculator = () => (
   <Button compact attached="top" as={Link} to="/puppies">UNLOAD ACTIVE CALCULATOR</Button>
)

const Loading = () => {
   return (
      <div>
         <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
         </Dimmer>
         <Image src={Placeholder} />
      </div>
   )
}

const CalculatorItems = (props) => {
   const { calculators, parentState, changeActiveCalculator, activeCalc, onClick } = props;
   return (
      <List divided relaxed="very">
         {calculators.map((i, index) => {
            const boca = index == 2 ? true : false
            return (
               <List.Item onClick={onClick} id={i.id} key={index} active={i.id == activeCalc}>
                  <List.Icon name='calculator' size='large' verticalAlign='middle' />
                  <List.Content>
                     <List.Header as={Link} to={'/puppies/' + i.id}>{i.calculator}</List.Header>
                     <List.Description as={Link} to={'/puppies/' + i.id}>{i.category} - {i.variables.length}VAR/{i.results.length}RES</List.Description>
                  </List.Content>
               </List.Item>
            )
         })}
      </List>
   )
}

function deepCompare() {
   var i, l, leftChain, rightChain;

   function compare2Objects(x, y) {
      var p;

      // remember that NaN === NaN returns false
      // and isNaN(undefined) returns true
      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
         return true;
      }

      // Compare primitives and functions.     
      // Check if both arguments link to the same object.
      // Especially useful on the step where we compare prototypes
      if (x === y) {
         return true;
      }

      // Works in case when functions are created in constructor.
      // Comparing dates is a common scenario. Another built-ins?
      // We can even handle functions passed across iframes
      if ((typeof x === 'function' && typeof y === 'function') ||
         (x instanceof Date && y instanceof Date) ||
         (x instanceof RegExp && y instanceof RegExp) ||
         (x instanceof String && y instanceof String) ||
         (x instanceof Number && y instanceof Number)) {
         return x.toString() === y.toString();
      }

      // At last checking prototypes as good as we can
      if (!(x instanceof Object && y instanceof Object)) {
         return false;
      }

      if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
         return false;
      }

      if (x.constructor !== y.constructor) {
         return false;
      }

      if (x.prototype !== y.prototype) {
         return false;
      }

      // Check for infinitive linking loops
      if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
         return false;
      }

      // Quick checking of one object being a subset of another.
      // todo: cache the structure of arguments[0] for performance
      for (p in y) {
         if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
         }
         else if (typeof y[p] !== typeof x[p]) {
            return false;
         }
      }

      for (p in x) {
         if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
         }
         else if (typeof y[p] !== typeof x[p]) {
            return false;
         }

         switch (typeof (x[p])) {
            case 'object':
            case 'function':

               leftChain.push(x);
               rightChain.push(y);

               if (!compare2Objects(x[p], y[p])) {
                  return false;
               }

               leftChain.pop();
               rightChain.pop();
               break;

            default:
               if (x[p] !== y[p]) {
                  return false;
               }
               break;
         }
      }

      return true;
   }

   if (arguments.length < 1) {
      return true; //Die silently? Don't know how to handle such case, please help...
      // throw "Need two or more arguments to compare";
   }

   for (i = 1, l = arguments.length; i < l; i++) {

      leftChain = []; //Todo: this can be cached
      rightChain = [];

      if (!compare2Objects(arguments[0], arguments[i])) {
         return false;
      }
   }

   return true;
}