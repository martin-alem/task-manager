import weatherController from "./controller/WeatherController.js";
import newsController from "./controller/NewsController.js";
import bibleController from "./controller/BibleController.js";
import currencyController from "./controller/CurrencyController.js";

window.onload = function() {

    weatherController.init();
    // newsController.init();
    // bibleController.init();
    // currencyController.init();
}
