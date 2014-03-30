var GameManager = GameManager || {};

GameManager = {
    ImageObjectList: [
        { imgName: "bunny.png", dataNumber: 1 },
        { imgName: "egg.png", dataNumber: 1 },
        { imgName: "bell1.png", dataNumber: 2 },
        { imgName: "bell1.png", dataNumber: 2 },
        { imgName: "bell2.png", dataNumber: 3 },
        { imgName: "bell2.png", dataNumber: 3 },
        { imgName: "bell3.png", dataNumber: 4 },
        { imgName: "bell3.png", dataNumber: 4 },
        { imgName: "christmastree.png", dataNumber: 5 },
        { imgName: "christmastree.png", dataNumber: 5 },
        { imgName: "christmastree1.png", dataNumber: 6 },
        { imgName: "christmastree1.png", dataNumber: 6 },
        { imgName: "christmastree2.png", dataNumber: 7 },
        { imgName: "christmastree2.png", dataNumber: 7 },
        { imgName: "gingerbread.png", dataNumber: 8 },
        { imgName: "gingerbread.png", dataNumber: 8 },
        { imgName: "gingerbread1.png", dataNumber: 9 },
        { imgName: "gingerbread1.png", dataNumber: 9 },
        { imgName: "gingerbread2.png", dataNumber: 10 },
        { imgName: "gingerbread2.png", dataNumber: 10 },
        { imgName: "gingerbread3.png", dataNumber: 11 },
        { imgName: "gingerbread3.png", dataNumber: 11 },
        { imgName: "santahat.png", dataNumber: 12 },
        { imgName: "santahat.png", dataNumber: 12 },
        { imgName: "santahat1.png", dataNumber: 13 },
        { imgName: "santahat1.png", dataNumber: 13 },
        { imgName: "yellowstar.png", dataNumber: 14 },
        { imgName: "yellowstar.png", dataNumber: 14 },
        { imgName: "pattern1.jpg", dataNumber: 15 },
        { imgName: "pattern1.jpg", dataNumber: 15 },
        { imgName: "pattern2.jpg", dataNumber: 16 },
        { imgName: "pattern2.jpg", dataNumber: 16 },
        { imgName: "pattern3.jpg", dataNumber: 17 },
        { imgName: "pattern3.jpg", dataNumber: 17 },
        { imgName: "pattern4.jpg", dataNumber: 18 },
        { imgName: "pattern4.jpg", dataNumber: 18 },
        { imgName: "pattern5.jpg", dataNumber: 19 },
        { imgName: "pattern5.jpg", dataNumber: 19 },
        { imgName: "pattern6.jpg", dataNumber: 20 },
        { imgName: "pattern6.jpg", dataNumber: 20 },
        { imgName: "pattern7.jpg", dataNumber: 21 },
        { imgName: "pattern7.jpg", dataNumber: 21 },
        { imgName: "pattern8.jpg", dataNumber: 22 },
        { imgName: "pattern8.jpg", dataNumber: 22 },
        { imgName: "pattern9.jpg", dataNumber: 23 },
        { imgName: "pattern9.jpg", dataNumber: 23 },
        { imgName: "pattern10.jpg", dataNumber: 24 },
        { imgName: "pattern10.jpg", dataNumber: 24 }
    ],
    CardHtmlTemplate:
        '<li class="flip-container" data-number="$dataNumber">' +
        '   <div class="flipper">' +
        '       <div class="front">' +
        '           <img src="images/back.png"/>' +
        '       </div>' +
        '       <div class="back">' +
        '           <img src="images/$imgName" />' +
        '       </div>' +
        '   </div>' +
        '</li>',
    IsAnimating: false,
    GameStateEnum: {
      GAME_NOT_STARTED: 0,
      GAME_IN_PROGRESS: 1,
      GAME_IS_FINISHED: 2
    },
    GameState: 0,
    Init: function() {
        $(".panel-main").hide();
        $(".panel-game").show();
        var imgObjList = this.ImageObjectList.shuffle();
        var cardContainer = $("ul.cbp-rfgrid");
        for (var i = 0; i < imgObjList.length; i++) {
            var imgObj = imgObjList[i];
            cardContainer.append(this.CardHtmlTemplate.replace("$dataNumber", imgObj.dataNumber).replace("$imgName", imgObj.imgName));
        }

        $("ul.cbp-rfgrid li").click(function () {
            GameManager.ClickCard(this);
        });
    },
    ClickCard: function(card) {
        var cardOpened = $(".cbp-rfgrid li.open")[0];
        var cardClicked = $(card)[0];

        var $cardOpened = $(cardOpened);
        var $cardClicked = $(cardClicked);

        if (!$cardClicked.hasClass("reveal") && !this.IsAnimating) {
            this.UpdateGameState();
            if (cardOpened) {
                if (cardOpened == cardClicked) {

                }
                else {
                    if ($cardOpened.data("number") == $cardClicked.data("number")) {
                        this.FlipCard($cardClicked);
                        $cardOpened.removeClass('open').addClass('reveal');
                        $cardClicked.removeClass('open').addClass('reveal');
                        this.UpdateGameState();
                    }
                    else {
                        this.FlipCard($cardClicked);
                        $cardClicked.addClass('open');
                        this.IsAnimating = true;
                        setTimeout(function () {
                            GameManager.FlipCard($cardClicked);
                            GameManager.FlipCard($cardOpened);
                            $cardClicked.removeClass('open');
                            $cardOpened.removeClass('open');
                            GameManager.IsAnimating = false;
                        }, 500);
                    }
                }
            }
            else {
                this.FlipCard($cardClicked);
                $cardClicked.addClass('open');
            }
        }
    },
    FlipCard: function(card) {
        var cardSideShow, cardSideHide;

        if ($(card).hasClass('open')) {
            cardSideShow = $(card).find('.front')[0];
            cardSideHide = $(card).find('.back')[0];
        }
        else {
            cardSideShow = $(card).find('.back')[0];
            cardSideHide = $(card).find('.front')[0];
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
        if (this.GameState == this.GameStateEnum.GAME_NOT_STARTED) {
            this.GameState = this.GameStateEnum.GAME_IN_PROGRESS;
        }
        if  ($(".cbp-rfgrid li").length == $(".cbp-rfgrid li.reveal").length) {
            this.GameState = this.GameStateEnum.GAME_IS_FINISHED;
            this.ShowGameFinish();
        }
    },
    ShowGameFinish: function() {
        console.log("Game Over!");
    }
};

Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * ( i + 1 ));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

$(document).ready(function () {
    $(".btn-play").click(function() {
        GameManager.Init();
    });
});

