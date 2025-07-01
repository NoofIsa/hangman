
/*-------------- Constants -------------*/
const alphabet =['a', 'b', 'c', 'd', 'e', 'f', 'g',
                 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
                 'o', 'p', 'q', 'r', 's', 't', 'u',
                  'v', 'w', 'x', 'y', 'z'];

const fruite =['apple', 'grape', 'melon', 'mango', 'peach', 'dates', 'berry', 'lemon', 'olive', 'guava'];


/*---------- Variables (state) ---------*/


/*----- Cached Element References  -----*/
const lines = document.querySelectorAll('.dash');


/*-------------- Functions -------------*/
lines.forEach(element => {
    element.textContent = "_";
  });

/*----------- Event Listeners ----------*/

  