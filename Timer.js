class Timer {
    constructor(gameArea, game) {
        this.game = game;
        this.gameArea = gameArea;
        this.level = 1;
        this.cycle_time = 2e+4;
        this.MAX_LEVEL = 20;
        //array of intervals
        this.elapsed = 0;
        this.prInterval;
        this.intervals = Array();
        //An array of functions that the system will do in every tick
        this.internalF = Array();
        this.start();
    }
    start() {
        this.start_clock();
    }

    start_clock() {
        this.prInterval = window.setInterval(() => {
            if (this.elapsed < (this.cycle_time - this.level * 1000)) {
                this.elapsed += 10;
            } else {
                this.elapsed = 0;
            }
            this.redraw_progress_bar();
        }, 10);
        this.elapsed = 0;
        this.draw_progress_bar();
    }
    draw_progress_bar() {
        var block = document.createElement("div");
        block.id = "timebar"
        block.style.width = this.gameArea.offsetWidth + "px";
        block.style.height = 20 + "px";
        block.style.left = -10 + "px";
        block.style.top = this.gameArea.offsetHeight + 10 + "px";
        block.style.position = "absolute";
        block.style.zIndex = 5;
        block.style.borderRadius = "3px";
        block.style.border = "1px solid black";
        block.style.backgroundColor = "grey";
        block.style.backgroundSize = "25px";
        block.append(this.draw_progress());
        this.gameArea.appendChild(block);

    }
    redraw_progress_bar() {
        $('#timebar').remove();
        var block = document.createElement("div");
        block.id = "timebar"
        block.style.width = this.gameArea.offsetWidth + "px";
        block.style.height = 20 + "px";
        block.style.left = -10 + "px";
        block.style.top = this.gameArea.offsetHeight + 10 + "px";
        block.style.position = "absolute";
        block.style.zIndex = 5;
        block.style.borderRadius = "3px";
        block.style.border = "1px solid black";
        block.style.backgroundColor = "grey";
        block.style.backgroundSize = "25px";
        block.append(this.draw_progress());
        this.gameArea.appendChild(block);

    }
    draw_progress() {
        var block = document.createElement("div");
        block.id = "elapsed"
        block.style.width = this.gameArea.offsetWidth * (this.elapsed / (this.cycle_time - (this.level * 1000))) + "px";
        block.style.height = 20 + "px";
        block.style.display = "block";
        block.style.position = "absolute";
        block.style.zIndex = 8;
        block.style.backgroundColor = "green";
        block.style.backgroundSize = "25px";
        return block;
    }
    addTimer(func) {
        this.internalF.push(func);
        this.intervals.push(setInterval(func, this.cycle_time / this.level));
    }
    stopTimers() {
        this.intervals.forEach(element => {
            window.clearTimeout(element);
        });
        this.intervals = [];
        this.internalF = [];
    }
    pauseTimers() {
        this.intervals.forEach(element => {
            window.clearTimeout(element);
        });
        this.intervals = [];
    }
    resumeTimers() {
        this.internalF.forEach(element => {
            this.intervals.push(setInterval(element, this.cycle_time / this.level));
        });
    }
    resetTimer() {
        this.intervals.forEach(element => {
            window.clearTimeout(element);
        });
        this.intervals = [];
        this.internalF.forEach(element => {
            this.intervals.push(setInterval(element, this.cycle_time / this.level));
        });
    }
    levelup() {
        if (this.level < this.MAX_LEVEL) {
            this.level++;
        }
        window.clearInterval(this.prInterval);
        this.start_clock();
        window.clearInterval(this.game.pushDown);
        this.game.pushEveryOneDown();


    }
}