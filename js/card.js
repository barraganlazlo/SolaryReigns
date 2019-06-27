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
        anime({
            targets: ['#event-choice-1', "#event-choice-2"],
            opacity: function(el, i, tl) {
                if (i == 1) {
                    if (mouseObj.position != "left") {
                        return 0;
                    }
                    return 1 - mouseObj.value;
                } else {
                    if (mouseObj.position != "right") {
                        return 0;
                    }
                    return mouseObj.value;
                }
            },
            duration: 0,
            loop: false
        });
    },
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
                anime({
                    targets: ['#event-choice-1', "#event-choice-2"],
                    opacity: function(el, i, tl) {
                        if (i == 1) {
                            if (mouseObj.position != "left") {
                                return 0;
                            }
                            return 1 - mouseObj.value;
                        } else {
                            if (mouseObj.position != "right") {
                                return 0;
                            }
                            return mouseObj.value;
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
                    if (mouseObj.position != "left") {
                        return 0;
                    }
                    return 1 - mouseObj.value;
                } else {
                    if (mouseObj.position != "right") {
                        return 0;
                    }
                    return mouseObj.value;
                }
            },
            duration: 200,
            loop: false
        });
    },
    fade: function() {
        if (playingAnimation) {
            return;
        }
        playingAnimation = true;
        anime({
            targets: '.event-choice-container',
            rotate: function() {
                if (mouseObj.position == "left") {
                    return -45;
                } else {
                    return 45;
                }
            },
            translateX: function() {
                if (mouseObj.position == "left") {
                    return -500;
                } else {
                    return 500;
                }
            },
            rotateY: function() {
                if (mouseObj.position == "left") {
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
                card.reset();
                card.turn();
            }
        });
    },
    reset: function() {
        $(".event-choice-container").removeAttr('style');;
        this.loadEvent(mathf.getRandomInt(0, events.data.length));
    },
    loadEvent: function(id) {
        console.log(id);
        event = events.data[id];
        $(".event-title").text(event.nom);
        $(".event-description").text(event.description);
        $("#event-choice-1").text(event.premierChoix.choix);
        $("#event-choice-2").text(event.secondChoix.choix);
    }
}