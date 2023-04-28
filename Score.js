class Scorekeeper {
    constructor(gameArea, timer) {
        this.BlockWidth = 75;
        this.BlockHeight = 25;
        this.gameArea = gameArea;
        this.timer = timer;
        this.score = 0;
        this.curr_lvl = 1;
        this.LVL_UP_SCORE = 100;
        this.MAX_LEVEL = 20;
        this.draw_progress_bar();
        this.highScores;
        this.dont = false;
    }
    calc_end_score() {
        let end = 0;
        for (let index = 0; index < this.curr_lvl; index++) {
            end += this.LVL_UP_SCORE * index;

        }
        end += this.score;
        this.dont = true;
        return end;
    }
    save_progress() {
        this.gameArea.style.display = "none";

    }
    draw_xp_gain(x, y) {
        let image = new Image(10, 10);
        image.src = "assets/xp.webp";
        image.id = "x" + x + "y" + y + "s" + this.score;
        image.style.left = (((this.BlockWidth) * x) + x * 3) + this.BlockWidth / 2 + "px";
        image.style.top = (((this.BlockHeight) * y) + y * 3) + this.BlockHeight / 2 + "px";
        image.style.position = "absolute";
        image.style.zIndex = 6;
        image.style.animationName = "gain_point";
        image.style.animationDuration = "2s";
        image.style.animationFillMode = "forwards";
        this.gameArea.appendChild(image);
        setTimeout(() => {
            if (!this.dont) {
                this.addToScore(1);
                $("#" + image.id).remove();
                this.redraw_progress_bar();
            }

        }, 2000);
    }
    addToScore(gains) {
        this.score += gains;
        let i = 0;
        for (let index = this.curr_lvl; index < this.MAX_LEVEL + 1; index++) {
            if (this.score < index * this.LVL_UP_SCORE) {
                this.curr_lvl = index;
                break;
            }
            this.score -= index * this.LVL_UP_SCORE;
            this.timer.levelup();
            setTimeout(() => {
                let lvlupsound = new Audio("assets/lvl_up.mp3");
                lvlupsound.volume = 0.5;
                lvlupsound.mozPreservesPitch = false;
                lvlupsound.playbackRate = 1;
                lvlupsound.play();
            }, 1000 + i * 100);
            i++;
        }


        this.redraw_progress_bar();
    }

    queue_xp_sound(target_len) {

        console.log(target_len);
        for (let index = 0; index < target_len; index++) {
            setTimeout(() => {
                let xpGainSound = new Audio("assets/xp_pickup.mp3");
                xpGainSound.volume = 0.05;
                xpGainSound.mozPreservesPitch = false;
                xpGainSound.playbackRate = index / 150 + 0.5;
                xpGainSound.play();
            }, 2000 + 100 * index);

        }

    }
    queue_xp_sounds(tt) {
        tt.forEach(element => {
            queue_xp_sound(element);
        });
    }
    draw_progress_bar() {
        var block = document.createElement("div");
        block.id = "progressbar"
        block.style.width = this.gameArea.offsetWidth + "px";
        block.style.height = 20 + "px";
        block.style.left = -10 + "px";
        block.style.bottom = this.gameArea.offsetHeight + 10 + "px";
        block.style.position = "absolute";
        block.style.zIndex = 5;
        block.style.borderRadius = "3px";
        block.style.border = "1px solid black";
        block.style.backgroundColor = "grey";
        block.style.backgroundSize = "25px";
        block.append(this.draw_progress())
        block.append(this.display_level());
        this.gameArea.appendChild(block)

    }
    redraw_progress_bar() {
        $('#progressbar').remove();
        var block = document.createElement("div");
        block.id = "progressbar"
        block.style.width = this.gameArea.offsetWidth + "px";
        block.style.height = 20 + "px";
        block.style.left = -10 + "px";
        block.style.bottom = this.gameArea.offsetHeight + 10 + "px";
        block.style.position = "absolute";
        block.style.zIndex = 5;
        block.style.borderRadius = "3px";
        block.style.border = "1px solid black";
        block.style.backgroundColor = "grey";
        block.style.backgroundSize = "25px";
        block.append(this.draw_progress())
        block.append(this.display_level());
        this.gameArea.appendChild(block)

    }
    draw_progress() {
        let progress = (this.score / (this.curr_lvl * this.LVL_UP_SCORE));
        if (progress > 1) {
            progress = 1;
        }
        var block = document.createElement("div");
        block.id = "progress"
        block.style.width = this.gameArea.offsetWidth * progress + "px";
        block.style.height = 20 + "px";
        block.style.display = "block";
        block.style.position = "absolute";
        block.style.zIndex = 8;
        block.style.backgroundColor = "green";
        block.style.backgroundSize = "25px";
        return block;
    }
    display_level() {
        var block = document.createElement("div");
        block.id = "level";
        block.style.display = "block";
        block.style.width = 23 + "px";
        block.style.height = 20 + "px";
        block.style.borderRadius = "20px";
        block.style.backgroundColor = "white";
        block.style.position = "absolute";
        block.style.zIndex = 8;
        block.style.left = "0px";
        block.style.right = "0px";
        block.style.top = "0px";
        block.style.bottom = "0px";
        block.style.padding = "3px"
        block.style.paddingRight = "4.5px"
        block.style.textAlign = "center";
        block.style.verticalAlign = "middle";
        block.style.margin = "auto";
        block.innerText = this.curr_lvl;
        block.color = "black";
        return block;
    }
}