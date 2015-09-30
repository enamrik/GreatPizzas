module.exports = function(title, location, date) {
  var CalendarManager = require('react-native').NativeModules.CalendarManager;
  CalendarManager.addEvent(
    title,
    location,
    date,
    function(error){
      console.log(error);
    });
};