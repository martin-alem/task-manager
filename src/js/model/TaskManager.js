import sortTask from "../util/SortTask.js";

class TaskManager{

    constructor(){
        this.task = [];
    }

    addTask(task){
        this.task.push(task);
        this.task = sortTask(this.task);
    }
}

export default TaskManager;