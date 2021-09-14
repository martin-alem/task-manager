
class WeatherView{

    constructor(){

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
     * Registers an event handler function on the form
     * @param {Function} handler handler function to handler form submission
     */
    registerEvents(handler) {
        this.weatherForm.addEventListener("submit", handler);
    }
}

export default WeatherView;