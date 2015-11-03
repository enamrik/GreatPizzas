'use strict';

import AccountView from 'great_pizzas/account/account_view'
import SpecialsView from 'great_pizzas/specials/specials_view'
import React from 'react-native'
import configureStore from 'config/configure_store'
import theme from 'theme'
import Navigator from 'form_controls/navigation/navigator'
import { Provider } from 'react-redux/native'

const { AppRegistry, TabBarIOS, View, Text, Component, StatusBarIOS, StyleSheet } = React;

const store = configureStore();
StatusBarIOS.setStyle('light-content');

class GreatPizzas extends Component {

  constructor(props) {
    super(props);
    this.state = {selectedTab: tabs.specials};
  }

  render() {
    const content = (
      <View style={styles.container}>
      <TabBarIOS
        tintColor="white"
        barTintColor={theme.mainColor}>
        <TabBarIOS.Item title="Specials"
                        icon={require("image!specials_tabbar_icon")}
                        selected={this.state.selectedTab === tabs.specials}
                        onPress={() => this.goToTab(tabs.specials)}>

          <Navigator
            style={{marginBottom:50}}
            initialRoute={{
              component: SpecialsView,
              title:'Specials',
              passProps: {
                goToAccount:() => this.goToTab(tabs.account),
                goToOrder:() => this.goToTab(tabs.order)
              }
            }} />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Order"
                        icon={require("image!order_tabbar_icon")}
                        selected={this.state.selectedTab === tabs.order}
                        onPress={() => this.goToTab(tabs.order)}>
          <View style={{flex:1, paddingTop:60, backgroundColor:theme.mainColor}}>
              <Text style={{color:'white'}}>Order</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Account"
                        icon={require("image!account_tabbar_icon")}
                        selected={this.state.selectedTab === tabs.account}
                        onPress={() => this.goToTab(tabs.account)}>
          <AccountView></AccountView>
        </TabBarIOS.Item>
      </TabBarIOS>
      </View>
    );

    return <Provider store={ store }>{() => content }</Provider>;
  }

  goToTab(tabName) {
    this.setState({selectedTab:tabName});
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:theme.mainColor,
  }
});

const tabs = {
  order: 'order',
  account: 'account',
  specials: 'specials'
};

AppRegistry.registerComponent('GreatPizzas', () => GreatPizzas);
