var mouseObj = {
    position: "middle",
    sideThreshold: 0.1,
    value: 1,
    updateValue: function(e) {
        let left = $(".event-container").offset().left;
        let right = $(".event-container").offset().left + $(".event-container").width();
        this.value = mathf.normalize(e.pageX, left, right);
    }
}
var startingAnimation = null;
var gamestarted = false;
var playingAnimation = false;

$(window).on('load', init);

function init(e) {
    setupStartingAnimation();
    $("#event-choice-1");
    $("#event-choice-2").hide();
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
        if (mouseObj.value > 0.5 + mouseObj.sideThreshold) {
            position = "right";
        } else if (mouseObj.value < 0.5 - mouseObj.sideThreshold) {
            position = "left";
        } else {
            position = "middle";
        }
        card.follow();
    }
}

function onMouseClick(e) {
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
var card = {
    follow: function() {
        if (playingAnimation) {
            return;
        }
        anime({
            targets: '.event-choice-container',
            translateX: function() {
                return -mathf.lerp(mouseObj.value, -50, 50);
            },
            rotate: function() {
                return -mathf.lerp(mouseObj.value, -15, 15);
            },
            duration: 0,
            loop: false
        });
    },
    turn: function() {
        if (playingAnimation) {
            return;
        }
        playingAnimation = true;
        anime({
            targets: ".event-choice-container",
            scale: [{ value: 1 }, { value: 1.1 }, { value: 1, delay: 250 }],
            rotateY: { value: '+=180', delay: 200 },
            easing: 'easeInOutSine',
            duration: 500,
            complete: function(anim) {
                anime({
                    targets: '.event-choice-container',
                    translateX: function() {
                        return -mathf.lerp(mouseObj.value, -50, 50);
                    },
                    rotate: function() {
                        return -mathf.lerp(mouseObj.value, -15, 15);
                    },
                    duration: 200,
                    loop: false,
                    complete: function(anim) {
                        playingAnimation = false;
                    }
                });
            }
        });
    },
    fade: function() {
        if (playingAnimation) {
            return;
        }
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
            translateX: function(el, i) {
                console.log($(".panel-left").width());
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