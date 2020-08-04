const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

let flipped = 0;
let score = 0;
let card1 = null;
let card2 = null;
let color1 = null;
let color2 = null;

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	const color = event.target.getAttribute('class');
	const divs = document.querySelectorAll('#game div');
	flipped++;
	// checks for first card flipped
	if (flipped === 1) {
		score++;
		scoreBoard.innerText = score;
		event.target.style.backgroundColor = color;
		color1 = color;
		card1 = event.target;
	}
	// checks for second card flipped
	if (flipped === 2) {
		event.target.style.backgroundColor = color;
		color2 = color;
		card2 = event.target;
		// checks that user doesn't click same card twice
		if (card1 !== card2) {
			score++;
			scoreBoard.innerText = score;
		}
		// checks if cards match
		if ((color1 === color2) & (card1 !== card2)) {
			for (let div of divs) {
				if (div.classList.contains(color)) {
					div.classList.add('match');
				}
			}
		}
		// flips cards back over if they don't match
		setTimeout(function() {
			for (let div of divs) {
				if (!div.classList.contains('match')) {
					div.style.backgroundColor = 'white';
				}
			}
			flipped = 0;
		}, 1000);
	}
	// checks if all cards are matched and game is complete
	let check = 0;
	let match = 0;
	for (let div of divs) {
		check++;
		if (div.classList.contains('match')) {
			match++;
		}
	}
	if (check === match) {
		setTimeout(function() {
			alert('you win');
		}, 100);
		let checkScore = score;
		if (checkScore < bestScore || bestScore === '') {
			bestScore = score;
			bestScoreBoard.innerText = bestScore;
			localStorage.setItem('bestScore', score);
		}
	}
}

let bestScore = localStorage.getItem('bestScore') || '';

const scoreBoard = document.querySelector('#score p');
scoreBoard.innerText = score;

const bestScoreBoard = document.querySelector('#bestScore p');
bestScoreBoard.innerText = bestScore;

const startBtn = document.querySelector('#start');

startBtn.addEventListener('click', function() {
	createDivsForColors(shuffledColors);
	startBtn.remove();
});

const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', function() {
	let cards = document.querySelectorAll('#game div');
	for (let card of cards) {
		card.remove();
	}
	shuffle(COLORS);
	createDivsForColors(shuffledColors);
	score = 0;
	scoreBoard.innerText = score;
});

// when the DOM loads
