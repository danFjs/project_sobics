var current_score = 0;
var scores = [];
$(document).ready(function() {
    playScreen();

});

function clicc() {
    const click_sound = new Audio("assets/click.mp3");
    click_sound.play();

}

function cleanArea() {
    let gameArea = document.getElementById("GameArea");
    gameArea.innerHTML = "";
    return gameArea;
}

function playScreen() {
    let area = cleanArea();
    area.style.cursor = "auto";
    drawPlayButton(area);
    drawHighScoreButton(area);
}

function drawPlayButton(area) {
    var block = document.createElement("div");
    block.classList.add("button");
    block.id = "play";
    block.style.textAlign = "center";
    block.style.paddingTop = area.offsetWidth / 30 / 2 + "px";
    block.style.width = area.offsetWidth / 4 + "px";
    block.style.height = area.offsetWidth / 30 + "px";
    block.style.left = 0;
    block.style.right = 0;
    block.style.cursor = "pointer";
    block.style.top = "150px";
    block.style.position = "absolute";
    block.style.margin = "auto"
    block.style.borderRadius = "3px"
    block.style.border = "1px solid black"
    block.style.backgroundColor = "grey";
    block.style.backgroundImage = "url('assets/btn.png')";
    block.style.backgroundPosition = "left";
    block.style.backgroundSize = area.offsetWidth / 6 + "px";
    block.style.color = "white";
    block.innerHTML = "<b>PLAY<b>";
    block.onclick = () => {
        cleanArea();
        let game = new Game();
        clicc();
    };
    area.appendChild(block);

}

function drawHighScoreButton(area) {
    var block = document.createElement("div");
    block.classList.add("button");
    block.id = "highScore";
    block.style.textAlign = "center";
    block.style.paddingTop = area.offsetWidth / 30 / 2 + "px";
    block.style.width = area.offsetWidth / 4 + "px";
    block.style.height = area.offsetWidth / 30 + "px";
    block.style.left = 0;
    block.style.right = 0;
    block.style.cursor = "pointer";
    block.style.top = "200px";
    block.style.position = "absolute";
    block.style.margin = "auto"
    block.style.borderRadius = "3px"
    block.style.border = "1px solid black"
    block.style.backgroundColor = "grey";
    block.style.backgroundImage = "url('assets/btn.png')";
    block.style.backgroundPosition = "left";
    block.style.backgroundSize = area.offsetWidth / 6 + "px";
    block.style.color = "white";
    block.innerHTML = "<b>HIGHSCORES<b>";
    block.onclick = () => {
        cleanArea();
        displayHighScores(area);
        clicc();
    };
    area.appendChild(block);

}

function displayHighScores(area) {
    var table = document.createElement("table");
    table.id = "highscores";
    let header = document.createElement("tr");
    let name = document.createElement("th");
    name.innerText = "Name";
    header.appendChild(name);
    let sc = document.createElement("th");
    sc.innerText = "Score";
    header.appendChild(sc);
    table.appendChild(header);
    let slic;
    if (scores.length < 20) {
        slic = scores.length;
    } else {
        slic = 20;
    }

    var top10 = scores.slice(0, slic);
    if (top10.length > 0) {
        for (let index = 0; index < slic; index++) {
            var row = document.createElement("tr");
            let title = document.createElement("td");
            let n = top10[index].name;
            title.innerHTML = n;
            row.appendChild(title);
            let esc = document.createElement("td");
            let s = top10[index].score;
            esc.innerHTML = s;
            row.appendChild(esc);
            table.appendChild(row);

        }


    } else {
        var MT = document.createElement("tr");
        var MTI = document.createElement("td");
        MTI.colSpan = "2";
        MTI.innerText = "NO ENTIRES YET";
        MT.appendChild(MTI);
        table.appendChild(MT);
    }

    area.appendChild(table);
    drawBackBTN(area)
}

function drawBackBTN(area) {
    var block = document.createElement("div");
    block.classList.add("button");
    block.id = "back";
    block.style.textAlign = "center";
    block.style.paddingTop = area.offsetWidth / 30 / 2 + "px";
    block.style.width = area.offsetWidth / 4 + "px";
    block.style.height = area.offsetWidth / 30 + "px";
    block.style.left = 0;
    block.style.right = 0;
    block.style.cursor = "pointer";
    block.style.bottom = "10px";
    block.style.position = "absolute";
    block.style.margin = "auto"
    block.style.borderRadius = "3px"
    block.style.border = "1px solid black"
    block.style.backgroundColor = "grey";
    block.style.backgroundImage = "url('assets/btn.png')";
    block.style.backgroundPosition = "left";
    block.style.backgroundSize = area.offsetWidth / 6 + "px";
    block.style.color = "white";
    block.innerHTML = "<b>BACK<b>";
    block.onclick = () => {
        cleanArea();
        playScreen(area);
        clicc();
    };
    area.appendChild(block);

}

function drawDeathScreen() {
    let area = cleanArea();
    var block = document.createElement("div");
    block.classList.add("button");
    block.id = "die";
    block.style.textAlign = "center";
    block.style.paddingTop = area.offsetWidth / 30 / 2 + "px";
    block.style.width = "70%";
    block.style.height = area.offsetWidth / 3 + "px";
    block.style.left = 0;
    block.style.right = 0;
    block.style.cursor = "auto";
    block.style.top = "100px";
    block.style.position = "absolute";
    block.style.margin = "auto"
    block.style.borderRadius = "3px"
    block.style.border = "1px solid black"
    block.style.backgroundColor = "grey";
    block.style.backgroundImage = "url('assets/btn.png')";
    block.style.backgroundPosition = "left";
    block.style.backgroundSize = area.offsetWidth / 6 + "px";
    block.style.color = "white";
    block.innerHTML = "L+Ratio+You just died<p> Your score was: " + current_score + "</p>";
    drawInput(block);
    drawSaveBTN(area);
    area.appendChild(block);
}

function drawInput(area) {
    var input = document.createElement("input");
    input.type = "text";
    input.id = "nameInput";
    input.placeholder = "your name goes here pal"
    input.style.width = "50%";
    input.style.zIndex = 8;
    input.style.left = 0;
    input.style.right = 0;
    input.style.cursor = "auto";
    input.style.top = "200px";
    input.style.position = "absolute";
    input.style.margin = "auto"
    area.appendChild(input);
}

function drawSaveBTN(area) {
    var block = document.createElement("div");
    block.classList.add("button");
    block.id = "save";
    block.style.textAlign = "center";
    block.style.paddingTop = area.offsetWidth / 30 / 2 + "px";
    block.style.width = area.offsetWidth / 4 + "px";
    block.style.height = area.offsetWidth / 30 + "px";
    block.style.left = 0;
    block.style.right = 0;
    block.style.cursor = "pointer";
    block.style.bottom = "10px";
    block.style.position = "absolute";
    block.style.margin = "auto"
    block.style.borderRadius = "3px"
    block.style.border = "1px solid black"
    block.style.backgroundColor = "grey";
    block.style.backgroundImage = "url('assets/btn.png')";
    block.style.backgroundPosition = "left";
    block.style.backgroundSize = area.offsetWidth / 6 + "px";
    block.style.color = "white";
    block.innerHTML = "<b>SAVE<b>";
    block.onclick = () => {

        addHighScore(document.getElementById("nameInput").value);
        cleanArea();
        playScreen();
        clicc();
    };
    area.appendChild(block);
}

function addHighScore(name) {
    let index = 0;
    let toBeInserted = { 'name': name, 'score': current_score };
    if (scores.length === 0) {
        scores.push(toBeInserted);
        current_score = 0;
        return;
    }
    scores.forEach(element => {
        if (element['score'] <= current_score) {
            scores.splice(index, 0, toBeInserted);
            current_score = 0;
            return;
        }
        index++;

    });
}