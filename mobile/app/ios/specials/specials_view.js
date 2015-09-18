'use strict';

var SpecialView = require('./special_view');
var TableView = require('react-native-tableview');
var { Section } = TableView;

var React = require('react-native');
var { View, Text, StyleSheet } = React;


var SpecialsView = React.createClass({
  getInitialState: function() {
    return {
      specials: [
        {title:"title 1",
          description:"Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case",
          image:"http://localhost:4567/image1"
        },
        {title:"title 2",
          description:"Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case",
          image:"http://localhost:4567/image2"
        }
      ]
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TableView
          style={styles.specials}
          tableViewStyle={TableView.Consts.Style.Grouped}>

          <Section arrow={true} label="Specials">
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
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:20
  },
  specials: {
    flex:1
  }
});

module.exports = SpecialsView;