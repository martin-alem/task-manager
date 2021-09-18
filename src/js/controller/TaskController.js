import TaskView from "../view/TaskView.js";
import TaskModel from "../model/TaskModel.js";
import TaskManager from "../model/TaskManager.js";
import ErrorHandler from "../util/ErrorHandler.js";
import Timer from "../util/Timer.js";

class TaskController {
	constructor() {
		this.taskView = new TaskView();
		this.taskManager = new TaskManager();
		this._handleSubmission = this._handleSubmission.bind(this);
		this._completeHandler = this._completeHandler.bind(this);
		this._undoneHandler = this._undoneHandler.bind(this);
		this._postPonedHandler = this._postPonedHandler.bind(this);
		this.taskDone = this.taskDone.bind(this);
	}

	_handleSubmission(event) {
		event.preventDefault();
		const description = this.taskView.description.value;
		const duration = this.taskView.duration.value;
		const priority = this.taskView.priority.value;
		const taskForm = this.taskView.taskForm;

		if (!description || !duration || !priority) {
			ErrorHandler.message("danger", "Please provide all fields", 4000);
		} else if (!this.validateDuration(duration)) {
			ErrorHandler.message("danger", "Invalid duration provided", 4000);
		} else if (!parseInt(priority, 10)) {
			ErrorHandler.message("danger", "Invalid priority provided", 4000);
		} else {
			ErrorHandler.message("info", "Task added to queue", 3000);
			let task = new TaskModel(description, duration, priority, new Date().getTime());
			this.taskManager.addTask(task);
			taskForm.reset();
			this.taskView.displayTask(this.taskManager.task, Timer, this.taskDone);
			this.taskManager.updateTaskStatus("all");
			this.taskView.updateTaskSummary(this.taskManager.getTaskSummary());
		}
	}

	taskDone() {
		this.taskManager.updateTask();
		this.taskView.displayTask(this.taskManager.task, Timer, this.taskDone);
		this.taskView.showStatusModal();
	}

	loadTask() {
		const tasks = this.taskManager.loadTask();

		if (tasks) {
			this.taskManager.task = tasks;
			this.taskView.displayTask(tasks, Timer, this.taskDone);
		}
	}

	_completeHandler(event) {
		event.preventDefault();
		const summary = this.taskManager.updateTaskStatus("complete");
		this.taskView.updateTaskSummary(summary);
		this.taskView.hideStatusModal();
	}

	_undoneHandler(event) {
		event.preventDefault();
		const summary = this.taskManager.updateTaskStatus("undone");
		this.taskView.updateTaskSummary(summary);
		this.taskView.hideStatusModal();
	}

	_postPonedHandler(event) {
		event.preventDefault();
		const summary = this.taskManager.updateTaskStatus("postponed");
		this.taskView.updateTaskSummary(summary);
		this.taskView.hideStatusModal();
	}

	validateDuration(duration) {
		duration = duration.replace(/\s/g, "").toLowerCase();
		const numSeg = duration.slice(0, duration.length - 1);
		const unitSeg = duration.slice(duration.length - 1);

		if (parseInt(numSeg, 10) && ["s", "m", "h"].includes(unitSeg)) {
			return [parseInt(numSeg, 10), unitSeg];
		}

		return false;
	}

	init() {
		this.taskManager.setUpStorage();
		this.taskView.registerEvents(this._handleSubmission, this._completeHandler, this._undoneHandler, this._postPonedHandler);
		this.loadTask();
		this.taskView.updateTaskSummary(this.taskManager.getTaskSummary());
		if (!this.taskManager.providedFeedback()) {
			this.taskView.showStatusModal();
		}
	}
}

const taskController = new TaskController();
export default taskController;
