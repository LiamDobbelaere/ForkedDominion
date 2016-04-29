/**
 * Created by Yannis on 1-12-2015.
 */

var active = false;
//var handCards = ["Adventurer", "Bureaucrat", "Cellar", "Chancellor", "Chapel", "Copper", "Council_Room", "Curse", "Duchy", "Estate"];
var handCards = ["Adventurer", "Bureaucrat", "Cellar", "Chancellor", "Chapel", "Copper", "Council_Room"];
var coinsTop = ["Coppertop", "Silvertop", "Goldtop", "Cursetop"];
var StatesTop = ["provinceTop", "dutchyTop", "estateTop"];
var kingdomCards = ["Militia", "Remodel", "Smithy", "Market", "Mine", "Cellar", "Moat", "Village", "Woodcutter", "Workshop"];

var huidigeAfbeelding = 1;
var huidigeAfbeeldingTop = 1;

var loadHandCards = function () {
    $("#hand").empty();

    var degreesPerCard = 90 / (handCards.length - 1);
    var currentDegrees = -45;
    var height;
    var prevheight = 0;
    var previousDegrees = 0;
    var nextDegrees;

    if (handCards.length == 1) {
        currentDegrees = 0;
    }
    else if (handCards.length == 2) {
        degreesPerCard = 45;
        currentDegrees = -22.5;
    }

    //var halfLength = handCards.length / 2;
    var currentCard = 0;

    for (var i = 0; i < handCards.length; i++) {

        if (i >= handCards.length / 2) {
            height = prevheight - (Math.sin(Math.abs(nextDegrees) * (Math.PI / 180)) * 158); //158 is width
        }
        else {
            height = prevheight + Math.sin(Math.abs(previousDegrees) * (Math.PI / 180)) * 158; //158 is width
        }

        var imageSource = "images/" + handCards[i] + ".jpg";
        var html = '<li data-cardname="' + handCards[i] + '" style="background-image: url(' + imageSource + '); ' +
            'transform: rotate(' + currentDegrees + 'deg);' +
            'bottom: ' + height + 'px; left:' + (158 * i) + 'px;">';

        console.log(height);
        $('#hand').append(html);

        previousDegrees = currentDegrees;
        prevheight = height;
        currentDegrees += degreesPerCard;
        nextDegrees = previousDegrees + degreesPerCard;
    }

    /*for (var i = halfLength - 1; i > 0; i--) {
     var height = (halfLength - 1 - i) * 50;
     var imageSource = "images/" + handCards[currentCard] + ".jpg";
     //var html = '<li style="background-image: url(' + imageSource + ');">';
     var html = '<li data-cardname="' + handCards[currentCard] + '" style="background-image: url(' + imageSource + '); ' +
     'transform: rotate(-' + degreesPerCard * i + 'deg);' +
     'margin-bottom: ' + height + 'px;">';
     if (handCards.length % 2 == 0)
     {
     var html = '<li data-cardname="' + handCards[currentCard] + '" style="background-image: url(' + imageSource + '); ' +
     'transform: rotate(-' + degreesPerCard * (i + 1) + 'deg);' +
     'margin-bottom: ' + height + 'px;">';
     }

     $('#hand').append(html);

     console.log("currentCard:" + currentCard);
     console.log("halfLength:" + halfLength);
     currentCard += 1;
     }

     for (var i = 0; i <= halfLength; i++) {
     var height = (halfLength - 1 - i) * 50;
     var imageSource = "images/" + handCards[currentCard] + ".jpg";
     //var html = '<li style="background-image: url(' + imageSource + ');">';
     var html = '<li data-cardname="' + handCards[currentCard] + '" style="background-image: url(' + imageSource + '); ' +
     'transform: rotate(' + degreesPerCard * i + 'deg);' +
     'margin-bottom: ' + height + 'px;">';
     if (handCards.length % 2 == 0)
     {
     var html = '<li data-cardname="' + handCards[currentCard] + '" style="background-image: url(' + imageSource + '); ' +
     'transform: rotate(' + degreesPerCard * (i + 1) + 'deg);' +
     'margin-bottom: ' + height + 'px;">';
     }
     $('#hand').append(html);

     console.log("currentCard:" + currentCard);
     console.log("halfLength:" + halfLength);
     currentCard += 1;
     }*/
};

var redrawHandCards = function () {
    var newCards = [];

    $("#hand li").each(function () {
        console.log($(this));
        newCards.push($(this).attr("data-cardname"));
    });

    handCards = newCards;

    loadHandCards();
};


var toevoegenAfbeeldingenTop = function () {
    for (var i = 0, len = coinsTop.length; i < len; i++) {

        var imgsrc = "images/" + coinsTop[i] + ".png";

        var html = '<li>';
        html += '<figure><img alt="' + coinsTop[i] + '" title="' + coinsTop[i] + '" src="' + imgsrc + '" />';
        /*html += '<figcaption>' + coinsTop[i] + '</figcaption></figure></li>'*/

        $('#coins').append(html);
    }
    $('#coins li:first').show();
};

var toevoegenStatesTop = function () {
    for (var i = 0, len = StatesTop.length; i < len; i++) {

        var imgsrc = "images/" + StatesTop[i] + ".png";

        var html = '<li>';
        html += '<figure><img alt="' + StatesTop[i] + '" title="' + StatesTop[i] + '" src="' + imgsrc + '" />';
        /*html += '<figcaption>' + coinsTop[i] + '</figcaption></figure></li>'*/

        $('#topstates').append(html);
    }
    $('#topstates li:first').show();
};

var toevoegenKingdomCards = function () {

    for (var i = 0, len = kingdomCards.length; i < len; i++) {
        var cardName = kingdomCards[i];

        var html = '<li>';
        html += '<div class="kingdomcard">';
        html += '<div class="kingdomcard-top" style="background-image: url(images/' + cardName + '.jpg);"></div>';
        html += '<div class="kingdomcard-bottom" style="background-image: url(images/' + cardName + '.jpg);"></div>';
        html += '</div>';
        html += '</li>';

        $("#kingdomcards ul").append(html);
    }


};

$(document).ready(function () {
    console.log("De verbinding werkt");
    $('#play').on('click', playGame);
    loadHandCards();
    $('#hand').hide();
    $('#coins').hide();
    $('#topstates').hide();
    $('#cardsComeCenter').hide();
    $("#gamewindow").hide();
    $("#form").hide();
    $('#hand li').on('click', function () {
        $(this).find('img').css('top', '100px');
        //$(this).css('height', '180');

    });

    $("label[for=state_id]").parent().load("assets/fragments/states.html");

    $(".register").on('click', function () {
        $('#menu').hide();
        $("#form").show();

    });

    /*$('#hand li').on('mouseenter', function () {
     $(this).addClass("hoveredcard");
     });

     $('#hand li').on('mouseleave', function () {
     $(this).removeClass("hoveredcard");
     });*/

    $("#hand").sortable({
        revert: true,
        connectWith: "#cardsComeCenter",
        update: function (event, ui) {
            redrawHandCards();
        }
        //axis: "x"
    });

    $('#cardsComeCenter').sortable({
        handle: "none",
        placeholder: false,
        items: "li:not('#cardsComeCenter li')",
        update: function (event, ui) {
            console.log(ui.item);
            ui.item.css("transform", "none");
            ui.item.css("margin-bottom", "0");
            ui.item.css("position", "relative");
            ui.item.css("bottom", "0");
            ui.item.css("left", "0");
        }
        /*placeholder: "placeholder"*/
    });

    /*$('#hand li').draggable({
     revert: true,
     zIndex: 1000,
     revertDuration: 500,
     connectToSortable: "#sortable",
     scroll: false,
     start: function () {
     $(this).addClass("hoveredcard");
     },
     stop: function() {
     $(this).removeClass("hoveredcard");
     }
     });*/
    toevoegenAfbeeldingenTop();
    toevoegenStatesTop();
    toevoegenKingdomCards();
    /*objectDragen();*/
});


$body = $("body");

$(document).on({
    ajaxStart: function () {
        if (active) $body.addClass("loading");
    },
    ajaxStop: function () {
        if (active) setTimeout(stopLoading, 2000);
        active = false;
    }
});

var stopLoading = function () {
    $body.removeClass("loading");
};

var playGame = function (e) {
    $('#coins').show();
    $('#topstates').show();
    $("#gamewindow").show();
    $('#cardsComeCenter').show();
    //$('body').css({background : 'url(images/daszeker.jpg) no-repeat '});
    e.preventDefault();

    /*active = true;*/

    $.ajax({
        url: "index.html",
        method: "GET",
        data: "",
        dataType: "html",
        success: function (data) {
            console.log(data);
        }
    });

    $('#menu').hide();
    $('#hand').show();
    $("div.mastfoot").hide();

    /* var goTo = this.getAttribute("href");

     window.location = goTo;


     setTimeout(function () {
     window.location = goTo;
     }, 3000);*/
};

/*var objectDragen = function(){
 $("#cards li").draggable();

 }
 */

