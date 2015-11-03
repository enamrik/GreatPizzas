import React from 'react-native';
import theme from 'theme';
import BackNavBarItem from 'navigation/back_navbar_item'
const { View, Navigator, TouchableOpacity, Text, StyleSheet } = React;

export default getNavBarRouter = () => {
  const routerMapper =  {
    LeftButton: (route, navigator, index, navState) => {
      if (index === 0) {
        return null;
      }
      var prevRoute = navigator.getCurrentRoutes()[index -1];
      return <BackNavBarItem navigator={navigator} title={prevRoute.title} style={styles.left_button} />
    },

    RightButton: function (route, navigator, index, navState) {
      return null;
    },

    Title: function (route, navigator, index, navState) {
      return (
        <View style={styles.title_container}>
          <Text numberOfLines={1} style={styles.title}>{route.title}</Text>
        </View>
      );
    }
  };

  return (
    <Navigator.NavigationBar
      routeMapper={routerMapper}
      style={styles.navBar} />
  );
};


const styles = StyleSheet.create({
  navBar: {
    backgroundColor: theme.mainColor
  },
  title_container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
    marginLeft:theme.ios.nav_item_width,
    marginRight:theme.ios.nav_item_width
  },
  right_button: {
    width:theme.ios.nav_item_width
  },
  left_button: {
    width:theme.ios.nav_item_width
  }
});


