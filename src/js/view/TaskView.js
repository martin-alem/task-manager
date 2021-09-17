class TaskView {
	constructor() {
		this.description = document.querySelector(".task_modal .modal_content form .description");
		this.duration = document.querySelector(".task_modal .modal_content .task_form .duration");
		this.priority = document.querySelector(".task_modal .modal_content form .priority");
		this.submitButton = document.querySelector(".task_modal .modal_content .task_form .submit");
		this.taskForm = document.querySelector(".task_modal .modal_content .task_form");

		this.taskContainer = $(".weather_and_task .task_container");
		// this.taskButton = document.querySelector(".weather_and_task .task_container .add_task_button");
		this.taskButton2 = document.querySelector(".weather_and_task .date .add_task");

		this.taskStatusContainer = document.querySelector(".task_status_modal");
		this.taskStatusOverlay = document.querySelector(".task_status_overlay");
	}

	displayTask(taskList, Timer, taskDone) {
		this.taskContainer.empty();
		for (let i = 0; i < taskList.length; i++) {
			const taskElement = $(`
				<div class="task">
					<div id=timer${i} class="timer">
						<div class="hour">00</div> :
						<div class="minute">00</div> :
						<div class="second">00</div>
					</div>
					<div data-uid="${i}" class="description">${taskList[i]["description"].slice(0, 30)}</div>
					<div class="play_pause hide"><i class="fas fa-play"></i></div>
				</div>
				`);
			this.taskContainer.fadeIn().append(taskElement);
			if (i === 0) {
				const playPause = document.querySelector(".task_container .task .play_pause");
				const timer = new Timer(taskList[i]["duration"], this.updateTimer, i, taskDone, this.taskButton2, playPause);
				playPause.classList.remove("hide");
				playPause.addEventListener("click", timer.start);
			}
		}
	}

	updateTimer(second, minute, hour, id) {
		const s = $(`.task_container .task #timer${id} .second`);
		const m = $(`.task_container .task #timer${id} .minute`);
		const h = $(`.task_container .task #timer${id} .hour`);

		if (second.toString().length === 1) {
			second = `0${second}`;
		}
		if (minute.toString().length === 1) {
			minute = `0${minute}`;
		}
		if (hour.toString().length === 1) {
			hour = `0${hour}`;
		}

		s.html(second);
		m.html(minute);
		h.html(hour);
	}

	showStatusModal() {
		this.taskStatusOverlay.classList.remove("hide");
		this.taskStatusContainer.classList.remove("hide");
	}

	registerEvents(handler) {
		this.submitButton.addEventListener("click", handler);
	}
}

export default TaskView;
