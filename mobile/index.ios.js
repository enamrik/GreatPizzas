'use strict';

var React = require('react-native');
var {
    AppRegistry,
    TabBarIOS,
    View,
    Text
    } = React;

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
                    <View><Text>Specials</Text></View>
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
                    <View><Text>Account</Text></View>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
});

AppRegistry.registerComponent('GreatPizzas', () => GreatPizzas);
