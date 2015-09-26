const React = require('react-native');
const { View, StyleSheet, Component } = React;
const AccountDetailsView = require('./account_details_view');
const LoginView = require('./login_view');
const user = require('./session');
const auth = require('./auth');
const { connect } = require('react-redux/native');
const { bindActionCreators } = require('redux');
const accountActions = require('./actions');

class AccountView extends Component {

  render() {
    const content = this.props.isAuthenticated
      ? <AccountDetailsView/>
      : <LoginView isSigningIn={this.props.isSigningIn}
                   errorMessage={this.props.errorMessage}
                   onLoginTap={(username, password) => this.doLogin(username, password)} />;

    return (<View style={styles.container}>{ content }</View>)
  }

  doLogin(username, password) {
    this.props.attemptLogin(username, password);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    flex: 1,
    backgroundColor:'#54488f'
  }
});

module.exports = connect(
  (state) => state.account,
  (dispatch) => bindActionCreators(accountActions, dispatch))
(AccountView);

