var LocalNotificationsManager = require('react-native').NativeModules.LocalNotificationsManager;

module.exports = {
  create: function(options) {
    LocalNotificationsManager.createNotification(options);
  },

  find: function(title, body, fireOn, callback) {
    LocalNotificationsManager.find(title, body, fireOn, callback);
  }
};
