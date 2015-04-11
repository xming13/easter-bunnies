var XMing = XMing || {};

XMing.GameStateManager = new function() {

    var gameState;
    var userData;
    var numClick = 0;

    var imageObjectList = [{
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
    }];
    var cardHtmlTemplate = '<li class="flip-container" data-number="$dataNumber">' + '<div class="flipper">' + '<div class="front">' + '<img src="images/back.png"/>' + '</div>' + '<div class="back">' + '<img src="images/$imgName" />' + '</div>' + '</div>' + '</li>';
    var isAnimating = false;

    var VERSION_NUMBER = 1;
    var GAME_STATE_ENUM = {
        INITIAL: "initial",
        START: "start",
        END: "end"
    };

    this.initGame = function() {
        var self = this;
        gameState = GAME_STATE_ENUM.INITIAL;

        FastClick.attach(document.body);

        this.preloadImage();

        userData = this.loadData();

        swal.setDefaults({
            confirmButtonColor: '#3BD9F5'
        });

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

        this.checkPlayedEasterEgg();
    };
    this.startGame = function() {
        var self = this;
        gameState = GAME_STATE_ENUM.START;

        $(".panel-main").hide();
        $(".panel-game").show();

        numClick = 0;

        var cardContainer = $(".card-list");
        cardContainer.html("");

        _.each(_.shuffle(imageObjectList), function(imgObj) {
            cardContainer.append(cardHtmlTemplate.replace("$dataNumber", imgObj.dataNumber).replace("$imgName", imgObj.imgName));
        });

        $(".card-list li").click(function() {
            self.clickCard(this);
        });

        $('html, body').animate({
            scrollTop: $("#panel-container").offset().top
        }, 'fast');
    };

    this.preloadImage = function() {
        var image = new Image();
        image.src = 'images/back.png';
        _.each(imageObjectList, function(imageObj) {
            image = new Image();
            image.src = 'images/' + imageObj.imgName;
        });

        var imgLove = new Image();
        imgLove.src = "images/love.png";
    };
    this.clickCard = function(card) {
        var self = this;

        var cardOpened = $(".card-list li.open")[0];
        var cardClicked = $(card)[0];

        var $cardOpened = $(cardOpened);
        var $cardClicked = $(cardClicked);

        if (!$cardClicked.hasClass("reveal") && !isAnimating) {
            if ($(".card-list li").length == $(".card-list li.reveal").length) {
                this.showGameFinish();
            }

            if (cardOpened) {
                if (cardOpened != cardClicked) {
                    numClick++;
                    if ($cardOpened.data("number") == $cardClicked.data("number")) {
                        this.flipCard($cardClicked);
                        $cardOpened.removeClass('open').addClass('reveal');
                        $($cardOpened.find('.back')[0]).css('border', '5px solid #00ffff');
                        $cardClicked.removeClass('open').addClass('reveal');
                        $($cardClicked.find('.back')[0]).css('border', '5px solid #00ffff');

                        if ($(".card-list li").length == $(".card-list li.reveal").length) {
                            this.showGameFinish();
                        }
                    } else {
                        this.flipCard($cardClicked);
                        $cardClicked.addClass('open');
                        isAnimating = true;
                        setTimeout(function() {
                            self.flipCard($cardClicked);
                            self.flipCard($cardOpened);
                            $cardClicked.removeClass('open');
                            $cardOpened.removeClass('open');
                            isAnimating = false;
                        }, 500);
                    }
                }
            } else {
                numClick++;
                this.flipCard($cardClicked);
                $cardClicked.addClass('open');
            }
        }
    };
    this.flipCard = function(card) {
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
    };
    this.showGameFinish = function() {
        var self = this;
        gameState = GAME_STATE_ENUM.END;
        swal({
            title: "Well Done!",
            text: "You took " + numClick + " clicks to match all the bunnies and eggs!",
            imageUrl: "images/base-bunny.png",
            closeOnConfirm: false
        }, function() {
            var postingInProgress = false;
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
                }
                if (postingInProgress) {
                    return false;
                } else {
                    postingInProgress = true;
                    $.ajax({
                        method: "POST",
                        url: 'http://weiseng.redairship.com/leaderboard/api/1/highscore.json',
                        contentType: "application/json",
                        data: JSON.stringify({
                            game_id: 2,
                            username: playerName,
                            score: numClick
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

        if (!userData.played.bunny) {
            userData.played.bunny = true;
            this.saveData(userData);
        }
    };
    this.showLeaderboard = function() {
        $(".panel-main").hide();
        $(".panel-leaderboard").show();
        $(".loader").show();

        $(".highscore-list").html("");

        if (!userData.leaderboard.bunny) {
            userData.leaderboard.bunny = true;
            this.saveData(userData);
            this.checkLeaderboardEasterEgg();
        }

        $.get("http://weiseng.redairship.com/leaderboard/api/1/highscore.json?game_id=2", function(data) {
            $(".loader").fadeOut(700);

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
    };

    // Easter Egg
    this.checkPlayedEasterEgg = function() {
        if (!userData.easterEgg.allGames) {
            if (_.every(userData.played)) {
                userData.easterEgg.allGames = true;
                this.saveData(userData);
                swal({
                    title: 'Congratulations!',
                    text: 'You have found the Blue Egg!',
                    imageUrl: 'images/blue-egg.png'
                });
            }
        }
    };
    this.checkLeaderboardEasterEgg = function() {
        if (!userData.easterEgg.allLeaderboard) {
            if (_.every(userData.leaderboard)) {
                userData.easterEgg.allLeaderboard = true;
                this.saveData(userData);
                swal({
                    title: 'Congratulations!',
                    text: 'You have found the Ninja Egg!',
                    imageUrl: 'images/ninja-egg.png'
                });
            }
        }
    };

    // Local storage
    this.saveData = function(userData) {
        if (window.localStorage) {
            window.localStorage.setItem('data', btoa(encodeURIComponent(JSON.stringify(userData))));
        }
    };
    this.loadData = function() {
        if (window.localStorage) {
            var data = window.localStorage.getItem('data');
            if (data) {
                var parsedData = JSON.parse(decodeURIComponent(atob(data)));
                // make sure version is the same
                if (parsedData.version === VERSION_NUMBER) {
                    return parsedData;
                }
            }
        }
        var data = {
            played: {
                bunny: false,
                specialOne: false,
                mushrooms: false,
                word: false,
                numbers: false,
                squirrel: false
            },
            leaderboard: {
                bunny: false,
                specialOne: false,
                mushrooms: false,
                word: false,
                numbers: false,
                squirrel: false
            },
            squirrel: {
                level: 0,
                inHallOfFame: false
            },
            easterEgg: {
                allGames: false,
                allLeaderboard: false,
                word: false,
                numbers: false,
                specialOne: false,
                mushrooms: false,
                squirrel: false
            },
            collectAll: false,
            version: VERSION_NUMBER
        };

        this.saveData(data);

        return data;
    };
};

$(function() {
    XMing.GameStateManager.initGame();
});
