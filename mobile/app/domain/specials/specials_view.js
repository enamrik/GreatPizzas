'use strict';

import user from '../account/session'
import SpecialView from './special_view'
import React from 'react-native'
import SpecialsDetail from './specials_detail'
import theme from '../../theme'
const api_domain = require("../../settings")["api-domain"];
const { LocalNotifications, showAlert } = require('../../device_features/features');
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
      automaticallyAdjustContentInsets={false}
      dataSource={this.state.dataSource}
      renderRow={(special) => {
        return (
            <SpecialView
              onOrderNow={this.orderSpecial.bind(this)}
              onRemindMe={this.addFutureNotification.bind(this)}
              onRowPress={this.goToDetails.bind(this)}
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

  goToDetails(special) {
    this.props.navigator.push({
      component: SpecialsDetail,
      title: special.title
    })
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
    fetch(api_domain + '/specials')
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