module.exports = function() {
  return fetch.apply(this, arguments)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if (!response.error) {
        return response
      }
      throw new Error(response.statusCode + ":" + response.error);
    });
};