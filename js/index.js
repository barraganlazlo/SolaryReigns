var mouse_side_threshold = 100;
var translateXValue = 25;
var translateYValue = 15;
var rotateValue = 10;
var position = "middle";
var mousePosition = 0;

function init() {
    console.log("init");
    $(window).click(onMouseClick);
    $(window).mousemove(onMouseMove);
}

function onMouseMove(mouseEvent) {
    var centerX = $(window).width() / 2;
    mousePosition = mouseEvent.clientX - centerX;
    if (mouseEvent.clientX > centerX + mouse_side_threshold) { // right
        console.log("right");
        anime({
            targets: '.event-image-container',
            translateX: translateXValue,
            translteY: -translateYValue,
            rotate: rotateValue,
            loop: false
        });
        position = "right";
    } else if (mouseEvent.clientX < centerX - mouse_side_threshold) { // left
        console.log("left");
        anime({
            targets: '.event-image-container',
            translateX: -translateXValue,
            translteY: -translateYValue,
            rotate: -rotateValue,
            loop: false
        });
        position = "left";
    } else { //middle
        anime({
            targets: '.event-image-container',
            translateX: 0,
            translteY: 0,
            rotate: '0',
            loop: false
        });
        console.log("middle");
        position = "middle";
    }
}

function onMouseClick(mouseEvent) {
    console.log("click");
}