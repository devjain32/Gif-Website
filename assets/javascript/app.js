var gifArr = ["the Office", "Friends", "House of Cards", "How I Met Your Mother", "Parks and Rec", "Black Mirror", "Breaking Bad", "Family Guy", "The Simpsons"];

function renderButtons() {
    $(".buttonsdiv").empty();
    for (var i = 0; i < gifArr.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("buttonClass btn-primary");
        newButton.attr("data-type", gifArr[i]);
        newButton.text(gifArr[i]);
        $(".buttonsdiv").append(newButton);
    }
}

function displayGifs() {
    var gifInput = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifInput + "&api_key=pXOW1ZRRl2bjuJKvsBPJu76gitfdt9Dg&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".responses").empty();
        console.log(response);
        for (var i = 0; i < 10; i++) {
            var gifUrlAnimate = response.data[i].images.fixed_height_small.url;
            var gifUrlStill = response.data[i].images.fixed_width_still.url;
            var rating = $("<p>");
            var newGif = $("<img>");
            newGif.attr("src", gifUrlStill);
            newGif.attr("data-still", gifUrlStill);
            newGif.attr("data-animate", gifUrlAnimate);
            newGif.attr("data-state", "still");
            newGif.attr("class", "gifStatus");
            rating.text(response.data[i].rating);
            $(".responses").append(rating);
            $(".responses").append(newGif);
            $(".responses").append("<hr>");
            console.log(newGif);
        }

    });
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var typeBtn = $("#gif-input").val().trim();
    gifArr.push(typeBtn);
    console.log(gifArr);
    renderButtons();
})

renderButtons();

$(document).on("click", ".buttonClass", displayGifs);

$(".responses").on("click", ".gifStatus", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("in if statement");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log("in else statement");
    }
});