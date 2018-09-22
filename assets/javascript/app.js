$(document).ready(function() {

    var movies = ["Frozen","The Jungle Book","Zootopia","Incredibles","Avengers","Ant-man","Matrix","Coco","Moana","Durassic World","Fantastic Beasts","Black Panther","Infinity Wars"]

    function makeButtons() {

        for(var i = 0; i < movies.length; i++) {
            var button = $('<button type="button" class="btn btn-info">');
            button.attr("value", movies[i]);
            button.attr("id", "movies");
            button.text(movies[i]);
            $(".row1").append(button);

        }
    }


    makeButtons();

    $(".container").on("click", "#addButton", function() {
        console.log(movies);
        movies.push($("#userinput").val().trim());
        console.log(movies);
        var button = $('<button type="button" class="btn btn-info">');
        button.attr("id", "movies");
        button.attr("value", $("#userinput").val().trim())
        button.text($("#userinput").val().trim());
        $(".row1").append(button);
    })

    $(".row1").on("click", "#movies", function() {

        $(".display").empty();
        var usrinput = $(this).val();
        console.log($(this).val());

        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=xH6mytOXPs2ScnXjYI21i2yARglT4P2t&q=" + usrinput + "&limit=10"
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
        .then(function(response) {
            
            for(var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].images.original_still.url);
                var image = $("<img>");
                image.addClass("pics");
                image.attr("data-state", "still");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                var imageDiv = $("<div>");
                imageDiv.addClass("imageDiv");
                imageDiv.append("<p>" + response.data[i].rating + "</p>");
                imageDiv.append(image);
                $(".display").append(imageDiv);
            }
        })
    })

    $(".display").on("click", ".pics", function() {
        var state = $(this).attr("data-state");
        if(state === "still") {
            // change data-state from still to animate
            $(this).attr("data-state", "animate");
            // change src to data-animate link
            $(this).attr("src", $(this).attr("data-animate"));
        }
        else if (state === "animate") {
            // change data-state from animate to still
            $(this).attr("data-state", "still");
            // change src to data-still link
            $(this).attr("src", $(this).attr("data-still"));
        }
    })


})