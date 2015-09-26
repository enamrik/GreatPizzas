const React = require('react-native');
const { AppRegistry, StyleSheet, Text, View, ToolbarAndroid, Component, Navigator, TouchableHighlight } = React;
const SpecialsView = require('./app/ios/specials/specials_view');
const theme = require('./app/theme');

const api = require('./app/config/api');
api.domain = "http://10.0.2.2:4567";

let _navigator = null;

class GreatPizzas extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[
          {title: 'Specials', icon: require('image!ic_specials_tabbar'), show: 'always'},
          {title: 'Order', icon: require('image!ic_order_tabbar'), show: 'always'},
          {title: 'Account', icon: require('image!ic_account_tabbar'), show: 'always'}]}
          style={styles.toolbar}
          titleColor="white"
          title="Great Pizzas"
          onActionSelected={(position) => this.onActionSelected(position)}/>

        <Navigator
          style={{flex:1, backgroundColor:'white'}}
          initialRoute={{name: 'order'}}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={this.renderMenuItem.bind(this)}
          />
      </View>
    );
  }

  onActionSelected(position) {
    var positionMap = {
      0: 'specials',
      1: 'order',
      2: 'account'
    };
    this.goToTab(positionMap[position]);
  }

  renderMenuItem(route, navigator) {
    _navigator = navigator;

    if(route.name == 'specials') {
      return (
        <View>
          <SpecialsView
            goToAccount={() => this.goToTab('account')}
            goToOrder={() => this.goToTab('order')}>
          </SpecialsView>
        </View>
      );
    }
    else if(route.name == 'order') {
      return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <Text>Order</Text>
        </View>
      );
    }
    else if(route.name == 'account') {
      return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <Text>Account</Text>
        </View>
      );
    }
 }

  goToTab(tabName) {
    _navigator.push({ name: tabName});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  toolbar: {
    backgroundColor: theme.mainColor,
    height: 56
  },

});

AppRegistry.registerComponent('GreatPizzas', () => GreatPizzas);
