var giphy = "https://api.giphy.com/v1/gifs/";
var search = "search?q=";
var limit = "&limit=12";
var key = "&api_key=pXOW1ZRRl2bjuJKvsBPJu76gitfdt9Dg";
var toggle = false;
var found = false;

var topics = ["the Office", "Friends", "House of Cards", "How I Met Your Mother", "Parks and Rec", "Black Mirror", "Breaking Bad", "Family Guy", "The Simpsons"];

$(document).ready(function () {
    function tabDisplay() {
        $(".tabs").empty();
        for (var i = 0; i < topics.length; i++) {
            var buttonContainer = $("<div>").addClass("gif-tabs");
            var tab = $("<p>").addClass("gif-button").attr("data-name", topics[i]).text(topics[i]);
            buttonContainer.append(tab);
            $(".tabs").append(buttonContainer);
        }
    }
    tabDisplay();

    function onLoadDisplay() {
        var activeElement = $("p[data-name='" + topics[1] + "']");
        tabActive(activeElement);
        ajaxCall(topics[1]);
    }
    onLoadDisplay();

    function gifTab() {
        var button = $(this).attr("data-name");
        tabClear();
        tabActive(this);
        ajaxCall(button);
    }

    function tabClear() {
        $("p").removeClass("active");
        $(".selector").remove();
    }

    function tabActive(element) {
        var rightArrow = $("<div>").addClass("selector");
        $(element).addClass("active");
        $(element).parent().append(rightArrow);
    }

    $(".search-bar").on("submit", function (event) {
        event.preventDefault();
        term = $(".input-bar").val().trim().toLowerCase();
        $(".input-bar").val("");
        var tabSelector = "p[data-name='" + term + "']";
        if (term !== "") {
            ajaxCall(term).then(function () {
                if (found === true) {
                    if (topics.indexOf(term) === -1) {
                        topics.push(term);
                    }
                    tabDisplay();
                    tabActive(tabSelector);
                } else {
                    tabClear();
                }
            });
        }
        return false;
    })

    function ajaxCall(input) {
        $(".gif-area").empty();
        var queryURL = giphy + search + input + limit + key;
        return $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            if (response.data.length !== 0) {
                for (var i = 0; i < response.data.length; i++) {
                    var newGif = $("<div>").addClass("gif");
                    var gifImage = $("<img/>");
                    gifImage.addClass("gif-image").attr({
                        "src": response.data[i].images.fixed_height_still.url,
                        "data-animate": response.data[i].images.fixed_height.url,
                        "data-still": response.data[i].images.fixed_height_still.url,
                        "data-state": "still"
                    });
                    var rating = $("<div>").addClass("rating").text("Rated " + response.data[i].rating);
                    var iconCenter = $("<div>").addClass("icon-center");
                    var playContainer = $("<div>").addClass("play-container");
                    var playIcon = $("<div>").addClass("play-icon");
                    playContainer.append(playIcon);
                    iconCenter.append(playContainer);
                    newGif.append(gifImage).append(rating).append(iconCenter);
                    $(".gif-area").append(newGif);
                }
                found = true;
            }
            else {
                var errorMessage = $("<div>").addClass("error-message");
                var errorTitle = $("<h1>").append("Uh-oh, there's nothing here.");
                var errorSubtitle = $("<p>").append("We're very sorry for the inconvenience. It looks like you're trying to search for GIFs that aren't available. Please select one of the following tabs on the side menu bar or start a new search instead.");
                var goBack = $("<div>").addClass("go-back");
                var homeLink = $("<a>").attr("href", "index.html").append("Go Back");
                goBack.append(homeLink);
                errorMessage.append(errorTitle).append(errorSubtitle).append(goBack);
                $(".gif-area").append(errorMessage);
                found = false;
            }
        })
    }

    $(".tabs").on("click", ".gif-button", gifTab);

    $(".gif-area").on("click", ".gif", function () {
        var thisImage = $(this).children("img");
        if (thisImage.attr("data-state") === "still") {
            thisImage.siblings(".icon-center").hide();
            thisImage.attr({
                "src": thisImage.attr("data-animate"),
                "data-state": "animate"
            });
        } else {
            thisImage.siblings(".icon-center").show();
            thisImage.attr({
                "src": thisImage.attr("data-still"),
                "data-state": "still"
            });
        }
    })

    $(".toggle").on("click", function () {
        if (toggle === false) {
            $(".tabs").addClass("nav-active transition");
            $(".menu").addClass("slide-left transition");
            $(".gif-content").addClass("slide-left transition");
            $("body").css("position", "fixed");
            toggle = true;
        } else {
            $(".tabs").removeClass("nav-active");
            $("div").removeClass("slide-left");
            $("body").removeAttr("style");
            toggle = false;
        }
        navTransition();
        $(window).resize(navTransition);
    })

    function navTransition() {
        if (toggle === true) {
            if (window.matchMedia("(min-width: 661px)").matches) {
                $("div").removeClass("transition");
                $("body").removeAttr("style");
            } else {
                $("body").css("position", "fixed");
            }
        } else {
            if (window.matchMedia("(max-width: 660px)").matches) {
                $(".tabs").addClass("transition");
                $(".menu").addClass("transition");
                $(".gif-content").addClass("transition");
                $("body").removeAttr("style");
            } else {
                $("div").removeClass("transition");
            }
        }
    }
})