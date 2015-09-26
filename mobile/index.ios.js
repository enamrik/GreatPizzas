'use strict';

const AccountView = require('./app/domain/account/account_view');
const SpecialsView = require('./app/domain/specials/specials_view');
const React = require('react-native');
const { AppRegistry, TabBarIOS, View, Text, Component, StatusBarIOS } = React;
const { Provider } = require('react-redux/native');
const configureStore = require('./app/config/configureStore');
const theme = require('./app/theme');

StatusBarIOS.setStyle('light-content');

class GreatPizzas extends Component {

  constructor(props) {
    super(props);
    this.state = {selectedTab: tabs.specials};
  }

  render() {
    const content = (
      <TabBarIOS
        tintColor="white"
        barTintColor={theme.mainColor}
      >
        <TabBarIOS.Item title="Specials"
                        icon="specials_tabbar_icon"
                        selected={this.state.selectedTab === tabs.specials}
                        onPress={() => this.goToTab(tabs.specials)}>
          <SpecialsView
            goToAccount={() => this.goToTab(tabs.account)}
            goToOrder={() => this.goToTab(tabs.order)}>
          </SpecialsView>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Order"
                        icon="order_tabbar_icon"
                        selected={this.state.selectedTab === tabs.order}
                        onPress={() => this.goToTab(tabs.order)}>
          <View style={{flex:1, paddingTop:60, backgroundColor:theme.mainColor}}>
              <Text style={{color:'white'}}>Order</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Account"
                        icon="account_tabbar_icon"
                        selected={this.state.selectedTab === tabs.account}
                        onPress={() => this.goToTab(tabs.account)}>
          <AccountView></AccountView>
        </TabBarIOS.Item>
      </TabBarIOS>
    );

    return <Provider store={ store }>{() => content }</Provider>;
  }

  goToTab(tabName) {
    this.setState({selectedTab:tabName});
  }
}

const store = configureStore();

const tabs = {
  order: 'order',
  account: 'account',
  specials: 'specials'
};

AppRegistry.registerComponent('GreatPizzas', () => GreatPizzas);
