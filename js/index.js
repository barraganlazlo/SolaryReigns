var mouse_side_threshold = 100;
var translateXValue = 25;
var translateYValue = 15;
var rotateValue = 10;
var position = "middle";
var mousePosition = 0;
var event_choice_1;
var event_choice_2;

function init() {
    console.log("init");
    event_choice_1 = $("#event-choice-1").hide();
    event_choice_2 = $("#event-choice-2").hide();
    $(window).click(onMouseClick);
    $(window).mousemove(onMouseMove);
}

function onMouseMove(mouseEvent) {
    var centerX = $(window).width() / 2;
    mousePosition = mouseEvent.clientX - centerX;
    if (mouseEvent.clientX > centerX + mouse_side_threshold) { // right
        console.log("right");
        anime({
            targets: '.event-choice-container',
            translateX: translateXValue,
            translteY: -translateYValue,
            rotate: rotateValue,
            loop: false
        });
        event_choice_2.hide();
        event_choice_1.show();
        anime({
            targets: '#event-choice-1',
            opacity: 1,
            loop: false
        });
        position = "right";
    } else if (mouseEvent.clientX < centerX - mouse_side_threshold) { // left
        console.log("left");
        anime({
            targets: '.event-choice-container',
            translateX: -translateXValue,
            translteY: -translateYValue,
            rotate: -rotateValue,
            loop: false
        });
        event_choice_1.hide();
        event_choice_2.show();
        anime({
            targets: '#event-choice-2',
            opacity: 1,
            loop: false
        });
        position = "left";
    } else { //middle
        anime({
            targets: '.event-choice-container',
            translateX: 0,
            translteY: 0,
            rotate: '0',
            loop: false
        });
        anime({
            targets: '#event-choice-1',
            opacity: 0,
            loop: false
        });
        anime({
            targets: '#event-choice-2',
            opacity: 0,
            loop: false
        });
        console.log("middle");
        position = "middle";
    }
}

function onMouseClick(mouseEvent) {
    console.log("click");
}