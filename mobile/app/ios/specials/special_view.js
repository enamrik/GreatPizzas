var React = require('react-native');
var {StyleSheet,View,Image,Text,TouchableHighlight,Component} = React;

class SpecialView extends Component {

  render() {
    const notice = this.isAvailableNow(this.props.special)
      ?
      <TouchableHighlight onPress={() => this.props.onOrderNow(this.props.special)}>
        <View style={styles.orderButton}><Text style={styles.orderButtonText}>Order Now</Text></View>
      </TouchableHighlight>
      :
      <TouchableHighlight
        onPress={() => this.props.onRemindMe(this.props.special)}
        >
        <View style={styles.availability}>
          <Text style={styles.availabilityText}>Remind Me</Text>
        </View>
      </TouchableHighlight>;

    return (
        <View style={styles.row}>
          <Image
            style={styles.backgroundImage}
            source={{uri: this.props.special.image}}>
            <View style={styles.topFillerArea}>
              < Text style={styles.availableOn}>{
                this.isAvailableNow(this.props.special)
                  ? ""
                  : "Available on: " + this.formatDate(this.props.special.availableOn)
              }</Text>
            </View>
            <View style={styles.bottomBar}>
              <Text style={styles.description}>
                {this.props.special.description}
              </Text>
              { notice }
            </View>
          </Image>
        </View>
    );
  }

  formatDate(date) {
    const month = date[1];
    const day = date[2];
    return month + "/" + day;
  }

  isAvailableNow(special) {
    var today = new Date().setHours(0,0,0,0);
    var availableOn = new Date(special.availableOn).setHours(0,0,0,0);
   return today == availableOn;
  }
}

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
    backgroundColor:"transparent",
    justifyContent:'center'
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
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    paddingRight:10
  },
  orderButtonText: {
    color:'green',
    fontWeight:'bold',
    backgroundColor:'yellow',
    fontSize:15,
    padding:10,
    borderRadius:6
  },
  availability: {
    padding:10,
    marginRight:10,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:6,
    backgroundColor:'black'
  },
  availabilityText: {
    color:'#c3c3c3',
    fontWeight:'bold',
    fontSize:15
  },
  availableOn: {
    position:'absolute',
    left:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0.5)',
    color:'#FFFFFF',
    padding:5

  }
});

module.exports = SpecialView;