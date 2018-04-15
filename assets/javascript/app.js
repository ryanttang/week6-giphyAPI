$(document).ready(function() {
    // Arrays for Search Parameters 
    var search = [];

    // Function with AJAX call to GIPHY
    // Create div to hold results
    function displayShow() {

        var x = $(this).data("search");
        console.log(x);

        var queryURL = " https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=vkt5Yj1aYMqR4ZaWznBK1fNExcPUClGe";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var showDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                showImage.attr("src", staticSrc);
                showImage.addClass("showGiphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#gifArea").prepend(showDiv);

            }
        });
    }

    // Listen for Submit Button, Inputs Search Parameter, Trim, Push to Array and Display Button
    $("#addShow").on("click", function(event) {
        event.preventDefault();
        var newShow = $("#giphyInput").val().trim();
        search.push(newShow);
        console.log(search);
        $("#giphyInput").val('');
        displayButtons();
    });

    // Function to Iterate through Search to Display Button with Array Values
    // Write to HTML
    function displayButtons() {
        $("#newButtons").empty();
        for (var i = 0; i < search.length; i++) {
            var a = $('<button class = "btn btn-primary">');
            a.attr("id", "show");
            a.attr("data-search", search[i]);
            a.text(search[i]);
            $("#newButtons").append(a);
        }
    }

    displayButtons();

    // Listen for Click on "Show"
    $(document).on("click", "#show", displayShow);

    // Click event to execute Gif functions
    $(document).on("click", ".showGiphy". pausePlayGifs);

    // Function to access "data-state"
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});
