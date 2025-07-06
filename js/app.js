
/*-------------- Constants -------------*/
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z'];

const fruits = ['apple', 'grape', 'melon', 'mango', 'peach', 'dates', 'berry', 'lemon', 'olive', 'guava'];
const animals = ['camel', 'eagle', 'koala', 'dingo', 'horse', 'lemur', 'mouse', 'robin', 'sheep', 'tiger'];

/*---------- Variables (state) ---------*/

let computerChoice;
let guessedLetters;
let wrongGuesses;
let msg;
let life;
/*----- Cached Element References  -----*/
const lines = document.querySelectorAll('.dash');
const chance = document.querySelectorAll('.Bomb');
const wrongBox = document.querySelector('.box');
const fruitButtonEl = document.querySelector('#Fruits');
const animalsButtonEle = document.querySelector('#Animals');
const resultDisplayEl = document.querySelector('#result-display')
const resetBtn = document.getElementById('resetButton');



/*-------------- Functions -------------*/

// Returns a random word based on the selected category
function getComputerChoice() {
  if (category === 'fruits') {
    const randomIndex = Math.floor(Math.random() * fruits.length);
    return fruits[randomIndex];
  }
  else if (category === 'animals') {
    const randomIndex = Math.floor(Math.random() * animals.length);
    return animals[randomIndex];
  }
  // Default to fruit category if none is selected
  else {
    return fruits[Math.floor(Math.random() * fruits.length)];
  }
}

// Initializes game state and UI for a new round
function init() {

  guessedLetters = [];
  wrongGuesses = [];
  if (resultDisplayEl) resultDisplayEl.textContent = '';
  if (wrongBox) wrongBox.textContent = '';
  life = 0;
  computerChoice = getComputerChoice();
  // ===== CODE GRAVEYARD (for reference only) =====
  // console.log("Computer chose:", computerChoice);
  // ===============================================

  // Display underscores for each letter in the chosen word

  for (let i = 0; i < lines.length; i++) {
    if (i < computerChoice.length) {
      lines[i].textContent = "_";
    }
  }
  // Reset bombs display
  chance.forEach(el => el.textContent = "💣");
  // Listen for user keyboard input

  document.addEventListener('keydown', handleKey);
}


// Handles user key presses during the game
function handleKey(event) {
  const letter = event.key.toLowerCase();
  // Ignore keys not in the alphabet or already guessed

  if (!alphabet.includes(letter) || guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (computerChoice.includes(letter)) {
    displayWord();
  }
  else {
    wrongGuesses.push(letter);
    updateWrongBox();
    updateLife();
  }

  compare();
  render();
}

// Removes one bomb for each wrong guess
function updateLife() {
  if (life < chance.length) {
    chance[life].textContent = '';
    life++;
  }

}

// Displays correct letters and underscores on the screen
function displayWord() {
  for (let i = 0; i < computerChoice.length; i++) {
    if (guessedLetters.includes(computerChoice[i])) {
      lines[i].textContent = computerChoice[i];
    } else {
      lines[i].textContent = "_";


    }
  }
}
// Updates the wrong guess display box

function updateWrongBox() {
  if (wrongGuesses.length === 0) {
    wrongBox.textContent = "";
  } else {
    wrongBox.textContent = ` ${wrongGuesses}`;
  }
}

// Checks if the user has won or lost
function compare() {
  let winner = true;


  for (let i = 0; i < computerChoice.length; i++) {
    if (!guessedLetters.includes(computerChoice[i])) {
      winner = false;
      break;
    }
  }

  if (winner) {
    msg = '🎉 You win!';
  }
  else if (life >= chance.length) {
    msg = '💥 Game over! No bombs left!';
  }
  else {
    msg = '';
  }
}

// Displays the result message if the game has ended
function render() {
  if (msg !== '') {
    resultDisplayEl.textContent = `${msg} The word was "${computerChoice}" .`;
  }
}
if (document.querySelector('#result-display')) {
  init();
}


/*----------- Event Listeners ----------*/

// Handle category selection

if (fruitButtonEl) {
  fruitButtonEl.addEventListener('click', () => {
    category = 'fruits';
    init();
  });
}

if (animalsButtonEle) {
  animalsButtonEle.addEventListener('click', () => {
    category = 'animals';
    init();
  });
}
// Handle game reset

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    if (category) {
      init();
    }
  });
}


