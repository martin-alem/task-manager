import WeatherModel from "../model/WeatherModel.js";
import WLocalStorage from "../model/LocalStorage.js";
import WeatherView from "../view/WeatherView.js";

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
                const data = this._extractWeatherData(weatherData);
                this._displayWeatherData(data)
            } catch (error) {
                console.log(error);
            }
        }
        else{
            
            try {
                const position = await this._getCoordinates();
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const weatherData = await this._fetchWeatherByCoordinate(latitude, longitude);
                const data = this._extractWeatherData(weatherData);
                this._displayWeatherData(data);
                this.wLocalStorage.addData("location", data["city"]);

            } catch (error) {
                console.log(error);
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
        const weatherData = await this.weatherModel._fetchWeatherByCoordinate(latitude, longitude);
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
     * Extracts weather data from api response
     * @param {object} weatherData 
     * @returns {object} returns an object containing weather data
     */
    _extractWeatherData(weatherData){

        const data = {};

        data["id"] = weatherData["weather"][0]["id"];
        data["temp"] = Math.trunc(weatherData["main"]["temp"]);
        data["description"] = weatherData["weather"][0]["description"];
        data["high_temp"] = Math.trunc(weatherData["main"]["temp_max"]);
        data["low_temp"] = Math.trunc(weatherData["main"]["temp_min"]);
        data["humidity"] = weatherData["main"]["humidity"];
        data["visibility"] = weatherData["visibility"];
        data["wind"] = weatherData["wind"]["speed"];
        data["country"] = weatherData["sys"]["country"];
        data["city"] = weatherData["name"];
        return data;
    }

    /**
     * Displays weather data in weather widget
     * @param {object} data filtered weather data
     */
    _displayWeatherData(data){

        const weatherImages = {
            200: "https://i.ibb.co/HghByg3/thunderstorm.png",
            300: "https://i.ibb.co/grd5hx7/drizzle.png",
            500: "https://i.ibb.co/K0qd2WF/rain.png",
            600: "https://i.ibb.co/pPTDp9z/snow.png",
            701: "https://i.ibb.co/t4St56q/mist.png",
            800: "https://i.ibb.co/h9HgYQk/default-weather-icon.png",
            801: "https://i.ibb.co/0h6VRq1/315683-clouds-icon.png"
        }

        this.weatherView.weatherImage.setAttribute("src", weatherImages[this._mapRangeToSingleValue(data["id"])]);
        this.weatherView.heading.textContent = `${data["city"]}, ${data["country"]}`;
        this.weatherView.tempValue.textContent = data["temp"];
        this.weatherView.weatherDescription.textContent = data["description"];
        this.weatherView.highTemp.textContent = data["high_temp"];
        this.weatherView.lowTemp.textContent = data["low_temp"];
        this.weatherView.humidity.textContent = data["humidity"];
        this.weatherView.wind.textContent = data["wind"];
        this.weatherView.visibility.textContent = data["visibility"];
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
    _handleFormSubmit(event){
        event.preventDefault();
        const city = event.target.firstElementChild.value;
        if(city){
            this.weatherModel.fetchWeatherByCity(city)
                .then(weatherData => {
                    const data = this._extractWeatherData(weatherData);
                    this._displayWeatherData(data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    /**
     * Maps a range to a single value
     * @param {number} value 
     * @returns {number} returns a number
     */
    _mapRangeToSingleValue(value){

        if(value >= 200 && value <= 232) return 200;
        if(value >= 300 && value <= 321) return 300;
        if(value >= 500 && value <= 531) return 500;
        if(value >= 600 && value <= 622) return 600;
        if(value >= 700 && value <= 781) return 701;
        if(value >= 801 && value <= 804) return 801;
        if(value === 800)                return 800;
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