import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Container from '@material-ui/core/Container';
import UserService from '../services/user-service';
import RewardsHome from './RewardsHome';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoggedIn: false
    }
  }
  componentWillMount() {
  }

  render() {
    return (
      this.state.hasLoggedIn ?
      <div>
      <MuiThemeProvider>
        <AppBar
          title="Welcome"
        />
        <Container maxWidth="md">
          <RewardsHome userName={this.state.username}></RewardsHome>
        </Container>
      </MuiThemeProvider>
    </div>
        :
        <div>
          <MuiThemeProvider>
            <AppBar
              title="Welcome To Rewards Home"
            />
            <Container maxWidth="md">
              <div>
                <p>Login:</p>
                <div>
                  <TextField
                    hintText="Enter your User Name"
                    floatingLabelText="user name"
                    onChange={(event, newValue) => this.setState({ username: newValue })}
                  />
                  <br />
                  <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange={(event, newValue) => this.setState({ password: newValue })}
                  />
                  <br />
                  <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                </div>
              </div>
              <div>Please refer readme file for valid user login</div>
            </Container>
          </MuiThemeProvider>
        </div>
    );
  }

  handleClick() {
    var self = this;
    var payload = {
      "userName": this.state.username,
      "password": this.state.password
    }
    new UserService().login(payload)
      .then(response => {
        if (response) {
          self.setState({ hasLoggedIn: true });
        }
        else {
          console.log("Username does not exists");
          alert("Login failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

const style = {
  margin: 15,
};

export default Login;