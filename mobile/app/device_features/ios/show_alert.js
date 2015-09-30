var React = require('react-native');
var { AlertIOS } = React;

module.exports = function(title, description) {
  AlertIOS.alert(title, description);
};
