
/*-------------- Constants -------------*/
const alphabet =['a', 'b', 'c', 'd', 'e', 'f', 'g',
                 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
                 'o', 'p', 'q', 'r', 's', 't', 'u',
                  'v', 'w', 'x', 'y', 'z'];

const fruite =['apple', 'grape', 'melon', 'mango', 'peach', 'dates', 'berry', 'lemon', 'olive', 'guava'];


/*---------- Variables (state) ---------*/

let computerChoice;
let guessedLetters;
let wrongGusess;
/*----- Cached Element References  -----*/
const lines = document.querySelectorAll('.dash');
const chance = document.querySelectorAll('.Bomb');
document.addEventListener('keydown', handleKey);
const wrongBox = document.querySelector('.box');


/*-------------- Functions -------------*/
function getComputerChoice()
 {
    // generate a random number 0-4
    const randomIndex = Math.floor(Math.random() * fruite.length)
    // select the item from the array
    return fruite[randomIndex]
}


function init() {
  guessedLetters = [];
  wrongGusess =[];
  computerChoice = getComputerChoice();
  console.log("Computer chose:", computerChoice);

  for (let i = 0; i < lines.length; i++) {
    if (i < computerChoice.length) {
      lines[i].textContent = "_";
      lines[i].style.display = "inline-block";
    }     
  }

  chance.forEach(el => el.textContent = "💣");
}



// function to handle the key press "letter that user press"
function handleKey(e) {
  const letter = e.key.toLowerCase();
  if (!alphabet.includes(letter)) return;
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (computerChoice.includes(letter)) {
    console.log("Correct:", letter);
  } else {
    wrongGusess.push(letter);
    console.log("Wrong:", letter);
    updateWrongBox();
  }

  displayWord();
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

function updateDashes() 
{
  dashes.forEach((value, index) => {
    lines[index].textContent = value;

  });
}

function updateWrongBox() {
  if (wrongGusess.length === 0) {
    wrongBox.textContent = "Wrong letters";
  } else {
    wrongBox.textContent = `"Wrong letters : " ${wrongGusess}`;
  }
}


init();

/*----------- Event Listeners ----------*/

  lines.forEach(element => {
    element.textContent = "_";
  });

chance.forEach(element => {
  element.textContent = "💣";
});

