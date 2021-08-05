const jsonfile = require("jsonfile");

function readJson(fileName) {
  try {
    return jsonfile.readFileSync(fileName);
  } catch (error) {
    return { results: [] };
  }
}

function appendJson(fileName, value) {
  let json = readJson(fileName);

  json.results.push(value);
  jsonfile.writeFileSync(fileName, json);
}

module.exports = { readJson, appendJson };
