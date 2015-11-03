import React from 'react-native'
import LabeledFieldView from 'form_controls/labeled_field_view'
import NoBorderButton from 'form_controls/no_border_button'

const { Component, View, StyleSheet, Text } = React;

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

          <View style={styles.notify}>
            <Text>{ this.props.isSigningIn ? "Signing In..." : "" }</Text>
            <Text>{ this.props.errorMessage }</Text>
          </View>
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
            verticalPadding={15}
            fontSize={15}
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
    justifyContent:'center',
    backgroundColor:'white'
  },
  topFiller: {
    flex:0.001
  },
  signInForm: {
    flex:1,
    paddingLeft:40,
    paddingRight:40
  },
  field: {
    marginBottom:10
  },
  signInButton: {
    marginTop:50
  },
  notify: {
    marginBottom:10
  }
});

module.exports = LoginView;