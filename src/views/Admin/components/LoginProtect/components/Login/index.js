import React from 'react';
import './styles.scss';

import { LoginContext } from '~/components/LoginContext';

import { Container, Card, Button, Checkbox, Form } from 'semantic-ui-react'
import CardBlue from '~/components/Card'
import Axios from 'axios';
import { ajaxUrl } from '~/components/Paths'
import qs from 'qs';

class Login extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: null,
         password: null,
         loading: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
   }

   handleSubmit() {
      const that = this;
      this.setState({loading: true})
      Axios({
         method: 'post',
         url: ajaxUrl + '/login.php',
         data: qs.stringify(that.state)
      }).then(function (response) {
         // console.log(response.data)
         that.setState({ loading: false })
         if (response.data==1) {
            that.props.actions.login();
         }
      }).catch(function (error) {
         console.log(error);
         that.setState({ loading: false })
      });
   }

   render() {
      return (
         <Container>
            <Card centered>
               <Card.Content>
                  <Form loading={this.state.loading} onSubmit={this.handleSubmit}>
                     <Form.Field>
                        <Form.Input label="E-mail" name="email" type="text" placeholder='example@email.com' onChange={this.handleChange} />
                     </Form.Field>
                     <Form.Field>
                        <Form.Input label="Password" name="password" type="password" placeholder='*****' onChange={this.handleChange} />
                     </Form.Field>
                     <Button type='submit'>Submit</Button>
                  </Form>
               </Card.Content>
            </Card>
         </Container>
      );
   }
}

export default props => (
   <LoginContext.Consumer>
      {({ actions }) => (
         <Login {...props} actions={actions} />
      )}
   </LoginContext.Consumer>
);