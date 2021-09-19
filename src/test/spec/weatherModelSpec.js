import WeatherModel from "../../js/model/WeatherModel.js";

describe("WeatherModel", function () {
	let weatherModel;
	let weatherData;
	beforeAll(function () {
		weatherModel = new WeatherModel();
		weatherData = {
			"weather": [{ "id": 1, "description": "Weather description" }],
			"main": {
				"temp": 34.23,
				"temp_max": 36.34,
				"temp_min": 12.34,
				"humidity": 34,
            },
            "visibility": 1000,
            "name": "columbus",
            "wind": { "speed": 23 },
            "sys": {"country": "US"}
		};
	});

	it("should return promise that resolves using city name", async function () {
		const cityName = "columbus";
		await expectAsync(weatherModel.fetchWeatherByCity(cityName)).toBeResolved();
	});

	it("should return promise that resolves using coordinates", async function () {
		const latitude = "39.9612";
		const longitude = "-82.9988";
		await expectAsync(weatherModel.fetchWeatherByCoordinate(latitude, longitude)).toBeResolved();
	});

	it("should return an object with weather data", function () {
		const result = {
			"id": 1,
			"temp": 34,
			"description": "Weather description",
			"high_temp": 36,
			"low_temp": 12,
			"humidity": 34,
            "wind": 23,
            "visibility": 1000,
			"country": "US",
			"city": "columbus",
        };
        
        expect(weatherModel.extractWeatherData(weatherData)).toEqual(result);
	});
});
