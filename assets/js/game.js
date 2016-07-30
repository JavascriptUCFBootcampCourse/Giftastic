// Variables
var giphyUrl = 'http://api.giphy.com/v1/gifs/search?q={search}&api_key=dc6zaTOxFJmzC&limit=10' // Limit gifs that are pulled by button to 10

// Need to create array for animal selection
var animals = ['bear', 'cat'];

// var url = giphyUrl.replace('{search}', term);

// AJAX function that will call the API needed to pull objects
var giphyAPI = function(search) { 
	$.get(giphyUrl.replace('{search}', search), function (response) {
		var count = 0;
		var gifs = response.data.map(function (val) {
			var imageInfo = {
				rating: val.rating,
				stillUrl: val.images.fixed_height_still.url,
				animatedUrl: val.images.fixed_height.url
			};

			count++;
			return imageInfo;
		});

		// Show gifs in the HTML.
		$('#animals').html(null);

		for (var i=0; i < gifs.length; i++) {
			var current = gifs[i];

			var div = $('<div>')
			var heading = $('<h5>');

			// Rating of gif must be displayed above the 10 gifs that are pulled
			heading.html(current.rating);

			var image = $('<img>')
				.attr("id","animalimg" + i)
				.attr("src", current.stillUrl)
				.attr("data-still-src", current.stillUrl)
				.attr("data-animated-src", current.animatedUrl);

			div.append(heading).append(image);

			// When users click on button, gifs should populate under the div with the id="animals"
			$('#animals').append(div);



			// User can click on a gif, the expected action is to either freeze or play the gif (data-still)

			image.click(function () {
				var swapUrl = $(this).attr('src') == $(this).attr('data-still-src') ? $(this).attr('data-animated-src') : $(this).attr('data-still-src');
				$(this).attr('src', swapUrl);
			});
		}

	});
}



// Create animal buttons that will pull gify for animal, this should populate under the div with the id="animalButtons"


var addButton = function (name, value) {	
	var animalButton = $('<button>')
	.attr("id",name)
	.attr("data-search", value)
	.attr("class","fire 	btn btn-primary");

	animalButton.html(value);

	$('#animalButtons').append(animalButton);

	$('button').on('click', function() {
		var element = $(this);

		giphyAPI(element.attr('data-search'));
	});
};

// If animal is not on list, user can write in a new animal, which will then turn into a button
	
	// Need to populate new button into animal array, this will happen when a user clicks the submit button

$('#addAnimal').click(function () {
	addButton('animal-' + $('#animal-input').val(), $('#animal-input').val());
})

for (var i=0; i < animals.length; i++) {
	addButton("animals-" + i, animals[i]);
}
	