var playingAnimation = false; // var that allow to check if an animation is aready playing or not

$(window).on('load', init);

function init(e) {
    game.reset();
    game.setupStartingAnimation();
    events.loadData(onEventsDataLoaded);
}

function onEventsDataLoaded() {
    $(window).mouseup(mouse.onMouseClick);
    $(window).mousemove(mouse.onMouseMove);
}