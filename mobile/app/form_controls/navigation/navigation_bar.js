import React from 'react-native';
import theme from '../../theme';
import BackNavBarItem from './back_navbar_item'
const { Navigator, TouchableOpacity, Text, StyleSheet } = React;

export default getNavBarRouter = () => {
  const routerMapper =  {
    LeftButton: (route, navigator, index, navState) => {
      if (index === 0) {
        return null;
      }
      return <BackNavBarItem navigator={navigator} style={styles.left_button} />
    },

    RightButton: function (route, navigator, index, navState) {
      return null;
    },

    Title: function (route, navigator, index, navState) {
      return <Text numberOfLines={1} style={styles.title}>{route.title}</Text>;
    }
  };

  return (
    <Navigator.NavigationBar
      routeMapper={routerMapper}
      style={styles.navBar} />
  );
};

const nav_item_width = 70;

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: theme.mainColor
  },
  title: {
    marginTop:10,
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
    marginLeft:nav_item_width,
    marginRight:nav_item_width
  },
  right_button: {
    flex:1,
    width:nav_item_width
  },
  left_button: {
    flex:1,
    width:nav_item_width
  }
});


