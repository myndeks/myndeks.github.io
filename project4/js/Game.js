/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {

    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

         /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */


   createPhrases() {
    const phrases = [
        new Phrase('Tomato'),
        new Phrase('Carrot'),
        new Phrase('Pumpkin'),
        new Phrase('Apple'),
        new Phrase('Watermelon')
    ];
    return phrases;
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase(phrases) {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)]
    };

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        const overlay = document.getElementById('overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        const checkLetter = document.getElementsByClassName('hide letter'); 
       
        if (checkLetter.length > 0) {
            return false;
        } else {
            return true;
        }
    
    };   

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const stars = document.querySelectorAll('img');
        let lifes = stars.length - this.missed;

        if (lifes > 0) {
            stars[this.missed].src = "images/lostHeart.png";
            lifes -= 1;
            this.missed += 1;
         };

         if (lifes === 0) {
             this.gameOver(false);
         }
    }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const gameOverMessage = document.getElementById('game-over-message');

        if (gameWon === true) {
            overlay.style.display = 'block';
            overlay.className = 'win';
            gameOverMessage.textContent = `Greate job!`;
        } else if (gameWon === false) {
            overlay.style.display = 'block';
            overlay.className = 'lose';
            gameOverMessage.textContent = `Sorry, better luck next time!`;
        }

        this.resetGame();

    };

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button) {
        button.target.disabled = true;

        let buttonLetter = button.target.textContent

        if (this.activePhrase.checkLetter(buttonLetter)) {
            this.activePhrase.showMatchedLetter(buttonLetter);
            button.target.className = 'chosen';
            if (this.checkForWin()) {
                this.gameOver(true);
              }
        
        } else {
            button.target.className = 'wrong';
            this.removeLife();
        }

    };

    resetGame() {

        // Remove LI elements
        const pharseUl = document.querySelectorAll('#phrase ul');
        pharseUl[0].innerHTML = " ";

        // Remove Class from buttons and enable them
        let buttons = document.querySelectorAll('#qwerty button');
        for (let m = 0; m < buttons.length; m++) {
                buttons[m].disabled = false;
                buttons[m].classList.remove('chosen');
                buttons[m].classList.remove('wrong');   
        }

        // Reset Stars
        this.missed = 0;
        const stars = document.querySelectorAll('.tries');
        for (let n = 0; n < stars.length; n++) {
            stars[n].firstElementChild.src = 'images/liveHeart.png';
            
        }
     }
}