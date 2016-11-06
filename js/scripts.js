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
		rulesBtn =  document.getElementById('js-rulesButton'),

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

function Figure(name, strength, weakness) {
	this.name = name;
	this.strength = strength;
	this.weakness = weakness;

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

var rock = new Figure('rock',['scissors','lizard'],['paper','spock']);
var scissors = new Figure('scissors',['paper','lizard'],['rock','spock']);
var paper = new Figure('paper',['rock','spock'],['scissors','lizard']);
var lizard = new Figure('lizard',['spock','paper'],['rock','scissors']);
var spock = new Figure('spock',['scissors','rock'],['paper','lizard']);

var map = {
	'rock' : pickRock,
	'paper' : pickPaper,
	'scissors' : pickScissors,
	'spock' : pickSpock,
	'lizard' : pickLizard
};

/* FUNCTIONS */

/* SET UP FUNCTIONS - 
structure, transitions and view of game in different modes and versions */

/* Determine, which elements of UI will be displayed in given game version: 
basic rock-paper-scissor, or extended moder rock-paper-scissor-lizard-spock. */
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

/* Determines which elements of UI will be displayed in certain stages of game: notStarted,
started, ended and rules */ 
function setGameElements() { 
	switch(gameState) { 

		case 'started':
			newGameElemBasic.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'rules':
			newGameElemBasic.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'none';
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

/* Bring the standard view of site, before interaction with User, in case, when User use
exit button */
function reset() {
	gameState = 'notStarted';
	newGameBtnExtended.innerText = 'Extended';
	newGameBtnBasic.innerText = 'Basic';
	computerResultElem.innerHTML = '';
	playerResultElem.innerHTML = '';
	commentator.innerText = 'Wait for result';
	commentator.style.color = "#fff";
	setGameElements();
}

/* Sets up elements for new game */
function newGame() { 
	player.name = prompt('What is your name?', 'Name');

	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();
		setVersion();
		playerNameElem.innerHTML = player.name;
		setGamePoints(); 
		commentator.style.color = '#fff';
	} 
}

/* Set up UI for extended version of game */
function newGameExt() {
	version = 'extended';
	newGame();
}

/* Set up UI for basic version of game */
function newGameBsc() {
	version = 'basic';
	newGame();
}

/* Set up UI for view of description of game rules */
function displayRules() {
	reset();
	version = 'extended';
	gameState = 'rules';
	setVersion();
	setGameElements();
}

/* GAME FLOW FAUNCTIONS - interaction with User, determining the result of every round */

/* Determines results of given round, controls reaction for given result */
function checkRoundWinner(playerPick, computerPick) {
	if(gameState != 'rules') {
		playerResultElem.innerHTML = computerResultElem.innerHTML = '';
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
}

/* Generate random CMP choice */
function getComputerPick() {
	var len = possibleChoice.length;
	return(possibleChoice[Math.floor(Math.random()*len)]);
}

/* Controls User input action */
function playerPick(playerPick) {
	console.log(playerPick);
	var computerPick = getComputerPick();
	console.log(getComputerPick());

	playerPickElem.innerHTML = playerPick; 
	computerPickElem.innerHTML = computerPick; 
	checkRoundWinner(playerPick, computerPick);
}

/* Determines moment, in which game should end. */
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

/* RESULTS VIEW FUNCTIONS - updating and displaying an information about game results, 
responses for User actions */

/* Set up view elements for draw result */
function draw() {
	commentator.style.color = '#ffa500';
	computerResultElem.innerHTML = 'Draw!';
	playerResultElem.innerHTML = 'Draw!';
	computerResultElem.style.color = '#ffa500';
	playerResultElem.style.color = '#ffa500';
}

/* Set up view elements for players wins result */
function playerWins() {
	playerResultElem.innerHTML = 'Victory!';
	computerResultElem.innerHTML = 'Defeat!';
	computerResultElem.style.color = '#ff0000';
	playerResultElem.style.color = '#00ff00';
	player.score++;
	commentator.style.color = '#00FF00';
}

/* Set up view elements for CMP wins result */
function computerWins() {
	computerResultElem.innerHTML = 'Victory!';
	playerResultElem.innerHTML = 'Defeat!';
	computerResultElem.style.color = '#00ff00';
	playerResultElem.style.color = '#ff0000';
	computer.score++;
	commentator.style.color = '#FF0000';
}

/* Update game score view */
function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

/* It finds descrition for result of given round, for example, in case of: 
'rock' vs 'paper', it will display string from description array, which contain both,
'rock' and 'paper' words.*/
function getDescription(first, second) {
  var result = '';
	if (first == second) {
		result = 'draw';
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

/* Visualize game rules by highlighting proper elements of UI */
function markRelated(figure) {
	if (gameState == 'rules') {
		for(var i = 0; i < figure.weakness.length; i++) {
				
			map[figure.weakness[i]].className += ' weekness';
			map[figure.strength[i]].className += ' strength';

		}
	}
	
}

/* Visualize game rules, by hiding highlight of UI elements */
function unmarkRelated(figure) {
	if (gameState == 'rules') {
		for(var i = 0; i < figure.weakness.length; i++) {
			map[figure.weakness[i]].className = map[figure.weakness[i]].className.replace(/\sweekness/g,'');
			map[figure.strength[i]].className = map[figure.strength[i]].className.replace(/\sstrength/g,'');
		}
	}
}


/* EVENT LISTENERS */ 
function setRelations() {

	var setListener = function(key) {
		map[key].addEventListener('click', function() { playerPick(window[key]);});
		map[key].addEventListener('mouseover', function() { markRelated(window[key]);});
		map[key].addEventListener('mouseout', function() { unmarkRelated(window[key]);});
	}

	for(key in map) {
		console.log(key + ',' + map[key]);
		if(map.hasOwnProperty(key)) {

			setListener(key);
		}
	}
}

newGameBtnBasic.addEventListener('click', newGameBsc);
newGameBtnExtended.addEventListener('click', newGameExt);
rulesBtn.addEventListener('click', displayRules);
exitBtn.addEventListener('click', reset);

/* First setting of game elements */
setRelations();
setGameElements();

