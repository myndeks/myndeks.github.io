// QUESTION ARRAY
const questions = [
    {
        image: '1.jpg',
        question: "Ar leidžiama lenkti?",
        answers: ["Leidžiama", "Draudžiama", "Leidžiama, jeigu traktoriai važiuoja greičiau, nei 30km/h greičiu", 
    "Leidžiama, jeigu traktoriai važiuoja lėčiau, nei 30km/h greičiu"],
        correctAnswer: ['Leidžiama']
      },
      {
        image: '2.jpg',
        question: "Automobilio '2' privalo duoti kelia?",
        answers: ["Automobiliui 4", "Automobiliui 3", "Turi pirmumo teise važiuoti", "Automobiliui 1"],
        correctAnswer: ["Automobiliui 4"]
        },
      {
        image: '3.jpg',
        question: "Transporto priemonių trajektorijos kertasi kieme. Kurio automobilio vairuotojas privalo duoti kelią?",
        answers: ["A", "B", "Abu vienas kitams", "Tas kuris pradėjo važiuoti pirmas, tas turi pirmenybę"],
        correctAnswer: ["A", "B"],
      },
      {
        image: '4.jpg',
        question: "Kokiu didžiausiu greičiau leidžiama važiuoti lengvuoju automobiliu kelyje su asfalto danga ne gyvenvietėje",
        answers: ["90km/h", "70km/h", "100km/h", "60km/h"],
        correctAnswer: ["70km/h"]
      },
      {
        image: '5.jpg',
        question: "Dėl kokių priežasčių važiuojančia transporto priemonę gali 'traukti' į dešinę arba kairę",
        answers: ["Nevienodas oro slėgis priekinių ratų padanguose", "Virpa (vibruoja) kardinė pavara", "Blogai veikia amortizatoriai", "Blogai suvesta transporto priemones ratų geometrija"],
        correctAnswer: ["Nevienodas oro slėgis priekinių ratų padanguose"]
      }
]

// ARRAYS
const userAnswers = Array.from(questions, () => []);
const userWrongAnswers = Array.from(questions, () => []);

// DECLARATIONS
let countAnswers = null;
let currentQuestionNumber = 0;

// DOM ELEMENTS
const quizApp = document.getElementById('quiz-app');
const quizTop = document.getElementById('quiz-top');
const quizBottom = document.getElementById('quiz-bottom');
const app = document.getElementById('app');
const question = document.getElementById('question');
const answersDiv = document.getElementById('asnwers');


// ADD TIMER WHICH COUNTS 30MIN, AFTER TIME IS END CALL FUNCTION WHICH COUNTS RESULTS AND ENDS TEST
var sec = 1800,
    countDiv = document.getElementById("time"),
    secpass,
    countDown = setInterval(function () {
        'use strict';
        secpass();
    }, 1000);

function secpass() {
    'use strict';
    var min     = Math.floor(sec / 60),
        remSec  = sec % 60;
    if (remSec < 10) {
        remSec = '0' + remSec;
    }
    if (min < 10) {
        min = '0' + min;
    }
    countDiv.innerHTML = min + ":" + remSec;
    if (sec > 0) {
        sec = sec - 1;
    } else {
        clearInterval(countDown);        
        checkCorrectAnswer();
    }
}


// CREATE AND DISPLAY QUESTIONS
function displayQuestion (index) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('main-question')

    quizBottom.appendChild(questionDiv);

    const questionLis = questions.map(questions => questions.question)
    const questionH1 = document.createElement('h1');
    questionH1.textContent = questionLis[index];

    questionDiv.appendChild(questionH1);
}

// CREATE AND DISPLAY IMAGES
function displayImages (index) {
    const newDiv = document.querySelector('.image-box');
    
    const imageDiv = document.createElement('img');
    const imageList = questions.map(images => images.image)
    imageDiv.src = imageList[index];

    newDiv.appendChild(imageDiv);
}

// CREATE AND DISPLAY ANSWERS
function displayAnswers () {
    const {answers} = questions[currentQuestionNumber]
        const mainAnswerDiv = document.createElement('div');
        mainAnswerDiv.classList.add('main-answer');
        mainAnswerDiv.id = "answers";

        quizBottom.appendChild(mainAnswerDiv);

    answers.forEach((answer) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('question');
        mainAnswerDiv.appendChild(newDiv);

        const answersInput = document.createElement('input');
        const answerName = document.createElement('lable');
        
        answerName.textContent = answer;
        answerName.classList.add('label-text');
        answersInput.classList.add('input-field');
        answersInput.type = 'checkbox';
        answersInput.checked = userAnswers[currentQuestionNumber].includes(answer);

        answersInput.addEventListener("input", (e) => {
            if (e.target.checked) {
              userAnswers[currentQuestionNumber] = userAnswers[currentQuestionNumber].concat(answer);
            } else {
              userAnswers[currentQuestionNumber] = userAnswers[currentQuestionNumber].filter(
                (userAnswer) => userAnswer !== answer
              );
            }
        });

          newDiv.appendChild(answersInput);
          newDiv.appendChild(answerName);
    })
}


// CREATE AND DISPLAY PAGINATION
function displayPagination () {
    
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('question-pagination');
    app.appendChild(paginationDiv);

    for (let i = 0; i < questions.length; i++) {
        const spanPagination = document.createElement('span');
        spanPagination.innerText = i+1;
        spanPagination.classList.add('pagination');
        paginationDiv.appendChild(spanPagination);
    }
}

//FUNCTION TO NAVIGATE THREW QUESTIONS
function nextQuestion () {

    displayImages(currentQuestionNumber);
    displayQuestion(currentQuestionNumber);
    displayAnswers(currentQuestionNumber);


    document.querySelectorAll('.question-pagination').forEach(element => {
        element.addEventListener('click', (e) => {
            currentQuestionNumber = e.target.firstChild.nodeValue - 1;

            quizBottom.textContent = null;
            document.querySelector('.image-box').textContent = null;
    
            displayImages(currentQuestionNumber);
            displayQuestion(currentQuestionNumber);
            displayAnswers(currentQuestionNumber);

            if (renderResults.called) {
                displayWrongAnswers(currentQuestionNumber);
            }

        });
    })
}

// WHEN "BAIGTI TESTA" BUTTON IS CLICKED CHECK CORRECT ANSWERS AND DISPLAY POINTS
let correctAnswerCount = null;
function checkCorrectAnswer () {

    questions.forEach((el, i) => {
        let checkUserAnswer = String(userAnswers[i]);
        let checkArrayAnswer = String(questions[i].correctAnswer);

        if (checkUserAnswer === checkArrayAnswer) {
            countAnswers = countAnswers + 1;
        }
    })

    renderResults();
}

// FUNCTION TO ADD END QUIZ BUTTON
function addEndButton () {
    const endButton = document.createElement('button');
    endButton.textContent = "BAIGTI TESTA";
    endButton.classList.add('button');

    endButton.addEventListener('click', (e) => {
        checkCorrectAnswer();     
    })
    app.appendChild(endButton);
}

// FUNCTION TO RENDER RESULTS
function renderResults () {
    // const app = document.getElementById('app');
    // app.innerHTML = null;

    const h1 = document.createElement('h1');
    h1.classList.add('end-quiz-render')

    if (countAnswers) {
        const convertToPercentage = (countAnswers * 100) / questions.length ;
        h1.textContent = `Jūs surinkote ${convertToPercentage.toFixed(0)}% iš 100%`;
    } else {
        h1.textContent = `Jūs surinkote 0% iš 100%`;
    }
    app.appendChild(h1);

    displayWrongAnswers(currentQuestionNumber);

    renderResults.called = true;
}

// RENDER THE QUIZ
function renderQuiz () {
    displayPagination();
    nextQuestion();
    addEndButton();
}
renderQuiz();


// ADD FUNCTION TO MARK RED WRONG ANSWERS AND MARK GREEN CORRECT ANSWERS
function displayWrongAnswers (index) {
    
    const labels = document.querySelectorAll('.label-text');
    let checkArrayAnswer = String(questions[index].correctAnswer);

    labels.forEach((el, i) => {
        console.log(checkArrayAnswer + ' ' + el.textContent)

        if (checkArrayAnswer.includes(el.textContent)) {
            el.classList.add('correct');
            const inputField = document.querySelectorAll('.input-field');

            inputField.forEach((input) => {
                    input.disabled = true;
            })
        } else {
            el.classList.add('wrong');
            el.disabled = true;
            document.querySelectorAll('input').disabled = true;
        }
    })
}
