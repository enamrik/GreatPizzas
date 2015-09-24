'use strict';

const api = require('../../config/api');
const user = require('../account/session');
const SpecialView = require('./special_view');
const React = require('react-native');
const { View, Text, StyleSheet, ListView, Component } = React;

const propTypes = {
  goToOrder: React.PropTypes.func.isRequired,
  goToAccount: React.PropTypes.func.isRequired
};

class SpecialsView extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows([])};
  }

  componentDidMount() {
    this.loadSpecials();
  }

  render() {
    const content = this.state.dataSource.getRowCount() > 0
      ?
    <ListView
      dataSource={this.state.dataSource}
      renderRow={(special) => {
        return (
            <SpecialView
              onOrderNow={() => this.orderSpecial(special)}
              onRemindMe={() => this.addToCalendar(special)}
              special={special}>
            </SpecialView>
        );
      }}
    />
      :
      <Text>No specials</Text>;

    return (<View style={styles.container}>{content}</View>);
  }

  addToCalendar(special) {
    var CalendarManager = require('react-native').NativeModules.CalendarManager;
    CalendarManager.addEvent(
      special.title,
      '4 Privet Drive, Surrey',
      new Date(special.availableOn),
      function(error){
        console.log(error);
      });
  }

  orderSpecial(special) {
    if(user.isAuthenticated())  {
      this.props.goToOrder(special);
    }
    else {
      this.props.goToAccount();
    }
  }

  loadSpecials() {
    fetch(api.domain + '/specials')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData)
        })
      })
      .done();
  }
}
SpecialsView.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingBottom:40
  },
  specials: {
    flex:1
  }
});

module.exports = SpecialsView;