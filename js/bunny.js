$(document).ready(function () {

    var cardHtmlTemplate = '<li class="flip-container" data-number="$dataNumber">';
    cardHtmlTemplate += '       <div class="flipper">';
    cardHtmlTemplate += '       <div class="front">';
    cardHtmlTemplate += '           <img src="images/cat.jpg"/>';
    cardHtmlTemplate += '        </div>';
    cardHtmlTemplate += '        <div class="back">';
    cardHtmlTemplate += '            <img src="images/$imgName" />';
    cardHtmlTemplate += '        </div>';
    cardHtmlTemplate += '    </div>';
    cardHtmlTemplate += '</li>';

    var imgObjList = [
        { imgName: "bell.png", dataNumber: 1 },
        { imgName: "bell.png", dataNumber: 1 },
        { imgName: "bell1.png", dataNumber: 2 },
        { imgName: "bell1.png", dataNumber: 2 },
        { imgName: "bell2.png", dataNumber: 3 },
        { imgName: "bell2.png", dataNumber: 4 },
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
    ];
    imgObjList.shuffle();

    var cardContainer = $("ul.cbp-rfgrid");
    for (var i = 0; i < imgObjList.length; i++) {
        var imgObj = imgObjList[i];
        cardContainer.append(cardHtmlTemplate.replace("$dataNumber", imgObj.dataNumber).replace("$imgName", imgObj.imgName));
    }

    var waitingAnimation = false;
    $(".cbp-rfgrid li").click(function () {

        var cardOpened = $(".cbp-rfgrid li.open")[0];
        var cardClicked = $(this)[0];

        var $cardOpened = $(cardOpened);
        var $cardClicked = $(cardClicked);

        if (!$cardClicked.hasClass("reveal") && !waitingAnimation) {
            if (cardOpened) {
                if (cardOpened == cardClicked) {

                }
                else {
                    if ($cardOpened.data("number") == $cardClicked.data("number")) {
                        flipCard($cardClicked);
                        $cardOpened.removeClass('open').addClass('reveal');
                        $cardClicked.removeClass('open').addClass('reveal');
                    }
                    else {
                        flipCard($cardClicked);
                        $cardClicked.addClass('open');
                        waitingAnimation = true;
                        setTimeout(function () {
                            flipCard($cardClicked);
                            flipCard($cardOpened);
                            $cardClicked.removeClass('open');
                            $cardOpened.removeClass('open');
                            waitingAnimation = false;
                        }, 500);
                    }
                }
            }
            else {
                flipCard($cardClicked);
                $cardClicked.addClass('open');
            }
        }
    });

    function flipCard(card) {
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
    }
});

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
