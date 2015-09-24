var React = require('react-native');
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
        style={[styles.button, this.props.style]}
        underlayColor="transparent"
        onPress={this.props.onPress}
      >
        <Text style={[
          styles.buttonText,
          {
            paddingTop: this.props.verticalPadding,
            paddingBottom: this.props.verticalPadding,
            fontSize: this.props.fontSize
          }
        ]}
        >
        {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    justifyContent:'center'
  },
  buttonText: {
    flex:1,
    color:'white',
    textAlign:'center',
    backgroundColor:'darkslateblue',
    borderRadius:6,
    fontWeight:'bold'
  }
});

module.exports = NoBorderButton;