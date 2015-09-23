const React = require('react-native');
const { Component, View, StyleSheet, Text } = React;
const LabeledFieldView = require('../forms/labeled_field_view');
const NoBorderButton = require('../forms/no_border_button');

class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topFiller}></View>
        <View style={styles.signInForm}>

          <Text>{ this.props.isSigningIn ? "Signing In..." : "" }</Text>
          <Text>{ this.props.errorMessage }</Text>
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
            onPress={() => this.props.onLoginTap(this.state.username, this.state.password)}
            verticalPadding={20}
            fontSize={20}
          ></NoBorderButton>
        </View>
      </View>
    );
  }
}

LoginView.propTypes = {
  onLoginTap: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex:1,
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

module.exports = LoginView;