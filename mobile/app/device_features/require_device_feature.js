var device = require('../config/device_info');
var path = require('path');

module.exports = {
    LocalNotifications: require('./ios/local_notifications'),
    showAlert: require('./ios/show_alert')
};