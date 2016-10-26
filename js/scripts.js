/* Layout elements */
var newGameElem = document.getElementById('js-newGameElement'), 
		pickElem = document.getElementById('js-playerPickElement'), 
		resultsElem = document.getElementById('js-resultsTableElement'),
/* Control elements */
		newGameBtn = document.getElementById('js-newGameButton'),
		pickRock = document.getElementById('js-playerPick_rock'),
		pickPaper = document.getElementById('js-playerPick_paper'),
		pickScissors = document.getElementById('js-playerPick_scissors'),
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
		computer = { score: 0 };


/* Figure objects */
function Figure(name, strength, resistance) {
	this.name = name;
	this.strength = strength;
	this.resistance = resistance;

	this.compare = function(figure) {
		if(name == figure) {
			return 0;
		} else if (this.strength.indexOf(figure)>=0) {
			return 1;
		} else {
			return -1;
		}
	}
}

var stone = new Figure('stone',['scissors'],['paper']);
var scissors = new Figure('scissors',['paper'],['stone']);
var paper = new Figure('paper',['stone'],['scissors']);


/**********************/

function setGameElements() { 
	switch(gameState) { 
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended': 
			newGameBtn.innerText = 'Jeszcze raz';
		case 'notStarted': 
		default: 
			newGameElem.style.display = 'block';
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
		playerNameElem.innerHTML = player.name;
		setGamePoints(); 
	} 
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';
	var winnerIs = 'player';
	var result = playerPick.compare(computerPick);

	if (result === 0) {
		winnerIs = 'none';
	} else if ( result === -1) { 
			winnerIs = 'computer'; 
	}

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Victory!";
		player.score++;
	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Victory!";
		computer.score++;
	}

	setGamePoints(); 
	isOver();
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function getComputerPick() {
	var possibleVal = ['stone','paper','scissors'];
	return(possibleVal[Math.floor(Math.random()*3)]);
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
		setGameElements();
	}
}

pickRock.addEventListener('click', function() { playerPick(stone); ;
});
pickPaper.addEventListener('click', function() { playerPick(paper); });
pickScissors.addEventListener('click', function() { playerPick(scissors); });
newGameBtn.addEventListener('click', newGame);

setGameElements();