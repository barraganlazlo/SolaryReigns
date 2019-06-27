var mouseObj = {
    position: "middle",
    sideThreshold: 0.1,
    value: 1,
    updateValue: function(e) {
        let left = $(".event-container").offset().left;
        let right = $(".event-container").offset().left + $(".event-container").width();
        this.value = mathf.normalize(e.pageX, left, right);
        if (mouseObj.value > 0.5 + mouseObj.sideThreshold) {
            mouseObj.position = "right";
        } else if (mouseObj.value < 0.5 - mouseObj.sideThreshold) {
            mouseObj.position = "left";
        } else {
            mouseObj.position = "middle";
        }
    }
}
var startingAnimation = null;
var gamestarted = false;
var playingAnimation = false;

$(window).on('load', init);

function init(e) {
    setupStartingAnimation();
    $(window).on("click", onMouseClick);
    $(window).on("mousemove", onMouseMove);
}

function StartGame() {
    gamestarted = true;
    card.turn();
}

function onMouseMove(e) {
    mouseObj.updateValue(e);
    if (gamestarted) {

        card.follow();
    }
}

function onMouseClick(e) {
    mouseObj.updateValue(e);
    if (gamestarted) {
        card.fade();
    } else {
        if (playingAnimation) {
            return;
        }
        playingAnimation = true;
        startingAnimation.play();
    }
}

function setupStartingAnimation() {
    startingAnimation = anime.timeline({
        duration: 500,
        easing: 'easeInOutSine',
        loop: false,
        autoplay: false,
        complete: function() {
            playingAnimation = false;
            $('.panel-container').hide();
            StartGame();
        }
    });
    startingAnimation.add({
            targets: '.solary-logo',
            rotate: [-180, 0],
            duration: 500
        })
        .add({
            targets: ['.solary-top-image', '.panel-left'],
            begin: function() {
                $(".panel-container").removeClass("background-color4");
            },
            translateX: function(el, i) {
                return -($(".panel-left").width() + 100);
            },
            duration: 1000
        })
        .add({
            targets: ['.solary-bottom-image', '.panel-right'],
            translateX: function(el, i) {
                return $(".panel-right").width() + 100;
            },
            duration: 1000
        }, 500);
}