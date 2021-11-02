const { fetch } = require("./fetch");
const { appendJson, readJson } = require("./writer");
const { BASE_URL, SEARCH_PREFIX, SEARCHES } = require("./env");

const RESULTS = [];
const NEXT_PAGES = []; // readJson("tokens-2021-08-05T16-54-33-331Z.json")["results"];
const DONE_PAGES = new Set();

const jsonFileName = new Date()
  .toISOString()
  .replace(/\W+/g, "-")
  .concat(".json");

class GMapScrape {
  do() {
    SEARCHES.forEach((s) => {
      return this.getPlacesSearch(s);
    });

    setTimeout(() => {
      while (NEXT_PAGES.length) {
        const x = this.getPlacesNext(NEXT_PAGES[0]);
      }

      console.log(jsonFileName);
    }, 3000);
  }

  getPlacesSearch(search) {
    const query = SEARCH_PREFIX.concat(search);

    console.log(`🚀 > getPlacesSearch > query`, query);
    const place = fetch(
      BASE_URL.concat("&query=").concat(encodeURIComponent(query))
    );
    this.addResults(place);
  }

  getPlacesNext(pagetoken) {
    console.log(`🚀 > getPlacesNext`, NEXT_PAGES.length);

    if (DONE_PAGES.has(pagetoken)) {
      NEXT_PAGES.shift();

      return;
    }

    DONE_PAGES.add(pagetoken);

    const place = fetch(BASE_URL.concat("&pagetoken=").concat(pagetoken));
    this.addResults(place, true);
  }

  addResults(place, removeFirst = false) {
    if (place) {
      if ("next_page_token" in place && place.next_page_token) {
        NEXT_PAGES.push(place.next_page_token);
        appendJson("tokens-" + jsonFileName, place.next_page_token);
      }
      if ("results" in place && place.results.length) {
        RESULTS.push([...place.results]);
        appendJson(jsonFileName, place.results);

        if (removeFirst) {
          NEXT_PAGES.shift();
        }
      }
    }
  }
}

module.exports = { GMapScrape };
