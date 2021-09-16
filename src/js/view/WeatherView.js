class WeatherView {
	constructor() {
		this.heading = document.querySelector(".weather_modal .modal_content .modal_heading");
		this.tempValue = document.querySelector("section.weather_and_task .weather_widget h2 span.temp_value");
		this.weatherImage = document.querySelector("section.weather_and_task .weather_widget img");
		this.weatherDescription = document.querySelector("section.weather_and_task .weather_widget p.weather_desc");
		this.highTemp = document.querySelector(".weather_modal .modal_content .weather_details .high_temp .value");
		this.lowTemp = document.querySelector(".weather_modal .modal_content .weather_details .low_temp .value");
		this.humidity = document.querySelector(".weather_modal .modal_content .weather_details .humidity .value");
		this.wind = document.querySelector(".weather_modal .modal_content .weather_details .wind .value");
		this.visibility = document.querySelector(".weather_modal .modal_content .weather_details .visibility .value");
		this.weatherForm = document.querySelector(".weather_modal .modal_content .weather_form");
	}

	/**
	 * Displays weather data in weather widget
	 * @param {object} data filtered weather data
	 */
	displayWeatherData(data) {
		const weatherImages = {
			200: "https://i.ibb.co/HghByg3/thunderstorm.png",
			300: "https://i.ibb.co/grd5hx7/drizzle.png",
			500: "https://i.ibb.co/K0qd2WF/rain.png",
			600: "https://i.ibb.co/pPTDp9z/snow.png",
			701: "https://i.ibb.co/t4St56q/mist.png",
			800: "https://i.ibb.co/h9HgYQk/default-weather-icon.png",
			801: "https://i.ibb.co/0h6VRq1/315683-clouds-icon.png",
		};

		this.weatherImage.setAttribute("src", weatherImages[this._mapRangeToSingleValue(data["id"])]);
		this.heading.textContent = `${data["city"]}, ${data["country"]}`;
		this.tempValue.textContent = data["temp"];
		this.weatherDescription.textContent = data["description"];
		this.highTemp.textContent = data["high_temp"];
		this.lowTemp.textContent = data["low_temp"];
		this.humidity.textContent = data["humidity"];
		this.wind.textContent = data["wind"];
		this.visibility.textContent = data["visibility"];
	}

	/**
	 * Maps a range to a single value
	 * @param {number} value
	 * @returns {number} returns a number
	 */
	_mapRangeToSingleValue(value) {
		if (value >= 200 && value <= 232) return 200;
		if (value >= 300 && value <= 321) return 300;
		if (value >= 500 && value <= 531) return 500;
		if (value >= 600 && value <= 622) return 600;
		if (value >= 700 && value <= 781) return 701;
		if (value >= 801 && value <= 804) return 801;
		if (value === 800) return 800;
	}

	/**
	 * Registers an event handler function on the form
	 * @param {Function} handler handler function to handler form submission
	 */
	registerEvents(handler) {
		this.weatherForm.addEventListener("submit", handler);
	}
}

export default WeatherView;
