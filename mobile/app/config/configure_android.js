module.exports = function() {
  const api = require('./app/config/api');
  api.domain = "http://10.0.2.2:4567";

  var device_info = require('./device_info');
  device_info.os = 'android';
};
