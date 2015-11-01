'use strict';

const AccountView = require('./domain/account/account_view');
const SpecialsView = require('./domain/specials/specials_view');
const React = require('react-native');
const { AppRegistry, TabBarIOS, View, Text, Component, StatusBarIOS, StyleSheet } = React;
const { Provider } = require('react-redux/native');
const configureStore = require('./config/configure_store');
const theme = require('./theme');
const Navigator = require('./form_controls/navigation/navigator');

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
