window.onload = function() {

    //weather modal functionality
    (function(){

        //obtain the reference to weather widget, overlay and modal window
        const weatherWidget = document.querySelector("main .weather_and_task .weather_widget");
        const overlay = document.querySelector(".overlay");
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

            if(currentSection !== section && nextTabButton !== currentTabButton){
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