import React from 'react-native'
const { Component, StyleSheet, TouchableOpacity, Text, Image } = React;

export default class extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[this.props.style, styles.container]}
        onPress={() => this.props.navigator.pop()}>
        <Image style={styles.button}
               source={require('image!navbar_item_back')}/>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 10,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    paddingLeft:16
  },
  button: {
    tintColor:'#fff'
  }
});
