$(document).ready(function(){
//174 words
var wordBank = ["afraid","afterlife","alarming","alien","angel","apparition","astronaut","autumn","ballerina","bat","beast","bizarre","black","blood","bloodcurdling","bogeyman","bone","boo","broomstick","cackle","cadaver","candy","cape","carve","casket","cat","cauldron","cemetery","chilling","cloak","clown","cobweb","coffin","corpse","costume","creepy","crown","crypt","dark","darkness","dead","demon","devil","devilish","disguise","dreadful","death","eerie","elf","enchant","evil","eyeballs","eyepatch","fairy","fangs","fear","flashlight","fog","fright","frighten","frightening","frightful","genie","ghastly","ghost","ghostly","ghoul","ghoulish","goblin","goodies","gory","gown","grave","gravestone","grim","grisly","gruesome","Halloween","hat","haunt","hayride","headstone","hobgoblin","horrible","horrify","howl","imp","jumpsuit","lantern","magic","mask","masquerade","mausoleum","midnight","mist","monster","moon","moonlight","moonlit","morbid","mummy","mysterious","night","nightmare","October","ogre","orange","otherworldly","owl","party","petrify","phantasm","phantom","pirate","pitchfork","poltergeist","potion","prank","pretend","pumpkin","repulsive","revolting","RIP","robe","robot","scare","scarecrow","scary","scream","shadow","shadowy","shock","shocking","skeleton","skull","soldier","specter","spell","spider","spirit","spook","spooky","startling","strange","superhero","supernatural","superstition","sweets","tarantula","terrible","terrify","thrilling","tomb","tombstone","treat","treats","trick","troll","unearthly","unnerving","vampire","vanish","wand","warlock","web","werewolf","wicked","wig","witch","witchcraft","wizard","wizardry","wraith","zombie"]
var randomWord = ""
var classCheck = ""
var letterArray = []
var guessedLetters = []
var wins = 0
var guesses = 10
var correct = 0
var winCheck = true
var lossCheck = false



function generateWord(){
	$("h2").animate({opacity: ".2"})
	$(".btn").animate({opacity: ".2"})
	randomWord = wordBank[Math.floor(Math.random()*174)];
	letterArray= randomWord.toUpperCase().split("");
	letterArray.forEach(function(g){
		$("#correctLetters").append('<div class="correctLetters ' + g+ '" id="' + g + '" style= "float: left; padding-right: 10px;">__</div>');
	})
}




document.onkeyup = function(event) {
if (guesses > 1 && winCheck === true) {
var letter = String.fromCharCode(event.keyCode).toUpperCase();
classCheck = ""
//create a way to not run this code if the letter has already been guessed
guessedLetters.push(letter);
if (letterArray.indexOf(letter) > -1) {
	$("."+letter).text(letter);

	$(".correctLetters").each(function(){
		classCheck = classCheck + $(this).text();
	});
	if (classCheck === randomWord.toUpperCase()) {
		$("h2").text("You did it!!");
		$("h2").animate({opacity: "1"});
		$(".btn").animate({opacity: "1"});
		wins = wins + 1
		winCheck = false
	}

}else{
	$("#guessedLetters").append(letter);
	guesses = guesses - 1
	$("h4").text("You can only miss " + guesses + " more!");
}
}else if (guesses < 2 && lossCheck === false){
	$("h4").text("Oh no! Looks like you have ran out of guesses..");
	$(".btn").animate({opacity: "1"});
	console.log("This is the thing ", $(".correctLetters"))
	$(".correctLetters").each(function(){
		var that = $(this);
		var thatLetter = $(this)[0].innerHTML;
		if (thatLetter === "__") {
            that.text(that.attr("id"));
            that.css("color", "red");
        }
        else if (thatLetter !== "__") {
            that.text(that.attr("id"));
            that.css("color", "white");
        }
	});
	lossCheck = true
}

};




$(".btn").hover(function(){
	$(this).animate({opacity: "1"});
	}, function(){
	$(this).animate({opacity: ".2"});
});

$("h2").hover(function(){
	$(this).animate({opacity: "1"});
	}, function(){
	$(this).animate({opacity: ".2"}, "slow");
});

$(".btn").on("click",function(){
	$("#correctLetters").empty();
	$("#guessedLetters").empty();
	$("h2").text("Words correctly guessed: " + wins);
	$("h4").text("You can only miss 10 letters!");
	correct = 0
	guesses = 10
	winCheck = true
	lossCheck = false
	generateWord();
});






generateWord();
});
