var React = require('react-native');
var { View, Text, TextInput, StyleSheet } = React;

var LabeledFieldView = React.createClass({

  getInitialState: function() {
    return {
      fieldValue: ""
    };
  },

  render: function() {
    return (
      <View style={styles.field}>
        <TextInput
          style={styles.fieldInput}
          placeholder={this.props.fieldName}
          onChangeText={(text) => this.setState({fieldValue: text})}
        >
        </TextInput>
          {!this.state.fieldValue
            ? null
            : (<Text style={styles.fieldLabel}>Username</Text>)}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  field: {
    position:'relative',
    borderBottomWidth:0.3,
    borderBottomColor:'#f7f7f7',
    height:35
  },
  fieldLabel: {
    backgroundColor:'transparent',
    fontSize:9,
    color:'#C7C7CC',
    position:'absolute',
    top:-4,
    left:0,
    height:20
  },
  fieldInput: {
    backgroundColor:'transparent',
    fontSize: 13,
    height: 35
  }
});

module.exports = LabeledFieldView;