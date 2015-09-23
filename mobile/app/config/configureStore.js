const accountReducers = require('../ios/account/reducers');
const { createStore, combineReducers, applyMiddleware } = require('redux');
const thunk = require('redux-thunk');

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const reducer = combineReducers({
  account: accountReducers
});

const defaultStoreValues = {
  account: {
    errorMessage: "",
    isSigningIn: false,
    isAuthenticated: false
  }
};

module.exports = function configureStore(initialStateOverrides) {
  return createStoreWithMiddleware(
    reducer,
    Object.assign({}, defaultStoreValues, initialStateOverrides));
};
