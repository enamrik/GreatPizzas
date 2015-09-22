'use strict';

var api = require('../../config/api');
var user = require('../account/session');
var SpecialView = require('./special_view');
var React = require('react-native');
var { View, Text, StyleSheet, ListView } = React;


var SpecialsView = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([])
    }
  },

  componentDidMount: function() {
    this.loadSpecials();
  },

  orderSpecial: function(special) {
    if(user.isAuthenticated())  {
      this.props.tabBarNavigator.goToOrder(special);
    }
    else {
      this.props.tabBarNavigator.goToAccount();
    }
  },

  render: function() {
    var content = this.state.dataSource.getRowCount() > 0
      ?
    <ListView
      dataSource={this.state.dataSource}
      renderRow={(special) => {
        return (
            <SpecialView
              onPress={() => this.orderSpecial(special)}
              title={special.title}
              description={special.description}
              image={special.image}>
            </SpecialView>
        );
      }}
    />
      :
      <Text>No specials</Text>;

    return (<View style={styles.container}>{content}</View>);
  },

  loadSpecials: function() {
    fetch(api.domain + '/specials')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData)
        })
      })
      .done();
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    paddingBottom:40
  },
  specials: {
    flex:1
  }
});

module.exports = SpecialsView;