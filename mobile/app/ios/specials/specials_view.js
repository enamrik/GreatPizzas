'use strict';

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

  render: function() {
    var content = this.state.dataSource.getRowCount() > 0
      ?
    <ListView
      dataSource={this.state.dataSource}
      renderRow={(special, sectionId, rowId) => {
        return (
            <SpecialView
              onPress={() => this.props.tabBarNavigator.goToAccount()}
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
    fetch('http://localhost:4567/specials')
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