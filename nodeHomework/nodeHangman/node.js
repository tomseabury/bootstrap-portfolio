var inquirer =  require ("inquirer");
var wordConstructor = require("./wordConstructor.js");
var letterConstructor = require("./letterConstructor.js");

var letterObjectArray = [];
var wordState = "";
var guesses = 10;
var firstGame = true;
var gameWon = false;

function startGame(){

letterObjectArray = [];
wordState = "";
guesses = 10;
gameWon = false;

if (firstGame) {
	var gamePrompt = "Would you like to play hangman?"
} else {
	var gamePrompt = "Would you like to play again?"
}

inquirer.prompt([
      {
      	type: "list",
        name: "newGame",
        message: gamePrompt,
        choices: ["yes" , "no"]
      }
    ]).then(function(answer) {
    	if (answer.newGame === "yes") {

	    	var newWord = new wordConstructor();
	    	   	
	    	createLettersArray(newWord);

	    	whiteSpaceHandler(letterObjectArray);
	    	
	    	createUserDisplay(letterObjectArray);
			
	    	console.log("Here's your word, good luck!" + "\n" + wordState);

	    	runGame(newWord.word);

	    };
    	
	});
};



function runGame(word){
	checkGame();
	if (gameWon === false) {
		if (guesses > 0) {
	    	inquirer.prompt([
	    		{
	    			type: "input",
			        name: "userGuess",
			        message: "Choose a letter",		
	    		}
			]).then(function(answer){

				checkAnswer(word,answer.userGuess);

				createUserDisplay(letterObjectArray);

				console.log(wordState);

				runGame(word);
			});
		}else{
			console.log("Out of Guesses! \n Better luck next time!");
			console.log("_________________________________________");
			firstGame = false;
			startGame();
		};
	}else{
		console.log("You win!!!");
		console.log("_________________________________________");
		firstGame = false;
		startGame();
	};	
};

function checkGame(){
	var trueCount = 0;

	for (var i = 0; i < letterObjectArray.length; i++) {
		if(letterObjectArray[i].guessed === true) {
			trueCount++	
		};
	};
	if (trueCount === letterObjectArray.length) {
		gameWon	= true
	};
};

function checkAnswer(word, guessedLetter){
	if (word.includes(guessedLetter)){
		for (var i = 0; i < letterObjectArray.length; i++) {
			if(letterObjectArray[i].letter === guessedLetter) {
				letterObjectArray[i].guessed = true;	
			}
		};
		console.log("Good guess!");
	}else {
		guesses --;
		console.log("Try again!" + "\n" + "Guesses left: " + guesses);
	};
};

function createLettersArray(object){
	for (var i = 0; i < object.letterArray.length; i++) {
		var letter = new letterConstructor(object.letterArray[i])
		letterObjectArray.push(letter)
    };
    // console.log(letterObjectArray)
};

function whiteSpaceHandler(array){
	for (var i = 0; i < array.length; i++) {
		if(array[i].letter === " "){
			array[i].guessed = true;
		}; 
	};
	// console.log("Finished whiteSpaceHandler")
};

function createUserDisplay(array){
	wordState = "";
	for (var i = 0; i < array.length; i++) {
		if (array[i].guessed) {
			wordState += array[i].letter
		}
		else{
			wordState += array[i].placeholder	
		}	
    };
};


startGame();