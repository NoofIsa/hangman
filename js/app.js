
/*-------------- Constants -------------*/
const alphabet =['a', 'b', 'c', 'd', 'e', 'f', 'g',
                 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
                 'o', 'p', 'q', 'r', 's', 't', 'u',
                  'v', 'w', 'x', 'y', 'z'];

const fruite =['apple', 'grape', 'melon', 'mango', 'peach', 'dates', 'berry', 'lemon', 'olive', 'guava'];
const animals = ['camel', 'eagle', 'koala', 'dingo', 'horse', 'lemur', 'mouse', 'robin', 'sheep', 'tiger'];

/*---------- Variables (state) ---------*/

let computerChoice;
let guessedLetters;
let wrongGuesses;
let msg;
//let category ;
let life;
/*----- Cached Element References  -----*/
const lines = document.querySelectorAll('.dash');
const chance = document.querySelectorAll('.Bomb');
const wrongBox = document.querySelector('.box');
const fruiteButtonEle = document.querySelector('#Fruits');
const animalsButtonEle = document.querySelector('#Animals');
const resultDisplayEl = document.querySelector('#result-display')
const resetBtn = document.getElementById('resetButton');


//console.log(fruiteButtonEle);

/*-------------- Functions -------------*/


function getComputerChoice() {
  if (category === 'fruit') {
    const randomIndex = Math.floor(Math.random() * fruite.length);
    return fruite[randomIndex];
  } else if (category === 'animals') {
    const randomIndex = Math.floor(Math.random() * animals.length);
    return animals[randomIndex];
  } else {
    return fruite[Math.floor(Math.random() * fruite.length)];
  }
}


function init() {
  
  guessedLetters = [];
  wrongGuesses =[];
  if (resultDisplayEl) resultDisplayEl.textContent = '';
  if (wrongBox) wrongBox.textContent = '';
  life = 0;  
  // Track how many bombs
  
  computerChoice = getComputerChoice();
  console.log("Computer chose:", computerChoice);

  for (let i = 0; i < lines.length; i++) {
    if (i < computerChoice.length) {
      lines[i].textContent = "_";
      //lines[i].style.display = "inline-block";
    }     
  }

  chance.forEach(el => el.textContent = "💣");
  document.addEventListener('keydown', handleKey);
}


// function to handle the key press "letter that user press"
function handleKey(event) {
  const letter = event.key.toLowerCase();
  if (!alphabet.includes(letter) || guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (computerChoice.includes(letter)) {
    displayWord();
  } else {
    wrongGuesses.push(letter);
    updateWrongBox();
    updateLife();
  }

  compare();
  render();
}

// Update bombs by removing one for each wrong guess
function updateLife() {
  if (life < chance.length) {
    chance[life].textContent = ''; // Remove one bomb
    life++;
  } 
  
}     

// display letters on dashes 
function displayWord() {
  for (let i = 0; i < computerChoice.length; i++) {
    if (guessedLetters.includes(computerChoice[i])) {
      lines[i].textContent = computerChoice[i];
    } else {
      lines[i].textContent = "_";
      
    
    }
  }
}

function updateWrongBox() {
  if (wrongGuesses.length === 0) {
    wrongBox.textContent = "";
  } else {
    wrongBox.textContent = ` ${wrongGuesses}`;
  }
}

function compare() {
  let winner =true;
   

  for (let i = 0; i < computerChoice.length; i++) {
    if (!guessedLetters.includes(computerChoice[i])) {
      winner = false;
      break;
    }
  }

  if (winner) {
    msg = '🎉 You win!';
  } else if (life >= chance.length) {
    msg = '💥 Game over! No bombs left!';
  } else {
    msg = '';
  }
}

function render() {
  if (msg !== '') {
    resultDisplayEl.textContent = `${msg} The word was "${computerChoice}" .`;
  }
}
if (document.querySelector('#result-display')) {
  init();
}


/*----------- Event Listeners ----------*/


if (fruiteButtonEle) {
  fruiteButtonEle.addEventListener('click', () => {
    category = 'fruit';
    init();
  });
}

if (animalsButtonEle) {
  animalsButtonEle.addEventListener('click', () => {
    category = 'animals';
    init();
  });
}
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    if (category) {
      init();
    }
  });
}

