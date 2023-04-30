class Character {
    constructor(gameArea, game) {
        this.gameArea = gameArea;
        this.game = game;
        this.col = 0;
        this.name = "Enderman";
        this.pickup_audio = new Audio("assets/pickup.mp3");
        this.place_audio = new Audio("assets/place.mp3");
        this.invalid = new Audio("assets/invalid.mp3");
        this.explosion = new Audio("assets/explosion.mp3");
        this.arm_tnt = new Audio("assets/arm_tnt.mp3")
        this.hands = Array();
        this.picked_pic = new Image(66, 100);
        this.picked_pic.src = "assets/enderman_picked.png";
        this.picked_pic.id = "picked";
        this.defa_pic = new Image(66, 100);
        this.defa_pic.src = "assets/enderman.png";
        this.defa_pic.id = "defa";
    }
    displace(blockIndex) {
        this.col = blockIndex;
        $("#" + this.name).remove();
        var block = document.createElement("div");
        block.id = this.name;
        block.style.width = 66 + "px";
        block.style.height = 100 + "px";
        block.style.left = (((77) * blockIndex) + blockIndex) + "px";
        block.style.bottom = 0 + "px";
        block.style.position = "absolute";
        block.style.margin = "3px"
        if (this.hands.length === 0) {
            block.appendChild(this.defa_pic);
        } else {
            block.appendChild(this.picked_pic);
        }

        block.style.backgroundSize = "25px";

        this.gameArea.appendChild(block)
    }
    animHands() {
        this.col = blockIndex;
        $("#" + this.name).remove();
        var block = document.createElement("div");
        block.id = this.name;
        block.style.width = 66 + "px";
        block.style.height = 100 + "px";
        block.style.left = (((77) * blockIndex) + blockIndex) + "px";
        block.style.bottom = 0 + "px";
        block.style.position = "absolute";
        block.style.margin = "3px"
        if (this.hands.length === 0) {
            block.appendChild(this.defa_pic);
        } else {
            block.appendChild(this.picked_pic);
        }

        block.style.backgroundSize = "25px";

        this.gameArea.appendChild(block)
    }
    action(blockMtx) {
        if (this.hands.length === 0) {
            this.pickup(blockMtx);
        } else {

            if (this.hands[0].type != BlockTypes.Colored) {

                this.use(blockMtx);
            } else {
                this.place(blockMtx);
            }

        }

    }
    pickup(blockMtx) {

        for (let index = 0; index < 15; index++) {
            if (index === 14 && blockMtx[this.col][index] != 0) {
                let similarNum;
                if (blockMtx[this.col][index].type === BlockTypes.Colored) {
                    similarNum = this.checkOnTop(blockMtx, index);

                } else if (blockMtx[this.col][index].type != BlockTypes.Stone) {
                    similarNum = 1;
                } else {
                    this.invalid.play();
                    break;
                }
                $(this.defa_pic).remove()
                $('#' + this.name).append(this.picked_pic);
                for (var offset = 0; offset < similarNum; offset++) {
                    this.hands.push(blockMtx[this.col][index - offset]);
                    blockMtx[this.col][index - offset].inHand = true;
                    blockMtx[this.col][index - offset] = 0;
                }

            } else if (index < 14) {
                if (blockMtx[this.col][index + 1] === 0 && blockMtx[this.col][index] != 0) {
                    let similarNum;
                    if (blockMtx[this.col][index].type === BlockTypes.Colored) {
                        similarNum = this.checkOnTop(blockMtx, index);
                    } else if (blockMtx[this.col][index].type != BlockTypes.Stone) {
                        similarNum = 1;
                    } else {
                        this.invalid.play();
                        break;
                    }
                    $(this.defa_pic).remove()
                    $('#' + this.name).append(this.picked_pic);

                    for (var offset = 0; offset < similarNum; offset++) {
                        this.hands.push(blockMtx[this.col][index - offset]);
                        blockMtx[this.col][index - offset].inHand = true;
                        blockMtx[this.col][index - offset] = 0;

                    }

                }
            }

        }
        try {
            this.play_sound(this.hands[0].type);
        } catch (error) {
            console.error("I tried :(")
        }

    }

    place(blockMtx) {
        for (let index = 0; index < 15; index++) {
            if (blockMtx[this.col][index] === 0) {
                let emptySpace = this.checkUnder(blockMtx, index);
                if (emptySpace != this.hands.length) {
                    this.invalid.play();
                    continue;
                }
                for (let offset = 0; offset < emptySpace; offset++) {

                    blockMtx[this.col][index + offset] = this.hands[this.hands.length - 1];
                    blockMtx[this.col][index + offset].put(this.col, index + offset);
                    blockMtx[this.col][index + offset].inHand = false;
                    this.hands.pop();
                    this.place_audio.play();
                    $(this.picked_pic).remove()
                    $('#' + this.name).append(this.defa_pic);
                }

                break;
            }
            if (index === 14) {

                this.invalid.play();
            }
        }

    }
    play_sound(type) {
        switch (type) {
            case BlockTypes.TNT:
                this.arm_tnt.play();
                break;
            case BlockTypes.Stone:
                this.invalid.play();
            default:
                this.pickup_audio.play();
                break;
        }
    }
    use(blockMtx) {
        //console.log(this.hands[0].type);
        if (this.hands[0].type === BlockTypes.TNT) {
            let targets = [];
            for (let index = 0; index < blockMtx[this.col].length; index++) {
                targets.push(blockMtx[this.col][index]);
                //blockMtx[this.col][index] = 0;


                this.explosion.play();
                this.hands.pop();


                $(this.picked_pic).remove()
                $('#' + this.name).append(this.defa_pic);
            }
            let all_targets = [];
            console.log(all_targets);
            all_targets.push(targets);
            this.game.cleanup(all_targets);
            this.game.show();

        }
        if (this.hands[0].type === BlockTypes.Nuke) {
            let targets = [];
            for (let index = 0; index < blockMtx[this.col].length; index++) {
                targets.push(blockMtx[this.col][index]);
                //blockMtx[this.col][index] = 0;


                this.explosion.play();
                this.hands.pop();


                $(this.picked_pic).remove()
                $('#' + this.name).append(this.defa_pic);
            }
            let all_targets = [];
            console.log(all_targets);
            all_targets.push(targets);
            this.game.cleanup(all_targets);
            this.game.show();

        }
    }
    die() {
        let sound_of_death = new Audio("assets/death.mp3");
    }
    checkUnder(blockMtx, index) {
        if (index < 14 && this.hands.length > 1) {
            if (blockMtx[this.col][index + 1] === 0) {
                if (index < 13 && this.hands.length > 2) {
                    if (blockMtx[this.col][index + 2] === 0) {
                        return 3;
                    }
                }
                return 2;
            }
        }

        return 1;
    }
    checkOnTop(blockMtx, index) {
        if (index > 0) {
            if (blockMtx[this.col][index].color == blockMtx[this.col][index - 1].color) {
                if (index > 1) {
                    if (blockMtx[this.col][index].color == blockMtx[this.col][index - 2].color) {
                        return 3;
                    }
                }
                return 2;
            }
        }

        return 1
    }

}