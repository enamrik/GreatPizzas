import React from 'react-native';
import getNavigationBar from 'form_controls/navigation/navigation_bar';
import theme from 'theme'
const { Component, View, StyleSheet, Navigator } = React;

export default class extends Component {
  render() {
    return (
      <Navigator
        style={[styles.navigator, this.props.style]}
        initialRoute={this.props.initialRoute}
        configureScene={(route) => { return React.Navigator.SceneConfigs.HorizontalSwipeJump; }}
        navigationBar={ getNavigationBar() }
        renderScene={(route, navigator) => {
            return (
              <View style={styles.container}>
                <route.component navigator={navigator} {...route.passProps} />
              </View>
            );
        }} />
    )
  }
}

var styles = StyleSheet.create({
  navigator: {
    paddingTop:theme.ios.nav_plus_status_bar_height
  },
  container: {
    flex:1
  }
});
