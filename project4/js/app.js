/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

 
let game = null;

const btnReset = document.getElementById('btn__reset');
const qwerty = document.getElementById('qwerty');
const button = document.querySelectorAll('.key');



btnReset.addEventListener('click',  () => {
    game = new Game();
    game.startGame();
});



qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e);
    }
});

document.addEventListener("keydown", function(e) {
    console.log(e.key);
    let key = qwerty.getElementsByTagName('button');

    for (let b = 0; b < button.length; b++) {
        // console.log(key[b].firstChild.nodeValue)

        if (e.key == key[b].firstChild.nodeValue) {
            console.log('true')
        } else {
            console.log('false')
        }

    }
    
  })


