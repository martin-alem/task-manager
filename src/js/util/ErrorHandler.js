class ErrorHandler {
	static toastContainer = document.querySelector(".toast");
	static toastHeader = document.querySelector(".toast .heading");
	static toastMessage = document.querySelector(".toast .message");

	static message(type, message, duration) {
		ErrorHandler.toastHeader.textContent = type;
		ErrorHandler.toastMessage.textContent = message;
		ErrorHandler.toastContainer.classList.add(type, "loadMessage");
		ErrorHandler.toastContainer.classList.remove("hide");
		ErrorHandler.clearError(duration);
	}

	static clearError(duration) {
		setTimeout(function () {
			ErrorHandler.toastContainer.classList.replace("loadMessage", "hideMessage");
			setTimeout(function () {
				ErrorHandler.toastContainer.className = "";
				ErrorHandler.toastContainer.classList.add("toast", "hide");
			}, 500);
		}, duration);
	}
}

export default ErrorHandler;
