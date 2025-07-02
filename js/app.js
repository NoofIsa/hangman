
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
let msg;
let winner;

//let life;
/*----- Cached Element References  -----*/
const lines = document.querySelectorAll('.dash');
const chance = document.querySelectorAll('.Bomb');
document.addEventListener('keydown', handleKey);
const wrongBox = document.querySelector('.box');
const fruiteButtonEle = document.querySelector('#Fruits');
const resultDisplayEl = document.querySelector('#result-display')
const resetBtn = document.getElementById('resetButton');


//console.log(fruiteButtonEle);

/*-------------- Functions -------------*/
function getComputerChoice()
 {
    // generate a random number 0-4
    const randomIndex = Math.floor(Math.random() * fruite.length);
    // select the item from the array
    return fruite[randomIndex];
}


function init() {
  guessedLetters = [];
  wrongGusess =[];
  msg ="";
  wrongBox.textContent='';

  //winner = true;
  
  
  // Track how many bombs
  life = 0;
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
function handleKey(event) {
  const letter = event.key.toLowerCase();
  if (!alphabet.includes(letter))
     return;
  if (guessedLetters.includes(letter)) 
    return;

  guessedLetters.push(letter);

  if (computerChoice.includes(letter)) {
    console.log("Correct:", letter);
    displayWord()
  } else {
    wrongGusess.push(letter);
    console.log("Wrong:", letter);
    updateWrongBox();
    console.log("life",life);
    updateLife();
    compare();
    render();
    

  }

}



// Update bombs by removing one for each wrong guess
function updateLife() {
  if (life < chance.length) {
    chance[life].textContent = ''; // Remove one bomb
    life++;
  } 
 else 
  {
    console.log("No bombs left. Game over!");
     
    //alert("Game Over! No bombs left. The word is " +  computerChoice);
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
    resultDisplayEl.textContent = `${msg} "The word was "${computerChoice}.`;
    document.removeEventListener('keydown', handleKey); // stop the game after win/loss
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
resetBtn.addEventListener('click', init);
/*fruiteButtonEle.addEventListener('click', () => {
  console.log('You clicked me!');
});*/


