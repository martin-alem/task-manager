import ErrorHandler from "./ErrorHandler.js";

class TaskNotification {
	static permission = null;

	static requestPermissions() {
		if ("Notification" in window) {
			if (Notification.permission === "default" || Notification.permission === "denied") {
				Notification.requestPermission()
					.then((permission) => {
						TaskNotification.permission = permission;
					})
					.catch((error) => {
						ErrorHandler.message("warning", "Notification Error", 3000);
					});
			}
		}
	}

	static showNotification(title, message) {
		new Notification(title, { body: message });
	}
}

export default TaskNotification;
