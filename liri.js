require("dotenv").config();
var fs = require("fs");

//add code required to import keys.js file and store it in a variable
var keys = require("./keys.js");

//require apis
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

//Spotify access keys
var spotify = new Spotify({
	id: keys.spotify.id,
	secret: keys.spotify.secret
});

//Twitter access keys
var client = new Twitter({
	consumer_key: keys.twitter.consumer_key,
	consumer_secret: keys.twitter.consumer_secret,
	access_token_key: keys.twitter.access_token_key,
	access_token_secret: keys.twitter.access_token_secret
});

//print last 20 tweets
if (process.argv[2] == "my-tweets") {
var params = {screen_name: 'RavinaDolfell', count: 20};

client.get("statuses/user_timeline", params, function(error, tweet, response) {

	if(error) throw error;
	for (var i = 0; i < tweet.length; i++) {
		console.log(tweet[i].created_at + "\n" + tweet[i].text + "\n");
	}
});
}

//print information regarding inputted song title
if (process.argv[2] == "spotify-this-song") {

	var song = process.argv[3] || "The Sign Ace of Base";

	spotify.search({type: "track", query: song, limit: 1}, function(error, data) {
		if (error) throw error;

		for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
			console.log(data.tracks.items[0].artists[i].name + "\n");
		}
		console.log(data.tracks.items[0].name + "\n");
		console.log(data.tracks.items[0].preview_url + "\n");
		console.log(data.tracks.items[0].album.name + "\n");
	});
}

//print movie information given inputted movie title
if (process.argv[2] == "movie-this") {

	var movieTitle = process.argv[3] || "Mr. Nobody";

	request("http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle, function(error, response, body) {

	if(!error && response.statusCode === 200) {

		var responseJson = JSON.parse(body);

		var movie = responseJson.Title;
		var year = responseJson.Year;
		var IMDBrating = responseJson.Ratings[0].Source;
		var RTrating = responseJson.Ratings[1].Source;
		var country = responseJson.Country;
		var language = responseJson.Language;
		var plot = responseJson.Plot;
		var actors = responseJson.Actors;

		console.log("Movie title: " + movie + "\n" + "Year: " + year + "\n" + "IMBD Rating: " + IMDBrating + "\n" + "Rotten Tomatoes Rating: " + RTrating + "\n" + "Country: " + country + "\n" + "Language: " + language + "\n" + "Plot: " + plot + "\n" + "Actors: " + actors);
	}
});
}

if (process.argv[2] == "do-what-it-says") {

	fs.readFile("./random.txt", "utf8", function(error, data){
		if (error) throw error;
		//currently reads the text as text, not a command
		//"spotify-this-song,"I Want it That Way"
		//breaks the string into an array of two items to be used as arguments
		console.log(data.split(","));
	});
}

