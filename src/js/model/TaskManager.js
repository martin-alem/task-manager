import sortTask from "../util/SortTask.js";
import LocalStorage from "../model/LocalStorage.js";

class TaskManager {
	constructor() {
		this.task = [];
		this.wLocalStorage = new LocalStorage();
	}

	addTask(task) {
		this.task.push(task);
		this.task = sortTask(this.task);
		this.wLocalStorage.addData("task", this.task);
	}

    updateTask() {
        this.wLocalStorage.addData("feedback", false);
		let task = this.wLocalStorage.getData("task");
		if (task) {
			task.shift();
			task = sortTask(task);
			this.task = task;
			this.wLocalStorage.addData("task", task);
		}
	}

	getTaskSummary() {
		if (this.wLocalStorage.getData("summary")) {
			return this.wLocalStorage.getData("summary");
		}
		return null;
	}

	updateTaskStatus(category) {
		if (!this.wLocalStorage.getData("summary")) {
			const summary = { complete: 0, undone: 0, postponed: 0, all: 0 };
			summary[category] = 1;
			summary["all"] = this.task.length;
			this.wLocalStorage.addData("summary", summary);
			this.wLocalStorage.addData("feedback", true);
			return summary;
		} else {
			const summary = this.wLocalStorage.getData("summary");
			summary[category] += 1;
			this.wLocalStorage.addData("summary", summary);
			this.wLocalStorage.addData("feedback", true);
			return summary;
		}
	}

	providedFeedback() {
		return this.wLocalStorage.getData("feedback");
	}

	setUpStorage() {
		if (this.wLocalStorage.getData("date")) {
			const todayDate = new Date().getTime();
			const previousDate = new Date(this.wLocalStorage.getData("date")).getTime();

			if (todayDate < previousDate) {
				this.wLocalStorage.removeData("task");
				this.wLocalStorage.removeData("summary");
			}
		} else {
			this.wLocalStorage.addData("date", new Date());
			this.wLocalStorage.addData("feedback", true);
		}
	}

	loadTask() {
		const tasks = this.wLocalStorage.getData("task");
		if (tasks) {
			this.task = tasks;
			return tasks;
		}

		return null;
	}
}

export default TaskManager;
