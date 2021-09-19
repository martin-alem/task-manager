import sortTask from "../util/SortTask.js";
import LocalStorage from "../model/LocalStorage.js";

class TaskManager {
	constructor() {
		this.task = [];
		this.wLocalStorage = new LocalStorage();
	}

	/**
	 * Adds a task to the task list and sorts ans persist to local storage
	 * @param {TaskModel} task task object
	 */
	addTask(task) {
		this.task.push(task);
		this.task = sortTask(this.task);
		this.wLocalStorage.addData("task", this.task);
	}

	/**
	 * When a task is completed and removed from the list.
	 * updateTask set feedback to false to make sure the user provides the status of the completed task
	 * the updated list is re-persisted to the local storage.
	 */
	updateTask() {
		this.wLocalStorage.addData("feedback", false);
		let task = this.wLocalStorage.getData("task");
		if (task) {
			task.shift();
			this.task = task;
			this.wLocalStorage.addData("task", task);
		}
	}

	/**
	 * Retrieves summary of all task from local storage.
	 * @returns summary or null if it does not exist
	 */
	getTaskSummary() {
		if (this.wLocalStorage.getData("summary")) {
			return this.wLocalStorage.getData("summary");
		}
		return null;
	}

	/**
	 * Updates the status of a task after completion
	 * @param {string} category
	 * @returns {object} task summary
	 */
	updateTaskStatus(category) {
		let summary = { complete: 0, undone: 0, postponed: 0, all: 0 };
		if (!this.wLocalStorage.getData("summary")) {
			summary[category] = 1;
			summary["all"] = this.task.length;
		} else {
			summary = this.wLocalStorage.getData("summary");
			summary[category] += 1;
		}

		this.wLocalStorage.addData("summary", summary);
		this.wLocalStorage.addData("feedback", true);

		return summary;
	}

	/**
	 * Returns the current status of a task after completion.
	 * @returns {boolean} true if feedback is set to true and false otherwise
	 */
	providedFeedback() {
		return this.wLocalStorage.getData("feedback");
	}

	/**
	 * Sets up local storage before the application starts.
	 */
	setUpStorage() {
		if (this.wLocalStorage.getData("date")) {
			const todayDate = new Date();
			const previousDate = new Date(this.wLocalStorage.getData("date"));

			if (todayDate.getDate() > previousDate.getDate()) {
				this.wLocalStorage.removeData("task");
				this.wLocalStorage.removeData("summary");
				this.wLocalStorage.addData("date", todayDate);
			}
		} else {
			this.wLocalStorage.addData("date", new Date());
			this.wLocalStorage.addData("feedback", true);
		}
	}

	/**
	 * Loads all task added to the local storage
	 * @returns object containing all tasks that have been added to local storage
	 */
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
