import React from 'react';
import './styles.scss';

import HeaderImage from '~/components/HeaderImage'
import { Grid, Container, Header, Button, Checkbox, Form, List, Responsive } from 'semantic-ui-react'
import Card from '~/components/Card'
import Axios from 'axios';
// import AdSense from 'react-adsense';
import { ajaxUrl } from '~/components/Paths'
import Urlfy from '~/components/Urlfy'

function extract(data, where) {
   for (var key in data) {
      where[key] = data[key];
   }
}

const deep_value = function (obj, path) {
   let pathLet = path;
   for (let i = 0, pathLet = path.split('.'), len = pathLet.length; i < len; i++) {
      // console.log(obj)
      obj = obj[pathLet[i]];
   };
   return obj;
};

export default class Calculator extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         calculator: { calculator: 'Loading...', category: 'Loading...' },
         variables: {},
         loading: true,
         rates: [],
         resultsResults: {}
      };
      this.inputHandler = this.inputHandler.bind(this)
   }

   updateData() {
      const that = this;
      let rightCalculator;
      Axios.post(ajaxUrl + '/api.php').then(function (response) {
         // console.log(response.data.calculators)
         rightCalculator = response.data.calculators.find(function (calculator) {
            return Urlfy(calculator.calculator) == that.props.match.params.calculatorName;
         });
         // console.log(rightCalculator)
         // rightCalculator
         const variablesCreator = {}
         rightCalculator.variables.map(i => {
            variablesCreator[i.variable_id] = ''
         })
         that.setState({ calculator: rightCalculator, variables: variablesCreator, rates: response.data.rates, loading: false, })
      });
   }

   replaceVariablesInStrig(string) {
      let varsToBeExtracted;
      const variables = this.state.variables;
      let transformedString = string;
      Object.entries(variables).map(([key, value], index) => {
         if (transformedString.indexOf(key) > -1) {
            const valueToReplace = value == '' ? 0 : value
            var regex = new RegExp(key + "\\b", "g");
            transformedString = transformedString.replace(regex, valueToReplace)
         }
      });
      // console.log(transformedString)
      return transformedString
   }

   componentWillReceiveProps() {
      this.updateData();
   }

   setRatesVariables(cb) {
      const that = this;
      const calculator = this.state.calculator;
      const prevVariables = this.state.variables;

      calculator.results.map(i => {
         i.used_rates_id.map(i => {
            if (i.variable_id == '') return false;
            let value;
            if (i.condition != "") {
               value = deep_value(that.state.rates, i.value)
               const evaluatedCondition = this.replaceVariablesInStrig(i.condition)
               for (let key in value) {
                  if (eval(key + evaluatedCondition)) {
                     value = value[key]
                     break;
                  }
               }
            } else {
               value = deep_value(that.state.rates, i.value)
            }
            prevVariables[i.variable_id] = value;
         })
      })
      this.setState({ variables: prevVariables }, cb)
   }

   componentDidMount() {
      this.updateData();
   }

   calculateThings() {
      this.setRatesVariables(() => {
         const results = this.state.calculator.results
         let prevResultsResults = this.state.resultsResults
         results.map((i, index) => {
            let value;
            if (i.min != '') {
               const evaluatedMin = this.replaceVariablesInStrig(i.min)
               if (!eval(evaluatedMin)) {
                  prevResultsResults[index] = 'Min. is: ' + i.min.replace(/^\D+/g, '');
                  return;
               }
            }
            if (i.max != '') {
               const evaluatedMax = this.replaceVariablesInStrig(i.max)
               if (!eval(evaluatedMax)) {
                  prevResultsResults[index] = 'Max. is: ' + i.max.replace(/^\D+/g, '');
                  return;
               }
            }
            const evaluatedExpression = this.replaceVariablesInStrig(i.expression)
            value = eval(evaluatedExpression);
            if (typeof value == 'undefined') return;
            prevResultsResults[index] = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
         })
         this.setState({ resultsResults: prevResultsResults })
      })
   }

   inputHandler(e, { name, value, checked }) {
      const sendValue = checked === undefined ? value : (checked ? value : "")
      const prevVariables = this.state.variables
      prevVariables[name] = sendValue;
      this.setState({ variables: prevVariables }, () => this.calculateThings())
   }

   render() {
      const { calculator, loading } = this.state;
      return (
         <div>
            <HeaderImage header={calculator.calculator} description={calculator.category} />
            <Container>
               <Grid>
                  <Grid.Column mobile={16} tablet={5} computer={5}>
                     <Card className="calculators">
                        <Header as="h3" color="grey">Variables</Header>
                        <Form>
                           {!loading &&
                              calculator.variables.map((i, index) => {
                                 return <InputHandler key={index} value={this.state.variables[i.variable_id]} onChange={this.inputHandler} name={i.variable_id} label={i.name} options={i.options} type={i.type} />
                              })
                           }
                        </Form>
                     </Card>
                     {/* {!loading &&
                        <Responsive maxWidth="767">
                        <AdSense.Google client="ca-pub-9133489553464763" slot="9482666918" style={{ display: 'block' }} layout='in-article' format='fluid' />
                        </Responsive>
                     } */}
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={11} computer={11}>
                     <Card className="calculators">
                        <Header as="h3" color="grey">Results</Header>
                        <List divided verticalAlign='middle' animated relaxed="very">
                           {!loading &&
                              calculator.results.map((i, index) => {
                                 return (
                                    <List.Item key={index}>
                                       <List.Content floated='right'>{this.state.resultsResults[index]}</List.Content>
                                       <List.Content>{i.name}</List.Content>
                                    </List.Item>
                                 )
                              })
                           }
                        </List>
                     </Card>
                  </Grid.Column>
               </Grid>
               {/* <AdSense.Google client="ca-pub-9133489553464763" slot="6796793825" style={{ display: 'block' }} layout='in-article' format='fluid' /> */}
            </Container>
         </div>
      );
   }
}


class InputHandler extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         radioChecked: null
      };
      this.handleRadio = this.handleRadio.bind(this)
      // this.handleCheckbox = this.handleCheckbox.bind(this)
   }
   handleRadio(e, { name, value }) {
      this.setState({ radioChecked: value })
      this.props.onChange(e, { name, value })
   }
   // handleCheckbox(e, { name, value, checked }) {
   //    this.props.onChange(e, { name, value, checked })
   // }

   validate(e) {
      var theEvent = e || window.event;
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      var regex = /[0-9]/;
      if (!regex.test(key)) {
         theEvent.returnValue = false;
         if (theEvent.preventDefault) theEvent.preventDefault();
      }
   }

   render() {
      const { onChange, label, value, type, name, options } = this.props;
      let optionsArray = options.replace(/ /g, '').split(',');
      let optionsObject = []
      optionsArray.map(i => {
         // console.log(i)
         let pushObject = { key: i, text: i, value: i }
         optionsObject.push(pushObject)
      })
      if (type == 'text')
         return <Form.Input onChange={onChange} name={name} value={value} label={label} fluid type={type} />
      if (type == 'number')
         return <Form.Input onChange={onChange} onKeyPress={this.validate} name={name} value={value} label={label} fluid type={type} />
      else if (type == 'select')
         return <Form.Select onChange={onChange} name={name} label={label} fluid options={optionsObject} />
      else if (type == 'radio')
         return (
            optionsArray.map((i, index) => {
               return <Form.Radio checked={this.state.radioChecked === i} onChange={this.handleRadio} name={name} label={i} value={i} key={index} />
            })
         )
      else if (type == 'checkbox')
         return <Form.Checkbox onChange={onChange} name={name} value={options} label={label} />
   }
}