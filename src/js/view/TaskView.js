class TaskView {

	constructor() {
		this.description = document.querySelector(".task_modal .modal_content form .description");
		this.duration = document.querySelector(".task_modal .modal_content .task_form .duration");
		this.priority = document.querySelector(".task_modal .modal_content form .priority");
		this.submitButton = document.querySelector(".task_modal .modal_content .task_form .submit");
		this.taskForm = document.querySelector(".task_modal .modal_content .task_form")
	}

	registerEvents(handler) {
		this.submitButton.addEventListener("click", handler);
	}
}

export default TaskView;