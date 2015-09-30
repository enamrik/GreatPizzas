'use strict';

const api = require('../../config/api');
const user = require('../account/session');
const SpecialView = require('./special_view');
const React = require('react-native');
const theme = require('../../theme');
const { LocalNotifications, showAlert } = require('../../device_features/require_device_feature');
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
              onRemindMe={() => this.addFutureNotification(special)}
              special={special}>
            </SpecialView>
        );
      }}
    />
      :
      <Text>No specials</Text>;

    return (<View style={styles.container}>{content}</View>);
  }

  addFutureNotification(special) {
    LocalNotifications.create({
      title: special.title,
      body:  'Location: 4 Privet Drive, Surrey',
      fireOn: new Date(special.availableOn)
    });

    const message = 'Reminder added for '
        + special.title + ' which will notify you on '
        + special.availableOn;
    showAlert('Remind Me', message);
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
    backgroundColor: theme.mainColor
  },
  specials: {
    flex:1
  }
});

module.exports = SpecialsView;