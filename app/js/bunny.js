var XMing = XMing || {};

XMing.GameStateManager = {
    imageObjectList: [{
        imgName: "white-bunny.png",
        dataNumber: 1
    }, {
        imgName: "white-egg.png",
        dataNumber: 1
    }, {
        imgName: "red-bunny.png",
        dataNumber: 2
    }, {
        imgName: "red-egg.png",
        dataNumber: 2
    }, {
        imgName: "orange-bunny.png",
        dataNumber: 3
    }, {
        imgName: "orange-egg.png",
        dataNumber: 3
    }, {
        imgName: "yellow-bunny.png",
        dataNumber: 4
    }, {
        imgName: "yellow-egg.png",
        dataNumber: 4
    }, {
        imgName: "green-bunny.png",
        dataNumber: 5
    }, {
        imgName: "green-egg.png",
        dataNumber: 5
    }, {
        imgName: "blue-bunny.png",
        dataNumber: 6
    }, {
        imgName: "blue-egg.png",
        dataNumber: 6
    }, {
        imgName: "indigo-bunny.png",
        dataNumber: 7
    }, {
        imgName: "indigo-egg.png",
        dataNumber: 7
    }, {
        imgName: "violet-bunny.png",
        dataNumber: 8
    }, {
        imgName: "violet-egg.png",
        dataNumber: 8
    }, {
        imgName: "angel-bunny.png",
        dataNumber: 9
    }, {
        imgName: "angel-egg.png",
        dataNumber: 9
    }, {
        imgName: "pirate-bunny.png",
        dataNumber: 10
    }, {
        imgName: "pirate-egg.png",
        dataNumber: 10
    }, {
        imgName: "rainbow-bunny.png",
        dataNumber: 11
    }, {
        imgName: "rainbow-egg.png",
        dataNumber: 11
    }, {
        imgName: "ninja-bunny.png",
        dataNumber: 12
    }, {
        imgName: "ninja-egg.png",
        dataNumber: 12
    }],
    cardHtmlTemplate: '<li class="flip-container" data-number="$dataNumber">' + '<div class="flipper">' + '<div class="front">' + '<img src="images/back.png"/>' + '</div>' + '<div class="back">' + '<img src="images/$imgName" />' + '</div>' + '</div>' + '</li>',
    isAnimating: false,
    gameStateEnum: {
        GAME_NOT_STARTED: 0,
        GAME_IN_PROGRESS: 1,
        GAME_IS_FINISHED: 2
    },
    gameState: 0,
    numClick: 0,
    init: function() {
        var self = this;
        FastClick.attach(document.body);

        $(".btn-play").click(function() {
            self.startGame();
        });

        $(".btn-leaderboard").click(function() {
            self.showLeaderboard();
        });

        $(".icon-back").click(function() {
            $(".panel-leaderboard").hide();
            $(".panel-main").show();
        });

        // preload images
        var image = new Image();
        image.src = 'images/back.png';
        _.each(this.imageObjectList, function(imageObj) {
            image = new Image();
            image.src = 'images/' + imageObj.imgName;
        });
    },
    startGame: function() {
        var self = this;

        $(".panel-main").hide();
        $(".panel-game").show();

        this.numClick = 0;

        var cardContainer = $(".card-list");
        cardContainer.html("");

        _.each(_.shuffle(this.imageObjectList), function(imgObj) {
            cardContainer.append(self.cardHtmlTemplate.replace("$dataNumber", imgObj.dataNumber).replace("$imgName", imgObj.imgName));
        });

        $(".card-list li").click(function() {
            self.clickCard(this);
        });

        $('html, body').animate({
            scrollTop: $("#panel-container").offset().top
        }, 'fast');
    },
    clickCard: function(card) {
        var self = this;

        var cardOpened = $(".card-list li.open")[0];
        var cardClicked = $(card)[0];

        var $cardOpened = $(cardOpened);
        var $cardClicked = $(cardClicked);

        if (!$cardClicked.hasClass("reveal") && !this.isAnimating) {
            this.updateGameState();
            if (cardOpened) {
                if (cardOpened != cardClicked) {
                    this.numClick++;
                    if ($cardOpened.data("number") == $cardClicked.data("number")) {
                        this.flipCard($cardClicked);
                        $cardOpened.removeClass('open').addClass('reveal');
                        $($cardOpened.find('.back')[0]).css('border', '5px solid #00ffff');
                        $cardClicked.removeClass('open').addClass('reveal');
                        $($cardClicked.find('.back')[0]).css('border', '5px solid #00ffff');
                        this.updateGameState();
                    } else {
                        this.flipCard($cardClicked);
                        $cardClicked.addClass('open');
                        this.isAnimating = true;
                        setTimeout(function() {
                            self.flipCard($cardClicked);
                            self.flipCard($cardOpened);
                            $cardClicked.removeClass('open');
                            $cardOpened.removeClass('open');
                            self.isAnimating = false;
                        }, 500);
                    }
                }
            } else {
                this.numClick++;
                this.flipCard($cardClicked);
                $cardClicked.addClass('open');
            }
        }
    },
    flipCard: function(card) {
        var cardSideShow, cardSideHide;

        if ($(card).hasClass('open')) {
            cardSideShow = $(card).find('.front')[0];
            cardSideHide = $(card).find('.back')[0];
        } else {
            cardSideShow = $(card).find('.back')[0];
            cardSideHide = $(card).find('.front')[0];
            $(cardSideShow).css('border', '5px solid #0099cc');
        }

        $(cardSideShow).css({
            "-webkit-transform": "rotateY(0deg) 0.5s",
            "-moz-transform": "rotateY(0deg) 0.5s",
            "-o-transform": "rotateY(0deg) 0.5s",
            "-ms-transform": "rotateY(0deg) 0.5s",
            "transform": "rotateY(0deg) 0.5s"
        });

        $(cardSideHide).css({
            "-webkit-transform": "rotateY(180deg) 0.5s",
            "-moz-transform": "rotateY(180deg) 0.5s",
            "-o-transform": "rotateY(180deg) 0.5s",
            "-ms-transform": "rotateY(180deg) 0.5s",
            "transform": "rotateY(180deg) 0.5s"
        });
    },
    updateGameState: function() {
        if (this.gameState == this.gameStateEnum.GAME_NOT_STARTED) {
            this.gameState = this.gameStateEnum.GAME_IN_PROGRESS;
        }
        if ($(".card-list li").length == $(".card-list li.reveal").length) {
            this.gameState = this.gameStateEnum.GAME_IS_FINISHED;
            this.showGameFinish();
        }
    },
    showGameFinish: function() {
        var self = this;
        swal({
            title: "Well Done!",
            text: "You took " + self.numClick + " clicks to match all the bunnies and eggs!",
            imageUrl: "images/base-bunny.png",
            closeOnConfirm: false
        }, function() {
            swal({
                title: "Thanks for playing!!!",
                imageUrl: "images/love.png",
                type: "input",
                text: "Write your name here! It will appear in the leaderboard!",
                closeOnConfirm: false
            }, function(playerName) {
                if (playerName == "") {
                    swal.showInputError("You need to write something! A nickname is fine too!");
                    return false;
                } else {
                    $.ajax({
                        method: "POST",
                        url: 'http://weiseng.redairship.com/leaderboard/api/1/highscore.json',
                        contentType: "application/json",
                        data: JSON.stringify({
                            game_id: 2,
                            username: playerName,
                            score: self.numClick
                        })
                    }).success(function(data) {
                        swal({
                            title: "Congratulations!",
                            text: "You are currently ranked " + data.rank_text + "!",
                            type: "success",
                            showCancelButton: true,
                            confirmButtonText: "Play again",
                            cancelButtonText: "Back to home"
                        }, function(isConfirm) {
                            if (isConfirm) {
                                self.startGame();
                            } else {
                                $(".panel-game").hide();
                                $(".panel-main").show();
                            }
                        });
                    }).fail(function() {
                        swal("Oops...", "Something went wrong!", "error");
                    });
                }
            });
        });
    },
    showLeaderboard: function() {
        $(".panel-main").hide();
        $(".panel-leaderboard").show();

        $(".highscore-list").html("");

        $.get("http://weiseng.redairship.com/leaderboard/api/1/highscore.json?game_id=2", function(data) {
            var numDummyData = 10 - data.length;
            for (var i = 0; i < numDummyData; i++) {
                data.push({
                    username: '----------',
                    score: '--'
                });
            }

            _.each(data, function(highscore, index) {
                setTimeout(function() {
                    $(".highscore-list").append('<li class="animated slideInUp">' + (index + 1) + ': ' + highscore.username + ' - ' + highscore.score + '</li>');
                }, index * 200);
            });
        }).fail(function() {
            swal("Oops...", "Something went wrong!", "error");
        });
    }
};

$(function() {
    XMing.GameStateManager.init();
});
