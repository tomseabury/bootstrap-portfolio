$(document).ready(function(){
var count = 0
var gameStart = false
var time = 60
var timer
var correctNumber = 0
var correctAnswer = 0

var triviaGame = [
	{
		question : "Who was the rookie of the year in 2003?",
		answer : ["Yao Ming","Amar'e Stoudemire","Caron Butler","Manu Ginobili"],
		correct : 2,
	},
	{
		question : "Who is the only point guard to win Defensive Player of the Year?",
		answer : ["Jason Kidd","Gary Payton","Oscar Roberton","Chris Paul"],
		correct : 2,
	},
	{
		question : "Which player holds the single game assists record?",
		answer : ["Magic Johnson","John Stockton","Isiah Thomas","Scott Skiles"],
		correct : 4,
	},
	{
		question : "Which player is featured in the NBA logo?",
		answer : ["Pete Maravich","Bob Cousy","Jerry West","John Havlicek"],
		correct : 3,
	},
	{
		question : "Who holds the all time record for turnovers?",
		answer : ["Karl Malone","Allen Iverson","Paul Pierce","Kobe Bryant"],
		correct : 1,
	}
];


$(".btn").on("click",function(){
	correctNumber = triviaGame[count].correct
	var check = $('input[name=answer]:checked', '#answers').val()
	if (parseInt(check) === correctNumber) {
		correctAnswer++
	} else if (check === undefined && gameStart === true) {
		alert("Please select an answer before moving on!")
		return;
	};
	if (gameStart === false) {
		$("#timer").text("Time Left 1:00");
		gameStart = true
		$(".btn").text("Submit");
		timer = setInterval(startClock, 1000);
	}else {
		count++
	};
	if (count !== triviaGame.length) {
		$("#questions").text(triviaGame[count].question)
		$("#answers").html(
			"<input type='radio' name='answer' value='1'> " + triviaGame[count].answer[0] +
			"<br><input type='radio' name='answer' value='2'> " + triviaGame[count].answer[1] +
			"<br><input type='radio' name='answer' value='3'> " + triviaGame[count].answer[2] +
			"<br><input type='radio' name='answer' value='4'> " + triviaGame[count].answer[3]
		);
	}else {
		gameStop();
		clearInterval(timer);
	};
});

function gameStop(){
	$("#answers").empty();
	$("#questions").html("Correct Answers: " + correctAnswer + "<br><br> Missed Answers: " + (triviaGame.length - correctAnswer));
	$(".btn").text("Replay?")
	 count = 0
	 gameStart = false
	 time = 60
	 timer
	 correctNumber = 0
	 correctAnswer = 0
};

function startClock(){
	time--
	$("#timer").text("Time Left 0:" + time);
	if (time === 0) {
	clearInterval(timer);
	gameStop()
	};
};


});