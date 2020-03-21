/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
     constructor(phrase) {
        this.phrase = phrase.toLowerCase();
     }

     /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
      const pharseDiv = document.getElementById('phrase');
      const pharseUl = pharseDiv.querySelector('ul');
      
      for(let i = 0; i < this.phrase.length; i++) {
         const pharseLi = document.createElement('li');
         pharseLi.innerHTML = this.phrase[i];

         if (this.phrase[i] === ' ') {
            pharseLi.className = 'space';
         } else {
            pharseLi.className = 'hide letter ' + this.phrase[i];
         }
         pharseUl.appendChild(pharseLi);
      }

    };

    /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
   checkLetter(letter) {
      if (this.phrase.indexOf(letter) > -1) {
         return true;
      }
      return false;
   };

   /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
   showMatchedLetter(letter) {
      
      for (let j = 0; j < this.phrase.length; j++) {

         const pharseLi = document.querySelectorAll('li');

         if (this.phrase[j] === letter) {
            pharseLi[j].className = 'show';
         }
         
      }
   };
 }
