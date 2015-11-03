import auth from 'great_pizzas/account/auth'

const actions = exports = module.exports;

actions.LOGIN_ATTEMPTED = 'LOGIN_ATTEMPTED';
actions.LOGIN_SUCCEED = 'LOGIN_SUCCEED';
actions.LOGIN_FAILED = 'LOGIN_FAILED';

exports.attemptLogin = (username, password) => {
  return (dispatch) => {
    dispatch(actions.beginLoginAttempt(username, password));

    return auth.login(username, password)
      .then((data) => {
        dispatch(actions.loginSucceed(data));
      })
      .catch((error) => {
        dispatch(actions.loginFailed(error.message));
      });
  };
};

exports.beginLoginAttempt = (username, password) => {
  return {
    type: 'LOGIN_ATTEMPTED',
    username: username,
    password: password
  };
};

exports.loginSucceed = (authResponse) => {
  return {
    type: 'LOGIN_SUCCEED',
    session: {
      token: authResponse.token,
      user: authResponse.user
    }
  };
};

exports.loginFailed = (errorMessage) => {
  return {
    type: 'LOGIN_FAILED',
    errorMessage: errorMessage
  };
};
