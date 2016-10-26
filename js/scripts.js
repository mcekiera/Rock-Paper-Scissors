/* Layout elements */

var newGameElemBasic = document.getElementById('js-newGameElementBasic'), 
		extendedGameElement = document.getElementById('js-extendedGameElement'), 
		pickElem = document.getElementById('js-playerPickElement'), 
		resultsElem = document.getElementById('js-resultsTableElement'),

/* Control elements */

		newGameBtnBasic = document.getElementById('js-newGameButtonBasic'),
		newGameBtnExtended = document.getElementById('js-newGameButtonExtended'),
		pickRock = document.getElementById('js-playerPick_rock'),
		pickPaper = document.getElementById('js-playerPick_paper'),
		pickScissors = document.getElementById('js-playerPick_scissors'),
		pickSpock = document.getElementById('js-playerPick_spock'),
		pickLizard = document.getElementById('js-playerPick_lizard'),

/* Display elements */

		playerPointsElem = document.getElementById('js-playerPoints'), 
		playerNameElem = document.getElementById('js-playerName'), 
		computerPointsElem = document.getElementById('js-computerPoints'),
		playerPickElem = document.getElementById('js-playerPick'),
		computerPickElem = document.getElementById('js-computerPick'),
		playerResultElem = document.getElementById('js-playerResult'),
		computerResultElem = document.getElementById('js-computerResult'),

/* Basic values */

		gameState = 'notStarted',
		player = { name: '', score: 0 },
		computer = { score: 0 },
		version = 'basic',
		possibleChoice = [];

		descriptions =['Scissors cuts Paper', 'Paper covers Rock', 'Rock crushes Lizard', 
		'Lizard poisons Spock', 'Spock smashes Scissors', 'Scissors decapitates Lizard',
		'Lizard eats Paper', 'Paper disproves Spock', 'Spock vaporizes Rock', 'Rock crushes Scissors']

/* Figure objects */

function Figure(name, strength) {
	this.name = name;
	this.strength = strength;

	this.compare = function(figure) {
		if(name == figure) {
			return 0;
		} else if (this.strength.indexOf(figure)>=0) {
			return 1;
		} else {
			return -1;
		}
	};

	this.toString = function() {
		return name;
	};
}

var rock = new Figure('rock',['scissors','lizard']);
var scissors = new Figure('scissors',['paper','lizard']);
var paper = new Figure('paper',['rock','spock']);
var lizard = new Figure('lizard',['spock','paper']);
var spock = new Figure('spock',['scissors','rock']);


/* FUNCTIONS */
function setVersion() {
	switch(version) {
		case 'basic':
			extendedGameElement.style.display = 'none';
			possibleChoice = ['rock','paper','scissors'];
			break;
		case 'extended':
			extendedGameElement.style.display = 'inline-block';
			possibleChoice = ['rock','paper','scissors','lizard','spock'];
			break;
	}
}

function setGameElements() { 
	switch(gameState) { 

		case 'started':
			newGameElemBasic.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;

		case 'ended': 
			if (version == 'basic') {
				newGameBtnBasic.innerText = 'Again!';
				newGameBtnBasic.innerText = 'Again!';
			} else {
				newGameBtnExtended.innerText = 'Again!';
				newGameBtnBasic.innerText = 'Change version!';
			}

		case 'notStarted': 

		default: 
			newGameElemBasic.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}

function newGame() { 
	player.name = prompt('What is your name, Traveller?', 'Name');

	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();
		setVersion();
		playerNameElem.innerHTML = player.name;
		setGamePoints(); 
	} 
}

function newGameExt() {
	version = 'extended';
	newGame();
}

function newGameBsc() {
	version = 'basic';
	newGame();
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';
	var winnerIs = 'player';
	var result = playerPick.compare(computerPick);

	if (result === 0) {
		draw();
	} else if ( result === -1) { 
		computerWins();
	} else {
		playerWins();
	}

	getDescription(playerPick.toString(),computerPick);
	setGamePoints(); 
	isOver();
}

function draw() {

}

function playerWins() {
	playerResultElem.innerHTML = "Victory!";
	computerResultElem.innerHTML = "Defeat!";
	player.score++;
}

function computerWins() {
	computerResultElem.innerHTML = "Victory!";
	playerResultElem.innerHTML = "Defeat!";
	computer.score++;
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function getComputerPick() {
	var len = possibleChoice.length;
	return(possibleChoice[Math.floor(Math.random()*len)]);
}

function playerPick(playerPick) {
	console.log(playerPick);
	var computerPick = getComputerPick();
	console.log(getComputerPick());

	playerPickElem.innerHTML = playerPick; 
	computerPickElem.innerHTML = computerPick; 
	checkRoundWinner(playerPick, computerPick);
}

function isOver() {
	if (player.score === 10 || computer.score === 10) {
		gameState = 'ended';
		setVersion();
		setGameElements();
	}
}

function getDescription(first, second) {
	console.log('(?=.*' + first + '.*)(?=.*' + second  + '.*)')
	var regex = new RegExp('(?=.*' + first + '.*)(?=.*' + second  + '.*)','i');
	for (var i = 0, len = descriptions.length; i < len; i++) {
		if(regex.test(descriptions[i])) {
			console.log(descriptions[i]);
		}
	}
}

pickRock.addEventListener('click', function() { playerPick(rock); 
});
pickPaper.addEventListener('click', function() { playerPick(paper); });
pickScissors.addEventListener('click', function() { playerPick(scissors); });
pickSpock.addEventListener('click', function() { playerPick(spock); });
pickLizard.addEventListener('click', function() { playerPick(lizard); });

newGameBtnBasic.addEventListener('click', newGameBsc);
newGameBtnExtended.addEventListener('click', newGameExt);

setGameElements();