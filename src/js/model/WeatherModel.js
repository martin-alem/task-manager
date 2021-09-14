
class WeatherModel{

    static url = "https://api.openweathermap.org/data/2.5/weather?units=metric";
    static key = "aac304093f797550435d2ed3dad3f25b";

    /**
     * Fetches weather data from OpenWeatherMap using city name
     * @returns {Promise} returns a promise that is resolved when the weather data
     */
    fetchWeatherByCity(city){
        const url = `${WeatherModel.url}&q=${city}&appid=${WeatherModel.key}`;
        return $.ajax({url: url});
    }

    /**
     * Fetches weather data from OpenWeatherMap using coordinates
     * @param {string} latitude 
     * @param {string} longitude 
     * @returns {Promise} returns a promise that is resolved when the weather data
     */
    fetchWeatherByCoordinate(latitude, longitude){
        const url = `${WeatherModel.url}&lat=${latitude}&lon=${longitude}&appid=${WeatherModel.key}`;
        return $.ajax({url: url});
    }
    
}

export default WeatherModel; 