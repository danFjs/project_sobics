class Game {
    constructor() {
        this.gameArea = $("#GameArea")[0];
        this.blockMtx = makeArray(15, 10, 0);
        this.character = new Character(this.gameArea, this);
        this.timer = new Timer(this.gameArea, this);
        this.scorer = new Scorekeeper(this.gameArea, this.timer);
        this.pushDown;
        this.deathSound = new Audio("assets/death.mp3");
        this.pushEveryOneDown()
        this.init_area();

    }
    start() {
        init_area();
        this.timer.start();
    }
    clear_area() {
        let blocks = this.gameArea.getElementsByClassName("block");
        while (blocks.length > 0) {
            blocks[0].parentNode.removeChild(blocks[0]);
        }

    }
    init_game() {
        this.blockMtx = makeArray(15, 10, 0);
        this.character = new Character(this.gameArea, this);
        this.timer = new Timer(this.gameArea, this);
        this.scorer = new Scorekeeper(this.gameArea, this.timer);
        this.pushEveryOneDown()
        this.init_area();
    }


    init_area() {
        this.generateInterActionArea();
        this.generateRandomBlocks(true);
    }

    generateInterActionArea() {
            for (let index = 0; index < 10; index++) {
                var block = document.createElement("div");
                block.id = index;
                block.style.width = 77 + "px";
                block.style.height = 494 + "px";
                block.style.left = (((77) * index) + index) + "px";
                block.style.top = 0 + "px";
                block.style.position = "absolute";
                block.style.margin = "3px"
                block.style.backgroundColor = "grey";
                block.style.backgroundSize = "25px";
                block.style.zIndex = 10;
                block.style.opacity = 0;
                block.onmouseenter = () => {
                    document.getElementById(index).style.opacity = 0.1;
                    this.character.displace(index, block);
                }
                block.onmouseout = () => {
                    document.getElementById(index).style.opacity = 0;
                }
                block.onclick = () => {
                    this.character.action(this.blockMtx);
                    this.render();
                }
                this.gameArea.appendChild(block)
            }
            this.character.displace(0);

        }
        //
    render() {

        let all_targets = this.checkForCollisions();
        this.cleanup(all_targets);
        for (let w = 0; w < this.blockMtx.length; w++) {
            for (let h = 0; h < this.blockMtx[w].length; h++) {
                if (this.blockMtx[w][h] != 0) {
                    try {
                        this.blockMtx[w][h].draw();
                    } catch {
                        console.log(this.blockMtx[w][h]);
                    }

                }
            }
        }
    }
    show() {
        this.clear_area();
        for (let w = 0; w < this.blockMtx.length; w++) {
            for (let h = 0; h < this.blockMtx[w].length; h++) {
                if (this.blockMtx[w][h] != 0) {
                    try {
                        this.blockMtx[w][h].draw();
                    } catch {
                        console.log(this.blockMtx[w][h]);
                    }

                }
            }
        }
    }


    cleanup(all_targets) {

        all_targets.forEach(target => {
            let num_targets = 0;
            target.forEach(block => {
                if (block != 0) {
                    this.blockMtx[block.horizontal][block.vertical] = 0;
                    this.scorer.draw_xp_gain(block.horizontal, block.vertical);
                    num_targets++;
                }


            });
            this.scorer.queue_xp_sound(num_targets);
        });

        let numberOfCorr = 0;
        do {
            numberOfCorr = 0;
            for (let w = 0; w < this.blockMtx.length; w++) {
                for (let h = 0; h < this.blockMtx[w].length; h++) {
                    if (this.blockMtx[w][h] != 0) {
                        try {

                            let LastEmptyIndex = h;
                            for (let index = h; index > 0; index--) {
                                if (index - 1 >= 0) {
                                    if (this.blockMtx[w][index - 1] != 0) {
                                        break;
                                    }
                                    LastEmptyIndex = index - 1;
                                }
                                break;

                            }
                            this.blockMtx[w][LastEmptyIndex] = this.blockMtx[w][h];

                            if (LastEmptyIndex != h) {
                                numberOfCorr++;
                                this.blockMtx[w][h] = 0;
                            }

                        } catch {
                            console.log(this.blockMtx[w][h]);
                        }

                    }
                }
            }
        } while (numberOfCorr > 0)

        var movement = setInterval(() => {
                this.clear_area();
                let num_of_corrections = 0;
                for (let w = 0; w < this.blockMtx.length; w++) {
                    for (let h = 0; h < this.blockMtx[w].length; h++) {
                        if (this.blockMtx[w][h] != 0) {
                            try {
                                if (this.blockMtx[w][h].vertical - h > 0) {


                                    this.blockMtx[w][h].vertical -= 0.1;


                                    num_of_corrections++;
                                } else {
                                    this.blockMtx[w][h].vertical = Math.ceil(this.blockMtx[w][h].vertical);
                                }

                                this.blockMtx[w][h].draw();
                            } catch {
                                console.log(this.blockMtx[w][h]);
                            }

                        }
                    }
                }
                if (num_of_corrections == 0) {
                    window.clearInterval(movement);
                }
                num_of_corrections = 0;
            },
            10);

    }
    end() {
        window.clearInterval(this.pushDown);
        window.clearInterval(this.timer.prInterval);
        this.deathSound.play();
        current_score = this.scorer.calc_end_score();
        cleanArea();
        drawDeathScreen();
    }
    pushEveryOneDown(useExtras = false, n = 1) {
        //temporary solution:
        this.pushDown = window.setInterval(() => {
            var scope = this;
            for (let w = 0; w < scope.blockMtx.length; w++) {
                for (let h = 0; h < n; h++) {
                    let block = new Block(w, h);
                    if (true) {
                        let num = randIntBetween(1, 100);
                        if (num < 95) {
                            let color = randomColor();
                            block = new ColoredBlock(w, h, color);
                        } else if (num < 97) {
                            block = new StoneBlock(w, h);


                        } else {
                            block = new DynamiteBlock(w, h);
                        }

                    }

                    scope.blockMtx[w].unshift(block);
                    let deleted = scope.blockMtx[w].pop();
                    if (deleted != 0) {
                        console.log("L + ratio + can't get wenches lmao")
                        this.end();
                        return;
                    } else {

                        scope.blockMtx[w][h].draw();
                        for (let index = h + 1; index < scope.blockMtx[w].length; index++) {
                            if (scope.blockMtx[w][index] != 0) {
                                scope.blockMtx[w][index].vertical += 1;
                                scope.blockMtx[w][index].draw();
                            }

                        }
                        console.log("W");
                    }


                }

            }
            scope.render();
        }, this.timer.cycle_time - this.timer.level * 1000);

    }
    checkForCollisions() {
        let all_targets = [];
        //Check if at least 4 colored blocks are around each other
        for (let w = 0; w < this.blockMtx.length; w++) {
            for (let h = 0; h < this.blockMtx[w].length; h++) {
                if (this.blockMtx[w][h].type === BlockTypes.Colored) {
                    let targets = [];
                    this.sameAround(targets, w, h);
                    if (targets.length > 3 && !all_targets.includes(targets)) {
                        all_targets.push(targets);
                    }
                }
            }
        }
        return all_targets;
    }
    sameAround(target_array, w, h) {
        if (this.blockMtx[w][h] != null && this.blockMtx[w][h] != undefined && typeof this.blockMtx[w][h] === "object") {
            if (this.blockMtx[w][h].type === BlockTypes.Colored) {
                if (target_array.length === 0) {
                    target_array.push(this.blockMtx[w][h]);
                    if (h + 1 < this.blockMtx[w].length) {
                        this.sameAround(target_array, w, h + 1);
                    }
                    if (h - 1 >= 0) {
                        this.sameAround(target_array, w, h - 1);
                    }
                    if (w + 1 < this.blockMtx.length) {
                        this.sameAround(target_array, w + 1, h);
                    }
                    if (w - 1 >= 0) {
                        this.sameAround(target_array, w - 1, h);
                    }



                    return true;
                } else
                if (!target_array.includes(this.blockMtx[w][h]) && target_array[0].color === this.blockMtx[w][h].color) {
                    target_array.push(this.blockMtx[w][h]);
                    if (h + 1 < this.blockMtx[w].length) {
                        this.sameAround(target_array, w, h + 1);
                    }
                    if (h - 1 >= 0) {
                        this.sameAround(target_array, w, h - 1);
                    }
                    if (w + 1 < this.blockMtx.length) {
                        this.sameAround(target_array, w + 1, h);
                    }
                    if (w - 1 >= 0) {
                        this.sameAround(target_array, w - 1, h);
                    }
                    return true;
                }
            }
        }

        return false;
    }
    generateRandomBlocks(useExtras = false) {
        for (let w = 0; w < this.blockMtx.length; w++) {
            for (let h = 0; h < 5; h++) {
                if (useExtras) {
                    let num = randIntBetween(1, 100);
                    if (num < 95) {
                        let color = randomColor();
                        this.blockMtx[w][h] = new ColoredBlock(w, h, color);
                        this.blockMtx[w][h].draw();
                    } else if (num < 97) {
                        this.blockMtx[w][h] = new StoneBlock(w, h);
                        this.blockMtx[w][h].draw();

                    } else {
                        this.blockMtx[w][h] = new DynamiteBlock(w, h);
                        this.blockMtx[w][h].draw();
                    }
                }
            }

        }
    }
}