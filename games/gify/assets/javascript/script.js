$(document).ready(function(){

var query = ["John Stockton", "Donovan Mitchell", "Volleyball", "Programming"];

// displaygifInfo function re-renders the HTML to display the appropriate content
function displayGifs() {

var gif = $(this).attr("data-name");
console.log(gif);
var offset = parseInt(localStorage.getItem($(this).attr("data-offset")));
console.log(offset);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
gif + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + offset;


$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response) {
    // Array to store results
    var results = response.data;
    $("#gifs-appear-here").empty();
    for (var i = 0; i < results.length; i++) {

    // Filtering by the appropriate rating
    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var gifProperties = $("<img>");

        // Giving the image tag a src attribute from the result item
        gifProperties.attr("class", "gif");
        gifProperties.attr("src", results[i].images.fixed_height_still.url);
        gifProperties.attr("data-still", results[i].images.fixed_height_still.url);
        gifProperties.attr("data-animate", results[i].images.fixed_height.url);
        gifProperties.attr("data-state", "still");

        gifDiv.append(p);
        gifDiv.append(gifProperties);

        $("#gifs-appear-here").prepend(gifDiv);
    }
    }
});        
    offset += 10;
    localStorage.setItem($(this).attr("data-offset"), offset);
}


function renderButtons() {

// Deletes all buttons before adding the new one
$("#buttons-view").empty();

for (var i = 0; i < query.length; i++) {

    var a = $("<button>");

    a.addClass("newGif");
    a.attr("data-name", query[i]);
    a.attr("data-offset", "offset-"+i);
    a.text(query[i]);
    if (localStorage.getItem("offset-" + i) === null) {
    localStorage.setItem("offset-" + i, 0);
    }
    // Adds the button to the buttons-view div
    $("#buttons-view").append(a);
}
}

function pausePlayGifs() {
var state = $(this).attr("data-state");

if (state === "still") {          
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
} else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
}
};

// Add gif click event code
$("#add-gif").on("click", function(event) {
event.preventDefault();

var gifSearch = $("#gif-input").val().trim();
query.push(gifSearch);
$("#gif-input").val("");

// Render new set of buttons
renderButtons();
});

$(document).on("click", ".newGif", displayGifs);
$(document).on("click", ".gif", pausePlayGifs);

renderButtons();

});
