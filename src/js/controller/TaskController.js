import TaskView from "../view/TaskView.js";
import ErrorHandler from "../util/ErrorHandler.js";

class TaskController {
	constructor() {
		this.taskView = new TaskView();
        this._handleSubmission = this._handleSubmission.bind(this);
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
            taskForm.reset();
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
	}
}

const taskController = new TaskController();
export default taskController;
