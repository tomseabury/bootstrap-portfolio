var wordBank = ["the godfather","shawshank redemption","pulp fiction","star wars","forrest gump"];

var wordObject = function(){
		this.word = wordBank[Math.floor((Math.random()*4))];
		this.letterArray = this.word.split("");
};


module.exports = wordObject;