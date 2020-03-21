// On page load, the cursor appears in the "Name" field, ready for a user to type.
const name = document.getElementById('name');
name.focus();

// "Your job role" text field appears when user selects "Other" from the Job Role menu.
const otherTitle = document.getElementById('other-title');
otherTitle.style.display = 'none';

const title = document.getElementById('title');
title.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherTitle.style.display = 'block';
    } else {
        otherTitle.style.display = 'none';
    }
});


// Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.
// When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
// Color” drop down menu is hidden until a T-Shirt design is selected.

// Set default Color option
const tShirtDesign = document.getElementById('design');
tShirtDesign[0].selected = 'select';

const tShirtColor = document.getElementById('color');
const tShirtNewValue = document.createElement('option');
const colorSelections = document.getElementById('colors-js-puns');
colorSelections.style.display = 'none';
tShirtNewValue.textContent = 'Please select a T-shirt theme';
tShirtNewValue.selected = 'select';
tShirtColor.add(tShirtNewValue, tShirtColor[0]);

// Hide the colors in the “Color” drop down menu.

tShirtColor[1].style.display = 'none';
tShirtColor[2].style.display = 'none';
tShirtColor[3].style.display = 'none';
tShirtColor[4].style.display = 'none';
tShirtColor[5].style.display = 'none';
tShirtColor[6].style.display = 'none';

tShirtDesign.addEventListener("change", (e) => {
    const selectedValue = e.target.value;

    const color = document.getElementById('color');

        if (selectedValue === 'js puns') {
            colorSelections.style.display = 'block';
            tShirtColor[1].style.display = 'block';
            tShirtColor[1].selected = 'select';
            tShirtColor[2].style.display = 'block';
            tShirtColor[3].style.display = 'block';
            tShirtColor[4].style.display = 'none';
            tShirtColor[5].style.display = 'none';
            tShirtColor[0].style.display = 'none';
            tShirtColor[6].style.display = 'none';
        } else if (selectedValue === 'heart js') {
            colorSelections.style.display = 'block';
            tShirtColor[0].style.display = 'none';
            tShirtColor[1].style.display = 'none';
            tShirtColor[2].style.display = 'none';
            tShirtColor[3].style.display = 'none';
            tShirtColor[4].selected = 'select';
            tShirtColor[4].style.display = 'block';
            tShirtColor[5].style.display = 'block';
            tShirtColor[6].style.display = 'block'; 
        } else if (selectedValue === 'Select Theme') {
            colorSelections.style.display = 'none'; 
        }

});


// User cannot select two activities that are at the same time.
// Total cost of selected activities is calculated and displayed below the list of activities.

const activities = document.querySelector('.activities');
const legend = document.getElementsByName('legend');
const newDiv = document.createElement('div');
activities.appendChild(newDiv);

let totalCost  = 0;


// Calculate totalcost of selected activities
activities.addEventListener('change', (e) => {
    const cost = parseInt(e.target.dataset.cost);
    if (e.target.checked) {

        totalCost+=cost;

    } else {
        totalCost-=cost;
    }
    newDiv.textContent = `Total  $${totalCost}`;

    if (totalCost === 0) {
        newDiv.style.display = 'none';
    } else {
        newDiv.style.display = 'block';
    }

    // Hide activities which contains same date and time
    const checkboxes = document.querySelectorAll('.activities input');
    const label = document.querySelectorAll('.activities label');

    for (let i = 0; i < checkboxes.length; i++) {
    

        if (checkboxes[i].dataset.dayAndTime === e.target.dataset.dayAndTime && e.target != checkboxes[i]) {
            if (e.target.checked) {
                checkboxes[i].disabled = true;
                label[i].style.color = "#696969"; 
            } else {
                label[i].style.color = "#000"; 
                checkboxes[i].disabled = false;
            }

        }
        
    }
});


// The "Credit Card" payment option is selected by default.
// Payment option in the select menu matches the payment option displayed on the page.
const paymentOption = document.getElementById('payment');
paymentOption[0].style.display = 'none';
paymentOption[1].selected = 'select';

// When a user chooses a payment option, the chosen payment section is revealed and the other payment sections are hidden.
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
paypal.style.display = 'none';
bitcoin.style.display = 'none';

paymentOption.addEventListener('change', (e) => {
    if (e.target.value === 'credit card') {
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value === 'paypal') {
        creditCard.style.display = 'none';
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';      
    } else if (e.target.value === 'bitcoin') {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';   
    }
});


// Form cannot be submitted (the page does not refresh when the submit button is clicked) until the following requirements have been met: 
    // Name field isn’t blank.
    // Email field contains validly formatted e-mail address: (doesn’t have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com, for example).
    // At least one checkbox under "Register for Activities" section must be selected.
    // If "Credit Card" is the selected payment option, the three fields accept only numbers: a 13 to 16-digit credit card number, a 5-digit zip code, and 3-number CVV value. 
    const form = document.querySelector('form');

    // Validations
    const validateName = () => {
        let nameInput = document.getElementById('name');
        nameInput = nameInput.value;
        const regexName = /^[A-Za-z]+\s?([A-Za-z]+)?$/; 
        if(regexName.test(nameInput)){
            return true;
        } else{
            return false;
        }
      }
    
    const validateEmail = () => {
        let email = document.getElementById('mail');
        email = email.value;
        const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if(regexEmail.test(email)){
            return true;
        } else{
            return false;
        }
    }
    
    const validateCardNumber = () => {
        let cardNumber = document.getElementById('cc-num');
        cardNumber = cardNumber.value;
        const regexCardNumber = /^\d{13,16}$/;
        if(regexCardNumber.test(cardNumber)){
            return true;
        } else{
            return false;
        }
      }
    
    const validateZipCode = () => {
        let zipCode = document.getElementById('zip');
        zipCode = zipCode.value;
        const regexZipCode = /^\d{5}$|^\d{5}-\d{4}$/;
        if(regexZipCode.test(zipCode)){
            return true;
        } else{
            return false;
        }
      }
    
      const validateCvvCode = () => {
        let cvv = document.getElementById('cvv');
        cvv = cvv.value;
        const regexCvvCode = /^[0-9]{3,3}$/;
        if(regexCvvCode.test(cvv)){
            return true;
        } else{
            return false;
        }
      }
    
      const validateActivities = () => {
        const inputActivities = document.querySelectorAll('input[type="checkbox"]');
          for (let i = 0; i < inputActivities.length; i ++) {
              if(inputActivities[i].checked === true) {           
                  return true;
              } else if (inputActivities[i].checekd === false) {
                return false;
              }
          }
       }

    form.addEventListener('submit', (e) => {
    
// Chech if all entered fields contains correct data if not not allow to submit form.
        if (paymentOption[1].selected === false) {
            if (validateName() === true && 
            validateEmail() === true &&  
            validateActivities() === true
            ) {
            return true;
        } else {
            e.preventDefault();
            displayErrorMessage();
            return false;
        }
        } else if (paymentOption[1].selected === true) {
            if (validateName() === true && 
            validateEmail() === true &&  
            validateCardNumber() === true && 
            validateZipCode() === true && 
            validateCvvCode() === true && 
            validateActivities() === true
            ) {
            return true;
        } else {
            e.preventDefault();
            displayErrorMessage();
            return false;
        }
        }
    })

// Display Error please fill in all fiels marked red color
const displayErrorMessage = () => {
    const errorMessageDisplay = document.createElement('div');
    errorMessageDisplay.textContent = `Please enter information in all fields marked red color`;
    errorMessageDisplay.style.color = 'red';

    form.appendChild(errorMessageDisplay);
}

const formField = document.querySelector('form fieldset');
const emailField = document.querySelector('label[for="title"]');
const emailErrorMessage = document.createElement('span');
formField.insertBefore(emailErrorMessage, emailField);

// Check if email is valid or not, if not display error message Please Enter Correct Email
const errorEmailField = () => {
    
    let email = document.getElementById('mail');

    if (validateEmail() === false) { 
        emailErrorMessage.style.display = '';
        emailErrorMessage.classList.add('msg');
        emailErrorMessage.textContent = `Please Enter Correct Email`;
        } else { 
        emailErrorMessage.classList.add('msg');
        emailErrorMessage.style.display = 'none';
    }
}
    


// On submission, the form provides an error indication or message for each field that requires validation: 
    // Name field
    // Email field
    // “Register for Activities” checkboxes
    // Credit Card number, Zip code, and CVV, only if the credit card payment method is selected.

const nameField = document.getElementById('name');
const mailField = document.getElementById('mail');
const ccNumField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const activitiesField = document.querySelector('.activities legend');


// Function to display border color red when wrong information are typed in. And inherit, when correct is typed

function displayRed(validate, inputName) {
    if (validate() === true) {
        inputName.style.borderColor = 'inherit';
    } else {
        inputName.style.borderColor = 'red';
    }
}

// Chech for real time errors
    nameField.addEventListener('keyup',  function() {
        displayRed(validateName, nameField);
    });

    mailField.addEventListener('keyup',  function() {
        // Call function for real time error on email
        errorEmailField();  
        displayRed(validateEmail, mailField);
    });

    ccNumField.addEventListener('keyup',  function() {
        displayRed(validateCardNumber, ccNumField);
    });

    zipField.addEventListener('keyup',  function() {
        displayRed(validateZipCode, zipField);
    });

    cvvField.addEventListener('keyup',  function() {
        displayRed(validateCvvCode, cvvField);
    });

    activities.addEventListener('keyup', (e) => {
        if (validateActivities() === true) {  
        } else {
            const activitiesField = document.querySelector('.activities legend');
            activitiesField.style.color = 'red';
        }
    });


// Chech for wrong entered information when submit button pressed
    form.addEventListener('submit',  function() {
        displayRed(validateName, nameField);
    });

    form.addEventListener('submit',  function() { 
        displayRed(validateEmail, mailField);
    });

    form.addEventListener('submit',  function() {
        displayRed(validateCardNumber, ccNumField);
    });

    form.addEventListener('submit',  function() {
        displayRed(validateZipCode, zipField);
    });

    form.addEventListener('submit',  function() {
        displayRed(validateCvvCode, cvvField);
    });

    form.addEventListener('submit', () => {
        if (validateActivities() === true) {   
        } else {
            const activitiesField = document.querySelector('.activities legend');
            activitiesField.style.color = 'red';
        }
    });