var React = require('react-native');
var { View, StyleSheet, Text, TouchableHighlight } = React;
var LabeledFieldView = require('../forms/labeled_field_view');

var AccountView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.signInForm}>
          <LabeledFieldView fieldName="Username"></LabeledFieldView>
          <LabeledFieldView fieldName="Password"></LabeledFieldView>
        </View>
        <TouchableHighlight style={styles.signInButton} onPress={this.signIn}>
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  },

  signIn: function() {

  }
});

var styles = StyleSheet.create({
  container: {
    paddingTop:20,
    flex: 1,
    flexDirection:'column',
    justifyContent:'center'
  },
  signInForm: {
    flex:1,
    paddingTop:100,
    paddingLeft:40,
    paddingRight:40
  },
  signInButton: {
  }
});

module.exports = AccountView;

