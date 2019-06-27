var card = {
    //Called when mouse move to make the card follow the mous position 
    follow: function() {
        if (playingAnimation) {
            return;
        }
        anime({
            targets: '.event-choice-container',
            translateX: function() {
                return -math.lerp(mouse.value, -50, 50);
            },
            rotate: function() {
                return -math.lerp(mouse.value, -15, 15);
            },
            duration: 0,
            loop: false
        });
        anime({
            targets: ['#event-choice-1', "#event-choice-2"],
            opacity: function(el, i, tl) {
                if (i == 1) {
                    if (mouse.position != "left") {
                        return 0;
                    }
                    return 1 - mouse.value;
                } else {
                    if (mouse.position != "right") {
                        return 0;
                    }
                    return mouse.value;
                }
            },
            duration: 0,
            loop: false
        });
    },
    //Called when a new event is loaded to turn the card
    turn: function() {
        playingAnimation = true;
        anime({
            targets: ".event-choice-container",
            scale: [{ value: 1 }, { value: 1.2 }, { value: 1, delay: 125 }],
            rotateY: { value: '+=180', delay: 200 },
            easing: 'easeInOutSine',
            duration: 500,
            complete: function(anim) {
                anime({
                    targets: '.event-choice-container',
                    translateX: function() {
                        return -math.lerp(mouse.value, -50, 50);
                    },
                    rotate: function() {
                        return -math.lerp(mouse.value, -15, 15);
                    },
                    duration: 200,
                    loop: false,
                    complete: function(anim) {
                        playingAnimation = false;
                    }
                });
                anime({
                    targets: ['#event-choice-1', "#event-choice-2"],
                    opacity: function(el, i, tl) {
                        if (i == 1) {
                            if (mouse.position != "left") {
                                return 0;
                            }
                            return 1 - mouse.value;
                        } else {
                            if (mouse.position != "right") {
                                return 0;
                            }
                            return mouse.value;
                        }
                    },
                    duration: 200,
                    loop: false
                });
            }
        });

        anime({
            targets: ['#event-choice-1', "#event-choice-2"],
            opacity: function(el, i, tl) {
                if (i == 1) {
                    if (mouse.position != "left") {
                        return 0;
                    }
                    return 1 - mouse.value;
                } else {
                    if (mouse.position != "right") {
                        return 0;
                    }
                    return mouse.value;
                }
            },
            duration: 200,
            loop: false
        });
    },
    //called when user make a choice (click)
    fade: function() {
        if (playingAnimation) {
            return;
        }
        if (mouse.position == "left") {
            game.currentChoice = 1;
        } else {
            game.currentChoice = 0;
        }
        playingAnimation = true;
        anime({
            targets: '.event-choice-container',
            rotate: function() {
                if (mouse.position == "left") {
                    return -45;
                } else {
                    return 45;
                }
            },
            translateX: function() {
                if (mouse.position == "left") {
                    return -500;
                } else {
                    return 500;
                }
            },
            rotateY: function() {
                if (mouse.position == "left") {
                    return 360;
                } else {
                    return 0;
                }
            },
            opacity: { value: 0, delay: 250 },
            loop: false,
            easing: 'easeInOutSine',
            duration: 500,
            complete: function() {
                game.useCurrentEvent();
                card.reset();
            }
        });
    },
    reset: function() {
        $(".event-choice-container").removeAttr('style');;
        this.loadEvent(events.data[math.getRandomInt(0, events.data.length)]);
    },
    loadEvent: function(event) {
        game.currentEvent = event;
        $(".event-title").text(event.nom);
        $(".event-description").text(event.description);
        $("#event-choice-1").text(event.premierChoix.choix);
        $("#event-choice-2").text(event.secondChoix.choix);
        this.turn();
    }
}