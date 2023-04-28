const BlockTypes = {
    Colored: "Colored",
    Stone: "Stone",
    TNT: "TNT",
}

class Block {
    constructor(horizontal, vertical) {
        this.horizontal = horizontal;
        this.vertical = vertical;
        this.gameArea = $("#GameArea")[0];
        this.BlockGap = 10;
        this.BlockWidth = 75;
        this.BlockHeight = 25;
        this.inHand = false;
        this.new_place;
    }
    fall() {
        this.vertical++;
        this.draw()
    }
    toNewPlace(new_place) {
        this.new_place = new_place;
    }


    draw() {
        ctx.beginPath();
        ctx.rect(this.horizontal * this.BlockWidth, this.vertical * this.BlockHeight, this.BlockWidth, this.BlockHeight);
        ctx.stroke();

    }
}
class ColoredBlock extends Block {
    constructor(horizontal, vertical, color) {
        super(horizontal, vertical);
        this.color = color;
        this.type = BlockTypes.Colored;
    }
    put(new_hori, new_verti) {
        this.horizontal = new_hori;
        this.vertical = new_verti;
    }
    draw() {
        if (this.inHand) {
            return;
        }
        var block = document.createElement("div");
        block.classList.add("block");
        block.classList.add("colored");
        block.style.width = this.BlockWidth + "px";
        block.style.height = this.BlockHeight + "px";
        block.style.left = (((this.BlockWidth) * this.horizontal) + this.horizontal * 3) + "px";
        block.style.top = (((this.BlockHeight) * this.vertical) + this.vertical * 3) + "px";
        block.style.position = "absolute";
        block.style.margin = "3px"
        block.style.borderRadius = "3px"
        block.style.border = "1px solid black"
        block.style.backgroundImage = this.color;
        block.style.backgroundSize = "25px";
        this.gameArea.appendChild(block)
    }
}
class StoneBlock extends Block {
    constructor(horizontal, vertical) {
        super(horizontal, vertical);
        this.type = BlockTypes.Stone;
    }
    draw() {
        if (this.inHand) {
            return;
        }
        var block = document.createElement("div");
        block.classList.add("block");
        block.classList.add("stone");
        block.style.width = this.BlockWidth + "px";
        block.style.height = this.BlockHeight + "px";
        block.style.left = (((this.BlockWidth) * this.horizontal) + this.horizontal * 3) + "px";
        block.style.top = (((this.BlockHeight) * this.vertical) + this.vertical * 3) + "px";
        block.style.position = "absolute";
        block.style.margin = "3px"
        block.style.borderRadius = "3px"
        block.style.border = "1px solid black"
        block.style.backgroundImage = "url('./assets/stone.png')";
        block.style.backgroundSize = "25px"
        this.gameArea.appendChild(block)
    }

}
class DynamiteBlock extends Block {
    constructor(horizontal, vertical) {
        super(horizontal, vertical);
        this.type = BlockTypes.TNT;
    }
    draw() {
        if (this.inHand) {
            return;
        }
        var block = document.createElement("div");
        block.classList.add("block");
        block.classList.add("tnt");
        block.style.width = this.BlockWidth + "px";
        block.style.height = this.BlockHeight + "px";
        block.style.left = (((this.BlockWidth) * this.horizontal) + this.horizontal * 3) + "px";
        block.style.top = (((this.BlockHeight) * this.vertical) + this.vertical * 3) + "px";
        block.style.position = "absolute";
        block.style.margin = "3px"
        block.style.borderRadius = "3px"
        block.style.border = "1px solid black"
        block.style.backgroundImage = "url('./assets/tnt.png')";
        block.style.backgroundSize = "25px"
        this.gameArea.appendChild(block)
    }
}