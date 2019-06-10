var gifArr = ["the Office", "Friends", "House of Cards", "White Collar", "Parks and Rec"];
// var limit = userLimit;

function displayGifs() {
    var gifInput = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifInput + "&api_key=pXOW1ZRRl2bjuJKvsBPJu76gitfdt9Dg&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // $(".add-movie").text(JSON.stringify(response));
        console.log(gifInput)
    });
}

function renderButtons() {
    $(".buttonsdiv").empty();
    for (var i = 0; i < gifArr.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("buttonClass btn-primary");
        newButton.attr("data-name", gifArr[i]);
        newButton.text(gifArr[i]);
        $(".buttonsdiv").append(newButton);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif = $(".buttonsdiv").val().trim();
    gifArr.push(gifArr);
    console.log(gifArr);
    renderButtons();
})

renderButtons();

$(document).on("click", ".buttonClass", displayGifs);

