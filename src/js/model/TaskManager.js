import sortTask from "../util/SortTask.js";
import LocalStorage from "../model/LocalStorage.js";

class TaskManager{

    constructor(){
        this.task = [];
        this.wLocalStorage = new LocalStorage();
    }

    addTask(task){
        this.task.push(task);
        this.task = sortTask(this.task);
        this.wLocalStorage.addData("task", this.task);
    }

    updateTask(){

        let task = this.wLocalStorage.getData("task");
        if(task){
            task.shift();
            task = sortTask(task);
            this.task = task;
            this.wLocalStorage.addData("task", task);
        }
    }

    loadTask(){
        const tasks = this.wLocalStorage.getData("task");
        if(tasks){
            this.task = tasks;
            return tasks
        }

        return null;
    }
}

export default TaskManager;