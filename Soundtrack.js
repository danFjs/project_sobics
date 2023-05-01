var currentAudio;
var currentIndex;
var isInited = false;

function init_play() {
    if (!isInited) {
        currentAudio = new Audio();
        currentIndex = randIntBetween(0, 11);
        currentAudio.src = "assets/soundtrack" + currentIndex + ".mp3";
        isInited = true;
        inline_play();

    }

}

function inline_play() {

    currentAudio.play();
    console.log("playing" +
        currentIndex);
    currentAudio.addEventListener('ended', function() {
        currentAudio = new Audio();
        currentIndex = randIntBetween(0, 11);
        currentAudio.src = "assets/soundtrack" + currentIndex + ".mp3";
        inline_play();
    }, true);
}