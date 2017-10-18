$(document).ready(function(){

var gameNumber = 0;
var userNumber = 0;
var crystalNumber = 0;
var wins = 0;
var losses =0;


function startGame(){
	userNumber = 0;
	$("#userNumber").html(0);
	function randomBetween(){
		gameNumber = Math.floor((Math.random()*120)+1);
		if (gameNumber < 18 || gameNumber > 120) {
			randomBetween();
		};
	};
	randomBetween();
	console.log(gameNumber);
	$("#gameNumber").html(gameNumber)

	$(".crystal").each(function(){
		crystalNumber = Math.floor((Math.random()*12)+1);
		$(this).val(crystalNumber);
		console.log($(this));
	});
};

startGame();


$(".crystal").on("click",function(){
	userNumber = parseInt($("#userNumber").html()) + parseInt($(this).val());
	$("#userNumber").html(userNumber)
	if (userNumber > gameNumber) {
		losses++
		$("#winLoss").html("Wins: " + wins + "<br>Losses: " + losses);
		startGame()
	}else if (userNumber === gameNumber) {
		wins++
		$("#winLoss").html("Wins: " + wins + "<br>Losses: " + losses);
		startGame()
	};
});




});