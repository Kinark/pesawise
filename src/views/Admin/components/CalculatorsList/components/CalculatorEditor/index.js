import React from 'react';
import './styles.scss';

import { Container, Segment, Button, Grid, Form, Divider, Accordion, Label, Icon, Checkbox } from 'semantic-ui-react'
import Axios from 'axios';
import { ajaxUrl } from '~/components/Paths'
import { typeOptions } from './components/DefaultObjects'
import swal from 'sweetalert'
import SimpleCollapsible from '~/components/SimpleCollapsible'
import qs from 'qs';
import { Redirect } from 'react-router-dom'
import Urlfy from '~/components/Urlfy'


export default class CalculatorEditor extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         calculator: [],
         loading: true,
         saving: false,
         returnToPuppies: false
      };
      this.addVariable = this.addVariable.bind(this)
      this.addResult = this.addResult.bind(this)
      this.addRatesUsed = this.addRatesUsed.bind(this)
      this.handleInputs = this.handleInputs.bind(this)
      this.saveCalculator = this.saveCalculator.bind(this)
      this.deleteCalculator = this.deleteCalculator.bind(this)
   }

   updateData() {
      const that = this;
      let rightCalculator;
      Axios.get(ajaxUrl + '/calculators.json').then(response => {
         rightCalculator = response.data.find(function (calculator) {
            return calculator.id == that.props.match.params.calculatorId;
         });
         if (!rightCalculator) that.setState({ returnToPuppies: true })
         that.setState({ calculator: rightCalculator, loading: false })
      });
   }

   componentDidMount() {
      this.updateData();
   }

   componentWillReceiveProps() {
      this.updateData();
   }

   addVariable() {
      const defaultVariable = {
         type: "",
         name: "",
         options: "",
         variable_id: ""
      }
      let prevCalculator = this.state.calculator
      prevCalculator.variables.push(defaultVariable)
      this.setState({ calculator: prevCalculator })
   }

   addResult() {
      const defaultResult = {
         name: "",
         expression: "",
         min: "",
         max: "",
         used_rates_id: [
            {
               variable_id: "",
               value: "",
               condition: ""
            }
         ]
      }
      let prevCalculator = this.state.calculator
      prevCalculator.results.push(defaultResult)
      this.setState({ calculator: prevCalculator })
   }

   addRatesUsed(index) {
      const defaultRatesUsed = {
         variable_id: "",
         value: "",
         condition: ""
      }
      let prevCalculator = this.state.calculator
      prevCalculator.results[index].used_rates_id.push(defaultRatesUsed)
      this.setState({ calculator: prevCalculator })
   }

   removeVariable(index) {
      swal("Are you sure you want to do this?", { buttons: ["Cancel", "Delete"], dangerMode: true, }).then(value => {
         if (value !== true) return;
         let prevCalculator = this.state.calculator
         prevCalculator.variables.splice(index, 1);
         this.setState({ calculator: prevCalculator })
      })
   }

   removeResult(index) {
      swal("Are you sure you want to do this?", { buttons: ["Cancel", "Delete"], dangerMode: true, }).then(value => {
         if (value !== true) return;
         let prevCalculator = this.state.calculator
         prevCalculator.results.splice(index, 1);
         this.setState({ calculator: prevCalculator })
      })
   }

   removeResultRatesUsed(resultIndex, rateIndex) {
      swal("Are you sure you want to do this?", { buttons: ["Cancel", "Delete"], dangerMode: true, }).then(value => {
         if (value !== true) return;
         let prevCalculator = this.state.calculator
         prevCalculator.results[resultIndex].used_rates_id.splice(rateIndex, 1);
         this.setState({ calculator: prevCalculator })
      })
   }

   setVal(obj, accessors, val) {
      var parts = accessors.split('.');
      for (var i = 0; i < parts.length - 1; i++) {
         obj = obj[parts[i]]
      }
      obj[parts[parts.length - 1]] = val;
   }

   handleInputs(event, { value, name, checked }) {
      let prevCalculator = this.state.calculator
      const sendValue = checked == null ? value : String(checked)
      this.setVal(prevCalculator, name, sendValue)
      this.setState({ calculator: prevCalculator })
   }

   saveCalculator() {
      const that = this;
      this.setState({ saving: true })
      Axios({
         method: 'post',
         url: ajaxUrl + '/save-calculator.php',
         data: qs.stringify({ "calculatorArray": JSON.stringify(that.state.calculator), "action": "save" })
      }).then(function (response) {
         // console.log(response.data)
         that.setState({ saving: false })
         that.props.updateList(that.props.list)
         // that.updateData()
         if (response.data == 1) {
            swal("Awesome!", "The calculator has been saved!", "success");
         } else if (response.data == 0) {
            swal("Oh no!", "No calculator found. D:", "error");
         } else if (response.data == 2) {
            swal("Oh no!", "I think you're not logged in", "error");
         }
      }).catch(function (error) {
         console.log(error);
         that.setState({ saving: false })
      });
   }

   deleteCalculator() {
      const that = this;
      swal('OMG!!!', "Are you sure you want to delete the whole calculator?", { buttons: ["Cancel", "Delete"], dangerMode: true, icon: 'warning' }).then(value => {
         if (value !== true) return;
         this.setState({ saving: true })
         Axios({
            method: 'post',
            url: ajaxUrl + '/save-calculator.php',
            data: qs.stringify({ "calculatorArray": JSON.stringify(that.state.calculator), "action": "delete" })
         }).then(function (response) {
            // console.log(response.data)
            that.setState({ saving: false })
            if (response.data == 1) {
               swal("Awesome!", "The calculator has been removed!", "success").then(() => {
                  that.setState({ returnToPuppies: true })
               });
            } else if (response.data == 0) {
               swal("Oh no!", "No calculator found. D:", "error");
            } else if (response.data == 2) {
               swal("Oh no!", "I think you're not logged in", "error");
            }
         }).catch(function (error) {
            console.log(error);
            that.setState({ saving: false })
         });
      })
   }

   // clickToClipboard(string) {
   //    string.select();
   //    document.execCommand("Copy");
   // }

   // componentDidUpdate(prevProps, prevState) {
   //    console.log(this.state.calculator);
   // }

   render() {
      if (this.state.returnToPuppies) return <Redirect to='/puppies' />;
      const currentLink = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
      const calculator = this.state.calculator;
      const savingLoader = this.state.saving ? true : false
      const activeFix = (calculator.active == 'true')
      return (
         <Grid.Column width={12}>
            <Button color="blue" value="true" loading={savingLoader} attached="top" onClick={this.saveCalculator}>SAVE CALCULATOR</Button>
            <Segment attached>
               <Form>
                  {!this.state.loading &&
                     <div>
                        <h2>ID: {calculator.id}</h2>
                        <Checkbox toggle value="true" checked={activeFix} onChange={this.handleInputs} name="active" />
                        <Form.Group widths='equal'>
                           <Form.Input label="Calculator name" size="huge" value={calculator.calculator} name="calculator" onChange={this.handleInputs} name="calculator" type='text' />
                           <Form.Input label="Category" size="huge" value={calculator.category} name="category" onChange={this.handleInputs} name="category" type='text' />
                           <Form.Input label="Icon" size="huge" value={calculator.icon} name="icon" onChange={this.handleInputs} name="icon" type='text' />
                        </Form.Group>
                        <Label>
                           {/* <Icon name='linkify' /> {currentLink}/{calculator.calculator.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "")}-{calculator.id} */}
                           <Icon name='linkify' /> {Urlfy(currentLink + '/calculator/' + calculator.calculator)}
                        </Label>
                     </div>
                  }
                  <Grid columns='equal'>
                     <Grid.Row>
                        <Grid.Column>
                           <Divider horizontal>Variables</Divider>
                           {!this.state.loading &&
                              calculator.variables.map((i, varIndex) => {
                                 return (
                                    <div key={varIndex}>
                                       <Form.Group widths='equal'>
                                          <Form.Input onChange={this.handleInputs} name={"variables." + varIndex + ".name"} value={i.name} fluid label='Name' type='text' />
                                          <Form.Select onChange={this.handleInputs} name={"variables." + varIndex + ".type"} value={i.type} fluid label='Type' options={typeOptions} placeholder='Gender' />
                                       </Form.Group>
                                       <Form.Group widths='equal'>
                                          <Form.Input onChange={this.handleInputs} name={"variables." + varIndex + ".options"} value={i.options} fluid label='Options' placeholder="a, b, c, d" type='text' />
                                          <Form.Input onChange={this.handleInputs} name={"variables." + varIndex + ".variable_id"} value={i.variable_id} width={6} label='Variable' type='text' />
                                       </Form.Group>
                                       <Button compact floated="left" color="red" onClick={() => this.removeVariable(varIndex)}>Remove variable</Button>
                                       <Divider section />
                                    </div>
                                 )
                              })
                           }
                           <Button fluid onClick={this.addVariable}>Add new variable</Button>
                        </Grid.Column>
                        <Grid.Column width={9}>
                           <Divider horizontal>Results</Divider>
                           {!this.state.loading &&
                              calculator.results.map((i, resultIndex) => {
                                 return (
                                    <div key={resultIndex}>
                                       <Form.Group widths='equal'>
                                          <Form.Input onChange={this.handleInputs} name={"results." + resultIndex + ".name"} width={6} value={i.name} fluid label='Name' type='text' />
                                          <Form.Input onChange={this.handleInputs} name={"results." + resultIndex + ".expression"} width={4} value={i.expression} fluid label='Expression' type='text' />
                                          <Form.Input onChange={this.handleInputs} name={"results." + resultIndex + ".min"} width={3} value={i.min} fluid label='Min' type='text' />
                                          <Form.Input onChange={this.handleInputs} name={"results." + resultIndex + ".max"} width={3} value={i.max} fluid label='Max' type='text' />
                                       </Form.Group>
                                       <SimpleCollapsible title="rates">
                                          {typeof i.used_rates_id != "undefined" &&
                                             i.used_rates_id.map((i, rateIndex) => {
                                                return (
                                                   <Form.Group key={rateIndex}>
                                                      <Form.Input onChange={this.handleInputs} name={"results." + resultIndex + ".used_rates_id." + rateIndex + ".variable_id"} width={3} value={i.variable_id} label='Variable' type='text' />
                                                      <Form.Input onChange={this.handleInputs} name={"results." + resultIndex + ".used_rates_id." + rateIndex + ".value"} width={7} value={i.value} label='Value' type='text' />
                                                      <Form.Input onChange={this.handleInputs} name={"results." + resultIndex + ".used_rates_id." + rateIndex + ".condition"} width={4} value={i.condition} label='Condition' type='text' />
                                                      <Form.Button onClick={() => this.removeResultRatesUsed(resultIndex, rateIndex)} style={{ marginTop: '24px' }} icon='trash' />
                                                   </Form.Group>
                                                )
                                             })
                                          }
                                       </SimpleCollapsible>
                                       <Button compact floated="left" color="red" onClick={() => this.removeResult(resultIndex)}>Remove result</Button>
                                       <Button compact floated="right" onClick={() => this.addRatesUsed(resultIndex)}>Add new rate</Button>
                                       <Divider section />
                                    </div>
                                 )
                              })
                           }
                           <Button fluid onClick={this.addResult}>Add new result</Button>
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
               </Form>
            </Segment>
            <Button loading={savingLoader} color="red" attached="bottom" onClick={this.deleteCalculator}>DELETE CALCULATOR</Button>
         </Grid.Column>
      );
   }
}