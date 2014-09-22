



var GameManager = GameManager || {};

GameManager = {
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
        // preload images
        var image = new Image();
        image.src = 'images/back.png';
        for (var i = 0; i < this.imageObjectList.length; i++) {
            image = new Image();
            image.src = 'images/' + this.imageObjectList[i].imgName;
        }
    },
    startGame: function() {
        $(".panel-main").hide();
        $(".panel-game").show();
        $('html, body').animate({
            scrollTop: $("#panel-container").offset().top
        }, 'fast');

        this.numClick = 0;

        var imgObjList = this.imageObjectList.shuffle();
        var cardContainer = $("ul.cbp-rfgrid");
        cardContainer.html("");
        for (var i = 0; i < imgObjList.length; i++) {
            var imgObj = imgObjList[i];
            cardContainer.append(
                this.cardHtmlTemplate
                    .replace("$dataNumber", imgObj.dataNumber)
                    .replace("$imgName", imgObj.imgName)
            );
        }

        $("ul.cbp-rfgrid li").click(function() {
            GameManager.clickCard(this);
        });
    },
    clickCard: function(card) {
        var cardOpened = $(".cbp-rfgrid li.open")[0];
        var cardClicked = $(card)[0];

        var $cardOpened = $(cardOpened);
        var $cardClicked = $(cardClicked);

        if (!$cardClicked.hasClass("reveal") && !this.isAnimating) {
            this.UpdateGameState();
            if (cardOpened) {
                if (cardOpened == cardClicked) {
                    // do nothing
                } else {
                    this.numClick++;
                    if ($cardOpened.data("number") == $cardClicked.data("number")) {
                        this.flipCard($cardClicked);
                        $cardOpened.removeClass('open').addClass('reveal');
                        $($cardOpened.find('.back')[0]).css('border', '5px solid #00ffff');
                        $cardClicked.removeClass('open').addClass('reveal');
                        $($cardClicked.find('.back')[0]).css('border', '5px solid #00ffff');
                        this.UpdateGameState();
                    } else {
                        this.flipCard($cardClicked);
                        $cardClicked.addClass('open');
                        this.isAnimating = true;
                        setTimeout(function() {
                            GameManager.flipCard($cardClicked);
                            GameManager.flipCard($cardOpened);
                            $cardClicked.removeClass('open');
                            $cardOpened.removeClass('open');
                            GameManager.isAnimating = false;
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
    UpdateGameState: function() {
        if (this.gameState == this.gameStateEnum.GAME_NOT_STARTED) {
            this.gameState = this.gameStateEnum.GAME_IN_PROGRESS;
        }
        if ($(".cbp-rfgrid li").length == $(".cbp-rfgrid li.reveal").length) {
            this.gameState = this.gameStateEnum.GAME_IS_FINISHED;
            this.showGameFinish();
        }
    },
    showGameFinish: function() {
        var replay = confirm('Congratulations!\r\rYou took ' + this.numClick + ' clicks to match all the bunnies and eggs!\r\rPlay again?');
        if (replay) {
            this.startGame();
        }
    }
};

Array.prototype.shuffle = function() {
    var i = this.length,
        j, temp;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

$(document).ready(function() {
    GameManager.init();
    $(".btn-play").click(function() {
        GameManager.startGame();
    });
});