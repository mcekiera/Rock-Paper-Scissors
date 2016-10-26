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
		exitBtn = document.getElementById('js-exitBtn'),

/* Display elements */

		playerPointsElem = document.getElementById('js-playerPoints'), 
		playerNameElem = document.getElementById('js-playerName'), 
		computerPointsElem = document.getElementById('js-computerPoints'),
		playerPickElem = document.getElementById('js-playerPick'),
		computerPickElem = document.getElementById('js-computerPick'),
		playerResultElem = document.getElementById('js-playerResult'),
		computerResultElem = document.getElementById('js-computerResult'),
		commentator = document.getElementById('js-commentator'),

/* Basic values */

		gameState = 'notStarted',
		player = { name: '', score: 0 },
		computer = { score: 0 },
		version = 'basic',
		possibleChoice = [],

		descriptions =['Scissors cuts Paper', 'Paper covers Rock', 'Rock crushes Lizard', 
		'Lizard poisons Spock', 'Spock smashes Scissors', 'Scissors decapitates Lizard',
		'Lizard eats Paper', 'Paper disproves Spock', 'Spock vaporizes Rock', 'Rock crushes Scissors'];

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
				newGameBtnBasic.innerText = 'Try again!';
				newGameBtnExtended.innerText = 'Extended';
			} else {
				newGameBtnExtended.innerText = 'Try again!';
				newGameBtnBasic.innerText = 'Basic';
			}

		case 'notStarted': 

		default: 
			newGameElemBasic.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}

function reset() {
	gameState = 'notStarted';
	newGameBtnExtended.innerText = 'Extended';
	newGameBtnBasic.innerText = 'Basic';
	setGameElements();
}

function newGame() { 
	player.name = prompt('What is your name?', 'Name');

	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();
		setVersion();
		playerNameElem.innerHTML = player.name;
		setGamePoints(); 
		commentator.style.color = "#fff";
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
	commentator.style.color = "#FFFF00";
	computerResultElem.innerHTML = "Draw!";
	playerResultElem.innerHTML = "Draw!";
}

function playerWins() {
	playerResultElem.innerHTML = "Victory!";
	computerResultElem.innerHTML = "Defeat!";
	player.score++;
	commentator.style.color = "#00FF00";
}

function computerWins() {
	computerResultElem.innerHTML = "Victory!";
	playerResultElem.innerHTML = "Defeat!";
	computer.score++;
	commentator.style.color = "#FF0000";
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
		if( player.score === 10) {
			commentator.innerText = 'You win!';
		} else {
			commentator.innerText = 'You lose!';
		}
		gameState = 'ended';
		setVersion();
		setGameElements();
	}
}

/* It finds descrition for result of given round, for example, in case of: 
'rock' vs 'paper', it will display string from description array, which contain both,
'rock' and 'paper' words.*/
function getDescription(first, second) {
	if (first == second) {
		var result = 'draw';
	} else {
		var regex = new RegExp('(?=.*' + first + '.*)(?=.*' + second  + '.*)','i');
		for (var i = 0, len = descriptions.length; i < len; i++) {
			if(regex.test(descriptions[i])) {
				result = descriptions[i];
				break;
			}
		}
	}
	commentator.innerText = result;
}

pickRock.addEventListener('click', function() { playerPick(rock); 
});
pickPaper.addEventListener('click', function() { playerPick(paper); });
pickScissors.addEventListener('click', function() { playerPick(scissors); });
pickSpock.addEventListener('click', function() { playerPick(spock); });
pickLizard.addEventListener('click', function() { playerPick(lizard); });

newGameBtnBasic.addEventListener('click', newGameBsc);
newGameBtnExtended.addEventListener('click', newGameExt);
exitBtn.addEventListener('click', reset);
setGameElements();