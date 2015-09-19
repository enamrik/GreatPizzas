'use strict';

var AccountView = require('./app/ios/account/account_view');
var SpecialsView = require('./app/ios/specials/specials_view');
var React = require('react-native');
var { AppRegistry, TabBarIOS, View, Text } = React;

var GreatPizzas = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'specials'
    }
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item title="Specials"
                        icon="specials_tabbar_icon"
                        selected={this.state.selectedTab === 'specials'}
                        onPress={() => {this.setState({selectedTab:'specials'});}}>
          <SpecialsView></SpecialsView>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Order"
                        icon="order_tabbar_icon"
                        selected={this.state.selectedTab === 'order'}
                        onPress={() => {this.setState({selectedTab:'order'});}}>
          <View><Text>Order</Text></View>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Account"
                        icon="account_tabbar_icon"
                        selected={this.state.selectedTab === 'account'}
                        onPress={() => {this.setState({selectedTab:'account'});}}>
          <AccountView></AccountView>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

AppRegistry.registerComponent('GreatPizzas', () => GreatPizzas);
