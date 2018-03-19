require("dotenv").config();

//add code required to import keys.js file and store it in a variable

//this is how I will access key information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//commands that liri will understand 

//my-tweets will show the last 20 tweets and when they were created

//spotify-this-song "name of song" will show artist, song name, preview link to the song on Spotify, album

//default song is "The Sign" by Ace of Base

//movie-this "movie name " will show title of movie, year, IMDB rating, Rotten Tomatoes rating, country where produced, language of movie, plot, actors

//default movie is "Mr. Nobody"

