import React from 'react'
const { Component } = React;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" }
  }

  render() {
    return (
      <div>
        <div>
          <label>Username</label>
          <input id="username"
                 type="text"
                 onChange={e => this.setState({username: e.target.value})} />
        </div>
        <div>
          <label>Password</label>
          <input id="password"
                 type="password"
                 onChange={e => this.setState({password: e.target.value})}/>
        </div>
        <button onClick={this.loginButtonPressed.bind(this)}>Sign In</button>
      </div>
    );
  }

  loginButtonPressed() {
    this.props.onLoginRequest(this.state.username, this.state.password);
  }
}

