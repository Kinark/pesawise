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

const defaultState = {
   calculator: { calculator: 'Loading...', category: 'Loading...' },
   variables: {},
   loading: true,
   rates: [],
   resultsResults: {}
}

export default class Calculator extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         calculator: { calculator: 'Loading...', category: 'Loading...' },
         variables: {},
         loading: true,
         rates: [],
         resultsResults: {}
      }
      // this.state = this.initialState;
      // this.state = {};
      this.inputHandler = this.inputHandler.bind(this)
   }

   updateData() {
      const that = this;
      this.setState({
         calculator: { calculator: 'Loading...', category: 'Loading...' },
         variables: {},
         loading: true,
         rates: [],
         resultsResults: {}
      }, () => {
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
      })
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
      const that = this
      that.updateData();
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
      Number.prototype.round = function(places) {
            return +(Math.round(this + "e+" + places)  + "e-" + places);
          }

      this.setRatesVariables(() => {
         const results = this.state.calculator.results
         let prevResultsResults = this.state.resultsResults
         results.map((i, index) => {
            let value;
            if (i.min != '') {
               const evaluatedMin = this.replaceVariablesInStrig(i.min)
               if (!eval(evaluatedMin)) {
                  prevResultsResults[index] = 'Min. is: ' + i.min.replace(/^\D+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return;
               }
            }
            if (i.max != '') {
               const evaluatedMax = this.replaceVariablesInStrig(i.max)
               if (!eval(evaluatedMax)) {
                  prevResultsResults[index] = 'Max. is: ' + i.max.replace(/^\D+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return;
               }
            }
            const evaluatedExpression = this.replaceVariablesInStrig(i.expression)
            value = eval(evaluatedExpression);
            if (typeof value == 'undefined') return;
            if (i.decimals != '') {
               const evaluatedDecimals = this.replaceVariablesInStrig(i.decimals)
               prevResultsResults[index] = value.toFixed(evaluatedDecimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
            } else {
               prevResultsResults[index] = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
            }
         })
         this.setState({ resultsResults: prevResultsResults })
      })
   }

   inputHandler(name, value, checked) {
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
      this.inputHandler = this.inputHandler.bind(this)
   }

   inputHandler(e, { name, value, checked }) {
      const { onChange, type } = this.props;
      if (type == 'number') {
         var regex = /^[1-9][0-9]*$/;
         if (!regex.test(value) && value) {
            return;
         }
      }
      if (type == 'decimal') {
         // if(isNaN(value)){
         //      value = value.replace(/[^0-9]\.]/g,'');
         //      if(value.split('.').length>2) 
         //      value =value.replace(/\.+$/,"");
         //      return;
         // }
         if (isNaN(value)) {
            value = value.replace(/[^0-9]\.]/g, '');
            if (value.split('.').length > 2)
               value = value.replace(/\.+$/, "");
            return;
         }

         if (value == '00') {
            value = '0';
            return;
         }
      }
      onChange(name, value, checked)
   }

   componentDidMount() {
      const { name, options, type, onChange } = this.props;
      if (type == 'radio') {
         let optionsArray = options.replace(/ /g, '').split(',');
         onChange(name, optionsArray[0])
      }
      else if (type == 'select') {
         let optionsArray = options.replace(/ /g, '').split(',');
         onChange(name, optionsArray[0])
      }
   }

   render() {
      const { label, value, type, name, options } = this.props;
      let optionsArray = options.replace(/ /g, '').split(',');
      let optionsObject = []
      optionsArray.map(i => {
         let pushObject = { key: i, text: i, value: i }
         optionsObject.push(pushObject)
      })
      if (type == 'text')
         return <Form.Input onChange={this.inputHandler} name={name} value={value} label={label} fluid type={type} />
      if (type == 'number')
         return <Form.Input onChange={this.inputHandler} name={name} value={value} label={label} fluid type='text' maxLength='15' />
      else if (type == 'decimal')
         return <Form.Input onChange={this.inputHandler} name={name} value={value} label={label} fluid type='text' maxLength='15' />
      else if (type == 'select')
         return <Form.Select onChange={this.inputHandler} name={name} value={value} label={label} fluid options={optionsObject} />
      else if (type == 'radio')
         return (
            optionsArray.map((i, index) => {
               return <Form.Radio checked={value === i} index={index} onChange={this.inputHandler} name={name} label={i} value={i} key={index} />
            })
         )
      else if (type == 'checkbox')
         return <Form.Checkbox onChange={this.inputHandler} name={name} value={options} label={label} />
   }
}