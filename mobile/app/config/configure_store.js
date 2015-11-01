import accountReducers from 'domain/account/reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

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
