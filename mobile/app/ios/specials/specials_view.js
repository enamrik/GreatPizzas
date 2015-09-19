'use strict';

var SpecialView = require('./special_view');
var TableView = require('react-native-tableview');
var { Section } = TableView;

var React = require('react-native');
var { View, Text, StyleSheet } = React;


var SpecialsView = React.createClass({
  getInitialState: function() {
    return {
      specials: []
    }
  },

  componentDidMount: function() {
    this.loadSpecials();
  },

  render: function() {

    var content = this.state.specials.length > 0
      ?
      <TableView
        style={styles.specials}
        tableViewStyle={TableView.Consts.Style.Plain}>

        <Section label="Specials">
            {this.state.specials.map((special) => {
              return (
                <TableView.Cell>
                  <SpecialView
                    title={special.title}
                    description={special.description}
                    image={special.image}>
                  </SpecialView>
                </TableView.Cell>
              )})
              }
        </Section>
      </TableView>
      :
      <Text>No specials</Text>;

    return (<View style={styles.container}>{content}</View>);
  },

  loadSpecials: function() {
    fetch('http://localhost:4567/specials')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          specials: responseData
        })
      })
      .done();
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:20,
    paddingBottom:40
  },
  specials: {
    flex:1
  }
});

module.exports = SpecialsView;