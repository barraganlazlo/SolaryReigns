var mouse = {
    position: "middle",
    sideThreshold: 0.1,
    value: 1,
    updateValue: function(e) {
        let left = $(".event-container").offset().left;
        let right = $(".event-container").offset().left + $(".event-container").width();
        this.value = math.normalize(e.pageX, left, right);
        if (mouse.value > 0.5 + mouse.sideThreshold) {
            mouse.position = "right";
        } else if (mouse.value < 0.5 - mouse.sideThreshold) {
            mouse.position = "left";
        } else {
            mouse.position = "middle";
        }
    },
    onMouseClick: function(e) {
        mouse.updateValue(e);
        if (game.started) {
            card.fade();
        } else {
            game.playStartingAnimation();
        }
    },
    onMouseMove: function(e) {
        mouse.updateValue(e);
        if (game.started) {
            card.follow();
        }
    }

}