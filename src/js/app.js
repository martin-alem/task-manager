import weatherController from "./controller/WeatherController.js";
import newsController from "./controller/NewsController.js";
import bibleController from "./controller/BibleController.js";

window.onload = function() {

    weatherController.init();
    // newsController.init();
    bibleController.init();

    //calendar functionality
    (function(){

        const mainSectionDate = document.querySelector("section.main .tab_contents .tab_content h1.date");
        const weatherSectionDay = document.querySelector("section.weather_and_task .date .current_day");
        const weatherSectionDate = document.querySelector("section.weather_and_task .date .current_date");
        const calendar = document.querySelector("#calendar");

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const abbreviatedDayNames = {"Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6,}
        const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const todayDate = new Date();

        mainSectionDate.textContent = `${Months[todayDate.getMonth()]}, ${todayDate.getDate()}`;
        weatherSectionDay.textContent = `${daysOfWeek[todayDate.getDay()]}`;
        weatherSectionDate.textContent = `${todayDate.getDate()} ${Months[todayDate.getMonth()]}`;

        
        const previousMonthDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0); //Get the last day of the previous month
        const previousMonthDateInfo = previousMonthDate.toString().split(" "); // convert to string in other to obtain different pieces of information
        const lastDayOfPreviousMonth = abbreviatedDayNames[previousMonthDateInfo[0]];
        const numberOfDaysInCurrentMonth = new Date(todayDate.getYear(), todayDate.getMonth() + 1, 0).getDate();

        let count = 1;
        let value = 1;
        while(count <= numberOfDaysInCurrentMonth + lastDayOfPreviousMonth) {

            const span = document.createElement('span');
            const empty = document.createElement('i');
            if(value === todayDate.getDate()){
                span.classList.add("current");
            }

            if(count >= lastDayOfPreviousMonth + 1){
                span.textContent = `${value++}`;
                calendar.appendChild(span);
            }
            else{
                calendar.appendChild(empty);
            }
            count += 1;
        }

    })();

    //Add Task Modal functionality
    (function(){

        // obtain the reference to add task buttons and add task modal
        const addTaskButton = document.querySelectorAll("button.add_task");
        const cancelButton = document.querySelector(".task_modal .modal_content button.cancel");
        const taskModal = document.querySelector(".task_modal");
        const overlay = document.querySelector(".task_overlay");

        addTaskButton.forEach(button => {
            button.addEventListener("click", openAndCloseModal);
        });

        cancelButton.addEventListener("click", openAndCloseModal);


        //open modal window
        function openAndCloseModal() {
            overlay.classList.toggle("hide");
            taskModal.classList.toggle("hide");
        }

    })();

    //weather modal functionality
    (function(){

        //obtain the reference to weather widget, overlay and modal window
        const weatherWidget = document.querySelector("main .weather_and_task .weather_widget");
        const overlay = document.querySelector(".weather_overlay");
        const modalWindow = document.querySelector(".weather_modal");

        weatherWidget.addEventListener("click", openAndCloseWeatherModal);
        overlay.addEventListener("click", openAndCloseWeatherModal);
        
        //open modal window
        function openAndCloseWeatherModal(){

            overlay.classList.toggle("hide");
            modalWindow.classList.toggle("hide");
        }

    })();
    
    // Tab functionality
    (function(){

        //obtain the reference to tab buttons parent
        const tabButtons = document.querySelector("main section.main .tab_buttons");

        // obtain the reference to tab sections
        const tabSections = document.querySelectorAll("main section.main .tab_contents .tab_content");

        let currentTab = tabSections[0];
        let currentSection = currentTab.dataset.section;
        let currentTabButton = document.querySelector("main section.main .tab_buttons .active");

        tabButtons.addEventListener("click", handleTabClick);


        function handleTabClick(event){
           const buttonSection = event.target.dataset.section;
           const nextTabButton = event.target;
           //converting the nodeList (tabSections) to an array to it will possible to use find method
           const tabSection = Array.from(tabSections).find(section => section.dataset.section === buttonSection);
           switchTab(tabSection, buttonSection, nextTabButton);
        }

        //switch tabs
        function switchTab(newTab, section, nextTabButton){

            if(currentSection !== section && nextTabButton !== currentTabButton && nextTabButton.classList.contains("tab_button")){
                currentTab.classList.toggle("hide");
                newTab.classList.toggle("hide");
                currentTabButton.classList.toggle("active");
                nextTabButton.classList.toggle("active");

                currentTabButton = nextTabButton;
                currentTab = newTab;
                currentSection = currentTab.dataset.section;
            }
        }
    })();
}
