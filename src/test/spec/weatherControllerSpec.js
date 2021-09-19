import weatherController from "../../js/controller/WeatherController.js";

describe("WeatherController", function () {
	beforeEach(function () {
		spyOn(weatherController, "_fetchWeatherByCity");
		spyOn(weatherController, "_fetchWeatherByCoordinate");
	});

	afterEach(function () {
		window.localStorage.removeItem("location");
	});

	it("should call fetchWeatherByCity if location is available", function () {
		window.localStorage.setItem("location", JSON.stringify("columbus"));
		weatherController._loadWeatherData();
		expect(weatherController._fetchWeatherByCity).toHaveBeenCalled();
	});

	xit("should call fetchWeatherByCoordinates if location is not available", function () {
		weatherController._loadWeatherData();
		expect(weatherController._fetchWeatherByCoordinate).toHaveBeenCalled();
	});

	xit("should fetch weather data by city name", function () {
		const cityName = "columbus";
		expectAsync(weatherController._fetchWeatherByCity(cityName)).toBeResolved();
	});
});
