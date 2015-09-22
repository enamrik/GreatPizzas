const React = require('react-native');
const { View, Text, Component, StyleSheet } = React;
const user = require('./session');

class AccountDetails extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.name}>
          <Text>{user.getUserInfo().lastName}</Text>
          <Text>, </Text>
          <Text>{user.getUserInfo().firstName}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft:20
  },
  name: {
    flexDirection:'row',
    alignItems:'center'
  }
});

module.exports = AccountDetails;