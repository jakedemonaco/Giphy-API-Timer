$(document).ready(function() {		
	console.log("Page Loaded");

	var searchArray = [
	"Dog","Cat","Bird"
	];

	// function to make buttons and add to page
	function populateButtons(searchArray,classToAdd,areaToAddTo){
		$(areaToAddTo).empty();
		
		for(var i = 0; i < searchArray.length; i++) {
			var a = $("<button>");
			a.addClass(classToAdd);
			a.attr("data-type",searchArray[i]);
			a.text(searchArray[i]);
			$(areaToAddTo).append(a);
		}
	}

$(document).on("click", ".searchButton", function() {
	$("#searches").empty();
	$(".searchButton").removeClass("active");
	$(this).addClass("active");
	
	var type = $(this).attr("data-type");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) { 
		var results = response.data;
			
		for (var i = 0; i < results.length; i++) {
				var searchDiv = $("<div class=\"search-item\">");
				
				var rating = results[i].rating;

				var p = $("<p>").text("Rating: "+rating);

				var animated = results[i].images.fixed_height.url;
				var still = results[i].images.fixed_height_still.url;
				
				var image = $("<img>");
				image.attr("src", still);
				image.attr("data-still", still);
				image.attr("data-animate", animated);
				image.attr("data-state", "still");
				image.addClass("searchImage");
				
				searchDiv.append(p);
				searchDiv.append(image);
				$("#searches").append(searchDiv);
		}
	});
});

$(document).on("click", ".searchImage", function() {
	
	var state = $(this).attr("data-state");

	if(state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} 
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

$("#add-input").on("click", function(event) {
	//so the page doesn't reload on the search click
	event.preventDefault();
	//eq(0) assures that the first input type is selcted from our div, if we didn't put that there it may select the submit button because that is the second input type we put in the html div. We do not want that.
	var newSearch = $("input").eq(0).val();

	if (newSearch.length > 2) {
		searchArray.push(newSearch);
	}
	
	populateButtons(searchArray, "searchButton","#buttonsArea");
});

populateButtons(searchArray, "searchButton", "#buttonsArea");


//TIMER!
//I'm honestly so proud of my colors you all have no idea
var color = ["blue", "red", "yellow", "orange", "green", "purple", "pink"];

function colorChange() {
		$(".searchButton, #add-input").css("background-color", color[Math.floor(Math.random()*color.length)]);
		console.log("Counting to 60!");
	}

var timer = setInterval(colorChange, 1000);
setTimeout(function( ) { clearInterval( timer ); }, 60000);

});