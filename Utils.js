function randIntBetween(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function init_canvas(canvasName = "GameArea") {
    return document.getElementById(canvasName);
}

function makeArray(w, h, val = 0) {
    var arr = [];
    for (let i = 0; i < h; i++) {
        arr[i] = [];
        for (let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}



function randomColor() {
    switch (randIntBetween(1, 7)) {
        case 1:
            //yellow
            return "url('./assets/yellow.png')";
        case 2:
            //red
            return "url('./assets/red.png')";
        case 3:
            //magenta
            return "url('./assets/magenta.png')";
        case 4:
            //narancs
            return "url('./assets/orange.png')";
        case 5:
            //blue
            return "url('./assets/blue.png')";
        case 6:
            //light blue 
            return "url('./assets/lightblue.png')";
        case 7:
            //green
            return "url('./assets/green.png')";

        default:
            //yellow
            return "url('./assets/yellow.png')";
    }
}