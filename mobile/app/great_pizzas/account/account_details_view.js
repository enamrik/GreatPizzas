import user from 'great_pizzas/account/session'
import React from 'react-native'
const { View, Text, Component, StyleSheet } = React;

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