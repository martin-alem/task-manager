import WeatherModel from "../model/WeatherModel.js";
import WLocalStorage from "../model/LocalStorage.js";
import WeatherView from "../view/WeatherView.js";
import ErrorHandler from "../util/ErrorHandler.js";

class WeatherController{

    constructor(){
        this.wLocalStorage = new WLocalStorage();
        this.weatherModel = new WeatherModel();
        this.weatherView = new WeatherView();

        //binding _handleFormSubmit
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        
    }

    /**
     * Handles the loading and displaying of weather data
     * If location is not stored in local storage, user's location is requested.
     * Otherwise location is retrieved from location and used in fetching weather data
     */
    async _loadWeatherData(){

        if(this.wLocalStorage.getData("location")){
            const location = this.wLocalStorage.getData("location");
            try {
                const weatherData = await this._fetchWeatherByCity(location);
                const data = this.weatherModel.extractWeatherData(weatherData);
                this.weatherView.displayWeatherData(data);
            } catch (error) {

                ErrorHandler.message("warning", "City not found", 3000);
                console.error(error);
            }
        }
        else{
            
            try {
                const position = await this._getCoordinates();
                console.log(position)
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const weatherData = await this._fetchWeatherByCoordinate(latitude, longitude);
                const data = this.weatherModel.extractWeatherData(weatherData);
                this.weatherView.displayWeatherData(data);
                this.wLocalStorage.addData("location", data["city"]);

            } catch (error) {
                if(error instanceof GeolocationPositionError){
                    ErrorHandler.message("warning", "Could not get user's location", 3000);
                }
                ErrorHandler.message("warning", "City not found", 3000);
                console.error(error);
            }
        }
        
    }

    /**
     * Fetches weather data from OpenWeatherMap using city name
     * @param {string} cityName 
     * @returns {object} returns an object containing weather data
     */
    async _fetchWeatherByCity(cityName){
        const weatherData = await this.weatherModel.fetchWeatherByCity(cityName);
        return weatherData;
    }

    /**
     * Fetched weather data from OpenWeatherMap using coordinates
     * @param {string} latitude latitude
     * @param {string} longitude longitude
     * @returns {object} returns an object containing weather data
     */
    async _fetchWeatherByCoordinate(latitude, longitude){
        const weatherData = await this.weatherModel.fetchWeatherByCoordinate(latitude, longitude);
        return weatherData;
    }

    /**
     * Attempts to get the user's location.
     * @returns {object} returns an object containing user's geographical location
     */
    async _getCoordinates(){
        const position = await this._getUserLocation();
        return position;
    }



    /**
     * Gets the user's location
     * @returns {Promise} returns a promise that is resolved with user's location
     */
    _getUserLocation(){

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };

        // promisify the geolocation getCurrentPosition method
        return new Promise((resolve, reject) =>{
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }

    /**
     * Handles the submission of weather form
     * @param {Event} event event object
     */
   async _handleFormSubmit(event){
        event.preventDefault();
        const city = event.target.firstElementChild.value;
        if(city){
            try {
                const weatherData = await this._fetchWeatherByCity(city);
                const data = this.weatherModel.extractWeatherData(weatherData);
                this.weatherView.displayWeatherData(data);
                event.target.firstElementChild.value = "";
            } catch (error) {
                // If readyState is 4 request failed
                ErrorHandler.message("warning", "City not found", 3000);
                console.error(error)
            }
        }
    }

    /**
     * Initialize the weatherController
     */
    init(){

        this.weatherView.registerEvents(this._handleFormSubmit);
        this._loadWeatherData();

    }
}

const weatherController = new WeatherController();
export default weatherController;