import WeatherModel from "../../js/model/WeatherModel.js";

describe("WeatherModal", function(){

    let weatherModal;
    beforeAll(function(){
        weatherModal = new WeatherModel();
    });

    it("should return promise that resolves using city name", async function(){
        const cityName = "columbus";
        await expectAsync(weatherModal.fetchWeatherByCity(cityName)).toBeResolved();
    });

    it("should return promise that resolves using coordinates", async function(){
        const latitude = "39.9612";
        const longitude = "-82.9988";
        await expectAsync(weatherModal.fetchWeatherByCoordinate(latitude, longitude)).toBeResolved();
    });
});