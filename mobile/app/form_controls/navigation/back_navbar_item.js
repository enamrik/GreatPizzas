import theme from 'theme'
import React from 'react-native'
const { View, Component, StyleSheet, TouchableOpacity, Text, Image } = React;

export default class extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[this.props.style, styles.container]}
        onPress={() => this.props.navigator.pop()}>
        <Image testId="image" style={styles.button}
               source={require('image!navbar_item_back')}/>
        <Text testId="title" numberOfLines={1} style={styles.title}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingLeft:8
  },
  button: {
    tintColor:'#fff'
  },
  title: {
    color:'#fff',
    fontSize:10,
    paddingLeft:5,
    width:theme.ios.nav_item_width - 20
  }
});
