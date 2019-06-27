var game = {
    started: false,
    start: function() {
        this.started = true;
        card.reset();
    },
    setValues: function(a, b, c) {
        this.argent = a;
        this.hype = b;
        this.reputation = c;
    },
    addValues: function(a, b, c) {
        this.argent = math.clamp(this.argent + a, 0, 100);
        this.hype = math.clamp(this.hype + b, 0, 100);;
        this.reputation = math.clamp(this.reputation + c, 0, 100);
    },
    updateValues: function() {
        $("#money-icon").css("height", (100 - this.argent) + "%");
        $("#hype-icon").css("height", (100 - this.hype) + "%");
        $("#reputation-icon").css("height", (100 - this.reputation) + "%");
    },
    useCurrentEvent: function() {
        console.log("using Current Event")
        console.log(this.currentEvent)

        if (this.currentEvent == null) {
            return;
        }
        let choice;
        if (this.currentChoice == 0) {
            choice = this.currentEvent.premierChoix
        } else {
            choice = this.currentEvent.secondChoix
        }
        this.addValues(choice.argent, choice.hype, choice.reputation);
        this.updateValues();
    },
    setupStartingAnimation: function() {
        this.startingAnimation =
            anime.timeline({
                duration: 500,
                easing: 'easeInOutSine',
                loop: false,
                autoplay: false,
                complete: function() {
                    playingAnimation = false;
                    $('.panel-container').hide();
                    game.start();
                }
            }).add({
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
            }, 500)
    },
    playStartingAnimation: function() {
        if (playingAnimation || this.startingAnimation == null) {
            return;
        }
        playingAnimation = true;
        this.startingAnimation.play();
    },
    reset: function() {
        this.setValues(50, 50, 50);
        this.updateValues();
    }
}