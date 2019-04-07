var mouse_side_threshold = 100;
var translateXValue = 25;
var translateYValue = 15;
var rotateValue = 10;
var position = "middle";
var mousePosition = 0;
var event_choice_1;
var event_choice_2;
var reseting = false;

function init() {
    console.log("init");
    event_choice_1 = $("#event-choice-1").hide();
    event_choice_2 = $("#event-choice-2").hide();
    $(window).click(onMouseClick);
    $(window).mousemove(onMouseMove);
}

function onMouseMove(mouseEvent) {
    if (reseting) {
        return;
    }
    var centerX = $(window).width() / 2;
    mousePosition = mouseEvent.clientX - centerX;
    if (mouseEvent.clientX > centerX + mouse_side_threshold) { // right
        console.log("right");
        slideRight();

    } else if (mouseEvent.clientX < centerX - mouse_side_threshold) { // left
        console.log("left");
        slideLeft();
    } else { //middle        
        console.log("middle");
        slideMiddle();
    }
}

function onMouseClick(mouseEvent) {
    console.log("click" + position);
    if (position == "middle") {
        return;
    }
    reseting = true;
    var i = -1;
    if (position == "right") {
        i = 1;
    }
    console.log(i);
    anime({
        targets: '.event-choice-container',
        translateX: i * 200,
        opacity: 0,
        complete: resetEvent(),
        loop: false
    });
}

function slideLeft() {
    position = "left";
    anime({
        targets: '.event-choice-container',
        translateX: -translateXValue,
        translteY: -translateYValue,
        rotate: -rotateValue,
        duration: 500,
        loop: false
    });
    event_choice_1.hide();
    event_choice_2.show();
    anime({
        targets: '#event-choice-2',
        opacity: 1,
        duration: 500,
        loop: false
    });
}

function slideRight() {
    position = "right";
    anime({
        targets: '.event-choice-container',
        translateX: translateXValue,
        translteY: -translateYValue,
        rotate: rotateValue,
        duration: 500,
        loop: false
    });
    event_choice_2.hide();
    event_choice_1.show();
    anime({
        targets: '#event-choice-1',
        opacity: 1,
        duration: 500,
        loop: false
    });
}

function slideMiddle(callback) {
    position = "middle";
    anime({
        targets: '.event-choice-container',
        translateX: 0,
        translteY: 0,
        rotate: '0',
        duration: 500,
        opacity: 1,
        loop: false
    });
    anime({
        targets: '#event-choice-1',
        opacity: 0,
        duration: 500,
        loop: false
    });
    anime({
        targets: '#event-choice-2',
        opacity: 0,
        duration: 500,
        loop: false
    });
}

function resetEvent() {}