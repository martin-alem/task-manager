class ErrorHandler{

    static toastContainer = document.querySelector(".toast");
    static toastHeader = document.querySelector(".toast .heading");
    static toastMessage = document.querySelector(".toast .message")

    static message(type, error, duration){

        if(error instanceof GeolocationPositionError){
            ErrorHandler.toastMessage.textContent = "Could not get user's location";
        }
        else if(error.readyState === 4){
            ErrorHandler.toastMessage.textContent = "City not found";
        }
        ErrorHandler.toastHeader.textContent = type;
        ErrorHandler.toastContainer.classList.add("warning", "loadMessage");
        ErrorHandler.toastContainer.classList.remove("hide");
        ErrorHandler.clearError(duration);
    }


    static clearError(duration){
        setTimeout(function(){
            ErrorHandler.toastContainer.classList.replace("loadMessage", "hideMessage");
            setTimeout(function(){
                ErrorHandler.toastContainer.className = "";
                ErrorHandler.toastContainer.classList.add("toast", "hide");
            },500);
        }, duration);
    }
}

export default ErrorHandler;