var React = require('react-native');
const theme = require('../theme');
var { Text, TouchableHighlight, StyleSheet, View } = React;

var NoBorderButton = React.createClass({
  propTypes: {
    verticalPadding: React.PropTypes.number,
    fontSize: React.PropTypes.number,
    style: View.propTypes.style,
    label: React.PropTypes.string,
    onPress: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      verticalPadding: 10,
      fontSize: 15
    };
  },

  render: function() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.style, {
            paddingTop: this.props.verticalPadding,
            paddingBottom: this.props.verticalPadding
        }]}
        underlayColor={theme.mainColor}
        onPress={this.props.onPress}>
        <Text
          style={[ styles.buttonText, {fontSize: this.props.fontSize} ]}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:theme.mainColor,
    borderRadius:6
  },
  buttonText: {
    color:'white',
    fontWeight:'bold'
  }
});

module.exports = NoBorderButton;