var keys = require("./keys.js");
var spotifyID = "97831c89f837446eb378462f4d959f0b";
var spotifySecret = "f10a9f3cebcb4e3589b2372a94325c3e";

var request = require("request");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify({
	id: spotifyID,
	secret: spotifySecret
});

var commands = [];

for (var i = 2; i < process.argv.length; i++) {
	commands.push(process.argv[i]);
}

function commandSwitch(commands) {
	switch (commands[0]) {
		case "movie-this":
			if (commands[1] != null) {
				// Grab or assemble the movie name
				var movieName = commands[1];
				// ...
				for (var i = 2; i < commands.length; i++) {
					movieName += "+" + commands[i];
				};

				// Then run a request to the OMDB API with the movie specified
				var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";



				request(queryUrl, function(error, response, body) {

					if (!error && response.statusCode === 200) {
						console.log("\nTitle: " + JSON.parse(body).Title);
						console.log("Release Year: " + JSON.parse(body).Year);
						console.log("IMDb Rating: " + JSON.parse(body).Ratings[0].Value);
						console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
						console.log("Produced in: " + JSON.parse(body).Country);
						console.log("Language: " + JSON.parse(body).Language);
						console.log("Plot: " + JSON.parse(body).Plot);
						console.log("Actors/Actresses: " + JSON.parse(body).Actors);
					}
				});
			} else {
				// Then run a request to the OMDB API with the movie specified
				var queryUrl = "http://www.omdbapi.com/?t=Blankman&y=&plot=short&apikey=trilogy";


				request(queryUrl, function(error, response, body) {

					if (!error && response.statusCode === 200) {
						console.log("\nTitle: " + JSON.parse(body).Title);
						console.log("Release Year: " + JSON.parse(body).Year);
						console.log("IMDb Rating: " + JSON.parse(body).Ratings[0].Value);
						console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
						console.log("Produced in: " + JSON.parse(body).Country);
						console.log("Language: " + JSON.parse(body).Language);
						console.log("Plot: " + JSON.parse(body).Plot);
						console.log("Actors/Actresses: " + JSON.parse(body).Actors);
					}
				});
			}
			break;
		case "spotify-this-song":
			if (commands[1] != null) {
				// Grab or assemble the song name
				var songName = commands[1];
				
				for (var i = 2; i < commands.length; i++) {
					songName += "+" + commands[i];
				};

				spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
					if (err) {
						return console.log('Error occurred: ' + err);
					}

						for (var i = 0; i < data.tracks.items.length; i++) {
							console.log("\nArtist: " + data.tracks.items[i].artists[0].name);
							console.log("Track: " + data.tracks.items[i].name);
							console.log("Spotify: " + data.tracks.items[i].external_urls.spotify);
							console.log("Album: " + data.tracks.items[i].album.name);
						}
				});
			} else {
				spotify.search({ type: 'track', query: "Spoon Man", limit: 1 }, function(err, data) {
					if (err) {
						return console.log('Error occurred: ' + err);
					}
					console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
					console.log("Track: " + data.tracks.items[0].name);
					console.log("Spotify: " + data.tracks.items[0].external_urls.spotify);
					console.log("Album: " + data.tracks.items[0].album.name);
				});
			}
			break;
		case "my-tweets":
			var params = {screen_name: 'codingcoderson'};
			keys.get('statuses/user_timeline', params, function(error, tweets, response) {
				if (!error) {
					for (var i = 0; i < tweets.length; i++) {
						console.log("\n" + tweets[i].text);
						console.log("Posted on " + tweets[i].created_at);
					}
				}
			});
			break;
		case "do-what-it-says":
			fs.readFile("random.txt", "utf8", function(error, data) {

				if (error) {
				  return console.log(error);
				}

				var commandArr = data.split("\n");
				console.log(commandArr);

				for (var i = 0; i < commandArr.length; i++) {

					var dataArr = commandArr[i].split(" ");

					commandSwitch(dataArr);
				}
			});
			break;

	}
}

commandSwitch(commands);