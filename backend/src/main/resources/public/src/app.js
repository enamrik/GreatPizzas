import React from 'react'
import ReactDOM from 'react-dom'
import http from 'api_request/http'
import LoginView from 'login_view'

const { Component } = React;

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      username: ""
    }
  }
  render() {
    if(this.state.isAuthenticated) {
      return <div><h2>{this.state.username}</h2></div>;
    }
    return <LoginView onLoginRequest={this.logIn.bind(this)} />
  }

  logIn(username, password) {
    http("/login", {
      method:'POST',
      body:{username: username, password: password}
    })
      .then(() => {
        this.setState({isAuthenticated: true, username: username});
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

ReactDOM.render(<MainApp />, document.getElementById("app"));