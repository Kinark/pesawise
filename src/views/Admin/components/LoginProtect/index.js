import React from 'react';
import './styles.scss';

import { LoginContext } from '~/components/LoginContext';

import HeaderImage from '~/components/HeaderImage'
import Login from './components/Login'
import { ajaxUrl } from '~/components/Paths'
import Axios from 'axios';

export default class Admin extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         logged: false,
      };
      this.checkLogin = this.checkLogin.bind(this);
   }

   checkLogin() {
      const that = this;
      Axios.post(ajaxUrl + '/login.php').then(function (response) {
         // console.log(response.data)
         if (response.data == 1) {
            if (that.state.logged == false) that.setState({ logged: true })
         } else {
            if (that.state.logged == true) that.setState({ logged: false })
         }
      }).catch(function (error) {
         console.log(error);
      });
   }

   componentDidUpdate() {
      this.checkLogin()
   }

   componentWillMount() {
      this.checkLogin()
   }

   render() {
      return (
         <div>
            <LoginContext.Provider value={{ actions: { login: () => this.setState({ logged: true }), logout: () => this.setState({ logged: false }) } }} >
               {this.state.logged ? this.props.children : <Login />}
            </LoginContext.Provider>
         </div>
      );
   }
}