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
          <Image style={styles.backgroundImage} source={{uri: this.props.image}}>
            <View style={styles.topFillerArea}></View>
            <View style={styles.bottomBar}>
              <Text style={styles.description}>
                {this.props.description}
              </Text>
              <View style={styles.orderButton}><Text style={styles.orderButtonText}>Order</Text></View>
            </View>
          </Image>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  backgroundImage: {
    flex:1,
    height:200,
    flexDirection:'column'
  },
  topFillerArea: {
    flex:0.6,
    backgroundColor:"transparent"
  },
  bottomBar: {
    flex:0.4,
    backgroundColor:"rgba(0,0,0,0.5)",
    flexDirection:'row',
    alignItems:'center'
  },
  description: {
    flex:0.8,
    fontWeight:"bold",
    color:"white",
    marginLeft:10,
    marginRight:10
  },
  orderButton: {
    flex:0.2,
    alignSelf:'stretch',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'purple',
    opacity:0.6
  },
  orderButtonText: {
    backgroundColor:'purple',
    color:'green',
    fontWeight:'bold',
    fontSize:20
  }
});

module.exports = SpecialView;