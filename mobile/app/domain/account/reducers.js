import accountActions from 'domain/account/actions'

function account(state = {}, action = "") {
  switch (action.type) {
    case accountActions.LOGIN_ATTEMPTED:
      return Object.assign({}, state, {isSigningIn: true, errorMessage: ""});
    case accountActions.LOGIN_SUCCEED:
      return Object.assign({}, state, {isSigningIn: false, isAuthenticated: true});
    case accountActions.LOGIN_FAILED:
      return Object.assign({}, state, {isSigningIn: false, errorMessage: action.errorMessage});
    default:
      return state;
  }
}

module.exports = account;
