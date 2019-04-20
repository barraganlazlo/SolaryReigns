var mouseObj = {
    position: "middle",
    sideThreshold: 0.1,
    value: 1
}
var turned = true;
var playingAnimation = false;

function init() {
    console.log("init");
    $("#event-choice-1");
    $("#event-choice-2").hide();
    $(window).click(onMouseClick);
    $(window).mousemove(onMouseMove);
    card.turn();
}

function onMouseMove(mouseEvent) {
    let left = $(".event-container").offset().left;
    let right = $(".event-container").offset().left + $(".event-container").width();

    mouseObj.value = mathf.normalize(mouseEvent.clientX, left, right);

    card.follow();

    if (mouseObj.value > 0.5 + mouseObj.sideThreshold) {
        position = "right";
    } else if (mouseObj.value < 0.5 - mouseObj.sideThreshold) {
        position = "left";
    } else {
        position = "middle";
    }
}

function onMouseClick(mouseEvent) {
    card.turn();
}
var card = {
    follow: function() {
        if (playingAnimation) {
            return;
        }
        anime({
            targets: '.event-choice-container',
            translateX: -mathf.lerp(mouseObj.value, -50, 50),
            rotate: -mathf.lerp(mouseObj.value, -15, 15),
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
            duration: 400,
            complete: function(anim) {
                playingAnimation = false;
            }
        });
    },
    fade: function() {

    }
}