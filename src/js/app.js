import weatherController from "./controller/WeatherController.js";
import newsController from "./controller/NewsController.js";
import bibleController from "./controller/BibleController.js";
import currencyController from "./controller/CurrencyController.js";
import taskController from "./controller/TaskController.js";
import TaskNotification from "./util/TaskNotification.js";

window.onload = function () {
	TaskNotification.requestPermissions();
	weatherController.init();
	// newsController.init();
	// bibleController.init();
	// currencyController.init();
	taskController.init();
};
