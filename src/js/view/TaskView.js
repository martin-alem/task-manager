class TaskView {
	constructor() {
		this.description = document.querySelector(".task_modal .modal_content form .description");
		this.duration = document.querySelector(".task_modal .modal_content .task_form .duration");
		this.priority = document.querySelector(".task_modal .modal_content form .priority");
		this.submitButton = document.querySelector(".task_modal .modal_content .task_form .submit");
		this.taskForm = document.querySelector(".task_modal .modal_content .task_form");

		this.taskContainer = $(".weather_and_task .task_container");
		this.taskButton = document.querySelector(".weather_and_task .task_container .add_task_button");
	}

	displayTask(taskList) {
		this.taskContainer.empty();
		this.taskButton.style.display = "none";
		for (let i = 0; i < taskList.length; i++) {
			const taskElement = $(`
			<div class="task">
				<div class="timer">
					<div class="hour">00</div> :
					<div class="minute">00</div> :
					<div class="second">00</div>
				</div>
				<div data-uid="${i}" class="description">${taskList[i]["description"].slice(0, 30)}</div>
				<div class="play_pause hide"><i class="fas fa-play"></i></div>
		    </div>
			`);
			this.taskContainer.fadeIn().append(taskElement);
			if(i === 0){
				$(".task_container .task .play_pause").toggleClass("hide");
			}
		}
	}

	registerEvents(handler) {
		this.submitButton.addEventListener("click", handler);
	}
}

export default TaskView;
