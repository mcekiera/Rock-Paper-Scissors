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
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
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

	if (playerPick == computerPick) {
		winnerIs = 'none';
	} else if (
		(computerPick == 'rock' && playerPick == 'scissors') || 
		(computerPick == 'scissors' && playerPick == 'paper')|| 
		(computerPick == 'paper' && playerPick == 'rock') ) { 
			winnerIs = 'computer'; 
	}

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Wygrana!";
		player.score++;
	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Wygrana!";
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
	var possibleVal = ['rock','paper','scissors'];
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
	} else {
		console.log(player.score + ',' + computer.score);
	}
}

pickRock.addEventListener('click', function() { playerPick('rock'); ;
});
pickPaper.addEventListener('click', function() { playerPick('paper'); });
pickScissors.addEventListener('click', function() { playerPick('scissors'); });
newGameBtn.addEventListener('click', newGame);

setGameElements();