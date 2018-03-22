require("dotenv").config();

//add code required to import keys.js file and store it in a variable
var keys = require("./keys.js");

//require apis
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

//access key information
//Spotify
var spotify = new Spotify({
	id: keys.spotify.id,
	secret: keys.spotify.secret
});
// Twitter
var client = new Twitter({
	consumer_key: keys.twitter.consumer_key,
	consumer_secret: keys.twitter.consumer_secret,
	access_token_key: keys.twitter.access_token_key,
	access_token_secret: keys.twitter.access_token_secret
});

//add when the tweets were created

if (process.argv[2] == "my-tweets") {
var params = {screen_name: 'RavinaDolfell', count: 20};

client.get("statuses/user_timeline", params, function(error, tweet, response) {

	if(error) throw error;
	for (var i = 0; i < tweet.length; i++) {
		console.log(tweet[i].text + "\n");
	}
});
}

// spotify.search({type: "track", query: "All the Small Things"}, function(err, data) {
// 	if (err) {
// 		return console.log("Error occured: " + err);
// 	}
// 	console.log(data);
// })

//my-tweets will show the last 20 tweets and when they were created

//spotify-this-song "name of song" will show artist, song name, preview link to the song on Spotify, album

//default song is "The Sign" by Ace of Base

//OMDB request
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