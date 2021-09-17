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
        this.taskDone = this.taskDone.bind(this);
	}

	_handleSubmission(event) {
		event.preventDefault();
        const description = this.taskView.description.value;
        const duration = this.taskView.duration.value;
        const priority = this.taskView.priority.value;
        const taskForm = this.taskView.taskForm;

        if(!description || !duration || !priority){
            ErrorHandler.message("danger", "Please provide all fields", 4000);
        }
        else if(!this.validateDuration(duration)){
            ErrorHandler.message("danger", "Invalid duration provided", 4000);
        }
        else if(!parseInt(priority, 10)){
            ErrorHandler.message("danger", "Invalid priority provided", 4000);
        }
        else{
            ErrorHandler.message("info", "Task added to queue", 3000);
            let task = new TaskModel(description, duration, priority, new Date().getTime());
            this.taskManager.addTask(task);
            taskForm.reset();
            this.taskView.displayTask(this.taskManager.task, Timer, this.taskDone);
        }
	}

    taskDone(){
        this.taskManager.updateTask();
        this.taskView.displayTask(this.taskManager.task, Timer, this.taskDone);
    }

    loadTask(){

        const tasks = this.taskManager.loadTask();

        if(tasks){
            this.taskManager.task = tasks;
            this.taskView.displayTask(tasks, Timer, this.taskDone);
        }
    }

    validateDuration(duration){

        duration = duration.replace(/\s/g, "").toLowerCase();
        const numSeg = duration.slice(0, duration.length - 1);
        const unitSeg = duration.slice(duration.length - 1);

        if(parseInt(numSeg, 10) && ["s", "m", "h"].includes(unitSeg)){
            return [parseInt(numSeg, 10), unitSeg];
        }

        return false;
    }

	init() {
		this.taskView.registerEvents(this._handleSubmission);
        this.loadTask();
	}
}

const taskController = new TaskController();
export default taskController;
