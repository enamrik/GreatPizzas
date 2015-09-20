var React = require('react-native');
var { View, StyleSheet } = React;
var LabeledFieldView = require('../forms/labeled_field_view');
var NoBorderButton = require('../forms/no_border_button');
var auth = require('./auth');

var AccountView = React.createClass({

  getInitialState: function() {
    return {
      username: "",
      password: ""
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.topFiller}></View>
        <View style={styles.signInForm}>
          <LabeledFieldView
            style={styles.field}
            fieldName="Username"
            onChangeText={(text) => this.setState({username: text})}/>
          <LabeledFieldView
            style={styles.field}
            fieldName="Password"
            onChangeText={(text) => this.setState({password: text})}
            secure={true} />
          <NoBorderButton
            style={styles.signInButton}
            label="Log In"
            onPress={this.logIn}
            verticalPadding={20}
            fontSize={20}
          ></NoBorderButton>
        </View>
      </View>
    );
  },

  logIn: function() {
    auth.login(this.state.username, this.state.password)
      .then(function(data){
        console.log(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
});

var styles = StyleSheet.create({
  container: {
    paddingTop:20,
    flex: 1,
    flexDirection:'column',
    justifyContent:'center'
  },
  topFiller: {
    flex:0.1
  },
  signInForm: {
    flex:0.9,
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

