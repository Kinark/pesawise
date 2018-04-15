import React from 'react';
import './styles.scss';

import { Button } from 'semantic-ui-react'
import { LoginContext } from '~/components/LoginContext';
import Axios from 'axios';
import { ajaxUrl } from '~/components/Paths'

class LogoutButton extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false
      };
      this.logOut = this.logOut.bind(this);
   }
   logOut() {
      const that = this;
      this.setState({loading: true});
      Axios.post(ajaxUrl + '/logout.php').then(function (response) {
         that.setState({ loading: false });
         that.props.actions.logout();
      }).catch(function (error) {
         console.log(error);
         that.setState({ loading: false });
      });
   }
   render() {
      const loading = this.state.loading;
      return (
         <div>
            <Button color="red" loading={loading} onClick={this.logOut}>LOGOUT</Button>
         </div>
      )
   }
}

export default props => (
   <LoginContext.Consumer>
      {({ actions }) => (
         <LogoutButton {...props} actions={actions} />
      )}
   </LoginContext.Consumer>
);