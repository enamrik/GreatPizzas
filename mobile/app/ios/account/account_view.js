var React = require('react-native');
var { View, StyleSheet } = React;
var LabeledFieldView = require('../forms/labeled_field_view');
var NoBorderButton = require('../forms/no_border_button');

var AccountView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.signInForm}>
          <LabeledFieldView style={styles.field} fieldName="Username"></LabeledFieldView>
          <LabeledFieldView style={styles.field} fieldName="Password" secure={true} ></LabeledFieldView>
          <NoBorderButton
            style={styles.signInButton}
            label="Log In"
            onPress={this.signIn}
            verticalPadding={20}
            fontSize={20}
          ></NoBorderButton>
        </View>
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
  field: {
    marginBottom:2
  },
  signInButton: {
    marginTop:20
  }
});

module.exports = AccountView;

