const { GMapScrape } = require("./GMapScrape");

(async () => {
  await new GMapScrape().do();
})();
