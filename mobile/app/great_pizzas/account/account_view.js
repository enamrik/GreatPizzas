import React from 'react-native'
import AccountDetailsView from 'great_pizzas/account/account_details_view'
import LoginView from 'great_pizzas/account/login_view'
import user from 'great_pizzas/account/session'
import auth from 'great_pizzas/account/auth'
import { connect } from 'react-redux/native'
import { bindActionCreators } from 'redux'
import accountActions from 'great_pizzas/account/actions'

const { View, StyleSheet, Component } = React;

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
    flex: 1,
    backgroundColor:'#54488f'
  }
});

module.exports = connect(
  (state) => state.account,
  (dispatch) => bindActionCreators(accountActions, dispatch))
(AccountView);

