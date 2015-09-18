var React = require('react-native');
var TableView = require('react-native-tableview');

var {
  StyleSheet,
  View,
  Image,
  Text
  } = React;


var SpecialView = React.createClass({

  render: function() {
    return (
        <View style={styles.row}>
          <Image></Image>
          <Text style={styles.text}>
            {this.props.description}
          </Text>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFF'
  },
  text: {
    flex: 1,
    paddingLeft: 5,
    marginRight:20
  }
});

module.exports = SpecialView;