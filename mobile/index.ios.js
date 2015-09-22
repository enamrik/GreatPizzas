'use strict';

var AccountView = require('./app/ios/account/account_view');
var SpecialsView = require('./app/ios/specials/specials_view');
var React = require('react-native');
var { AppRegistry, TabBarIOS, View, Text } = React;

var tabs = {
  order: 'order',
  account: 'account',
  specials: 'specials'
};

class PizzaTabBarNavigator {
  constructor(tabBar) {
    this.tabBar = tabBar;
  }

  goToSpecials() {
    this.tabBar.setState({selectedTab:tabs.specials})
  }

  goToOrder() {
    this.tabBar.setState({selectedTab:tabs.order})
  }

  goToAccount() {
    this.tabBar.setState({selectedTab:tabs.account})
  }
}

var GreatPizzas = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: tabs.specials
    }
  },

  componentWillMount: function() {
    this.tabBarNavigator = new PizzaTabBarNavigator(this)
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="darkslateblue"
      >
        <TabBarIOS.Item title="Specials"
                        icon="specials_tabbar_icon"
                        selected={this.state.selectedTab === tabs.specials}
                        onPress={() => {this.tabBarNavigator.goToSpecials();}}>
          <SpecialsView tabBarNavigator={this.tabBarNavigator}></SpecialsView>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Order"
                        icon="order_tabbar_icon"
                        selected={this.state.selectedTab === tabs.order}
                        onPress={() => {this.tabBarNavigator.goToOrder();}}>
          <View style={{paddingTop:60}}>
              <Text>Order</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Account"
                        icon="account_tabbar_icon"
                        selected={this.state.selectedTab === tabs.account}
                        onPress={() => {this.tabBarNavigator.goToAccount();}}>
          <AccountView></AccountView>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

AppRegistry.registerComponent('GreatPizzas', () => GreatPizzas);
