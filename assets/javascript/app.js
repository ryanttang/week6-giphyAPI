$(document).ready(function() {
    // Arrays for Search Parameters 
    var search = [];

    //Function with AJAX call to GIPHY
    // Create div to hold results
    function displayShow() {

        var x = $(this).data("search");
        console.log(x);

        var queryURL = " https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=vkt5Yj1aYMqR4ZaWznBK1fNExcPUClGe&limit=15";

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
