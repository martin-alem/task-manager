class Timer{

    constructor(duration, callback, taskId, taskDone, taskButton, playPause){
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
        this.timer = null;
        this.startTimer = false;

        this.duration = duration;
        this.callback = callback;
        this.taskId = taskId;
        this.taskDone = taskDone;
        this.taskButton = taskButton;
        this.playPause = playPause;

        this.counter = 0;
        this.totalTime = 0;

        this.start = this.start.bind(this);
    }

    start() {
        const duration = this.duration.slice(0, this.duration.length - 1);
        const units = this.duration.slice(-1);

        if(!this.startTimer){
            this.startTimer = true;
            this.taskButton.classList.add("hide");
            this.playPause.firstChild.classList.replace("fa-play", "fa-pause");
        }
        else{
            this.startTimer = false;
            this.taskButton.classList.remove("hide");
            this.playPause.firstChild.classList.replace("fa-pause", "fa-play");
        }

        this.totalTime = this.durationConversion(duration, units);

        if(this.startTimer){
            const timer = setInterval(() => {
                this.second += 1;
                if(this.second === 59){
                    this.minute += 1;
                    this.second = 0;
    
                    if(this.minute === 59){
                        this.hour += 1;
                        this.second = 0;
                        this.minute = 0;
                    }
                }
                if((this.counter * 1000) === this.totalTime){
                    clearInterval(this.timer);
                    this.second = 0;
                    this.minute = 0;
                    this.hour = 0;
                    this.taskButton.classList.remove("hide");
                    this.taskDone();
                }
                this.counter += 1;
                this.callback(this.second, this.minute, this.hour, this.taskId);
            },1000);

            this.timer = timer;
        }
        else{
            clearInterval(this.timer);
        }
    }

    pause() {

    }

    durationConversion(duration, units) {

        if(units === "s"){
            return duration * 1000;
        }
        else if(units === "m"){
            return duration * 60000;
        }
        else if(units === "h"){
            return duration * 3.6E6;
        }
    }

}

export default Timer;