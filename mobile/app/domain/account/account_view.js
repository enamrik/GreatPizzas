import React from 'react-native'
import AccountDetailsView from 'domain/account/account_details_view'
import LoginView from 'domain/account/login_view'
import user from 'domain/account/session'
import auth from 'domain/account/auth'
import { connect } from 'react-redux/native'
import { bindActionCreators } from 'redux'
import accountActions from 'domain/account/actions'

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

