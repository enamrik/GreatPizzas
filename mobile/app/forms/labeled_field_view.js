import React from 'react-native'
import theme from 'theme'

const { View, Text, TextInput, StyleSheet } = React;

var LabeledFieldView = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    secure: React.PropTypes.bool,
    onChangeText: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      secure: false
    };
  },

  getInitialState: function() {
    return {
      fieldValue: ""
    };
  },

  render: function() {
    return (
      <View style={[styles.field, this.props.style]}>
        <TextInput
          secureTextEntry={this.props.secure}
          style={styles.fieldInput}
          placeholder={this.props.fieldName}
          keyboardType="ascii-capable"
          returnKeyType="done"
          autoFocus={true}
          autoCorrect={false}
          placeholderTextColor={theme.mainColor}
          onChangeText={ (text) => {
            this.setState({fieldValue: text});
            if(this.props.onChangeText) {
              this.props.onChangeText(text);
            }
          }}
        >
        </TextInput>
          {!this.state.fieldValue
            ? null
            : (<Text style={styles.fieldLabel}>{this.props.fieldName}</Text>)}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  field: {
    position:'relative',
    borderBottomWidth:0.3,
    borderBottomColor:theme.mainColor,
    justifyContent:'flex-end',
    height:40
  },
  fieldLabel: {
    backgroundColor:'transparent',
    fontSize:9,
    color:theme.mainColor,
    position:'absolute',
    top:-3,
    left:0,
    height:20
  },
  fieldInput: {
    backgroundColor:'transparent',
    fontSize: 14,
    height: 40,
    color:'green'
  }
});

module.exports = LabeledFieldView;