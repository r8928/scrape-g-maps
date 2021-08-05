var request = require("sync-request");

function fetch(url) {
  var res = request("GET", url);
  return JSON.parse(res.getBody("utf8"));
}

module.exports = { fetch };
