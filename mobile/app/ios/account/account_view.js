const React = require('react-native');
const { View, StyleSheet, Component } = React;
const AccountDetailsView = require('./account_details_view');
const LoginView = require('./login_view');
const user = require('./session');

class AccountView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: user.isAuthenticated()
    };
  }

  render() {
    const content = this.state.isAuthenticated
      ? <AccountDetailsView/>
      : <LoginView onAuthenticated={this.onAuthenticated.bind(this)} />;

    return (<View style={styles.container}>{ content }</View>)
  }

  onAuthenticated() {
    this.setState({isAuthenticated: user.isAuthenticated()});
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    flex: 1
  }
});

module.exports = AccountView;

