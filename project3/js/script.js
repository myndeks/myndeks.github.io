/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Get all students list
const studentList = document.getElementsByClassName('student-item');

// Declare how many students we want to show per page
const itemsPerPage = 10;


// Creaging function which displays itemsPerPage (how many studens we want to display per page) in this case 10;
const showPage = (list, page) => {
   let startIndexPage = (page * itemsPerPage) - itemsPerPage;
   let endIndexPage = page * itemsPerPage;

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndexPage && i < endIndexPage) {
         list[i].style.display = '';
      } else {
       list[i].style.display = 'none';
      }
   }

}

// Call function
showPage(studentList, 1);

// Create function which will display paginations link
const appendPageLinks = (list) => {
   // Declare how many pages we will need to display
   let = pagesNeed = Math.ceil(list.length / itemsPerPage);

   // Create div element and add class name of pagination
   const div = document.createElement('div');
   div.className = 'pagination';

   // Get class .page and append div to it
   const page = document.querySelector('.page');
   page.appendChild(div);

   // create Ul  element and append to div.
   const ul = document.createElement('ul');
   div.appendChild(ul);

   //Loop thru pagesNeed and create and pagination links
   for (let i = 1; i <= pagesNeed; i++) {
      const li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML = `<a href="#"> ${i} </a>`;

      // Add active class to the first pagination link 
      if (i === 1) {
         li.children[0].className = 'active';
      }
   }
   
   // Creating addEventListener to add class on link we clicked and remove of prievouse one.
   div.addEventListener('click', (event) => {

      let links = document.getElementsByTagName('A');

      if(event.target.tagName === 'A'){
         for(let j = 0; j < links.length; j++){
            links[j].classList.remove('active');
         };
            event.target.classList.add('active');
            let pageNum = event.target.textContent;
            showPage(studentList, pageNum);
      };
   });


}

// Call Function
appendPageLinks(studentList);


// DOM ELEMENTS
// Geting Element Page header
const headerDiv = document.querySelector('.page-header');

// Creating and append new div elemenet
const searchDIV = document.createElement('div');
searchDIV.classList.add('student-search');
headerDiv.appendChild(searchDIV);

// Creating and append input element
const searchInput = document.createElement('input');
searchInput.placeholder = 'Search for students...';
searchDIV.appendChild(searchInput);

// Createing butotn
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchDIV.appendChild(searchButton);

// Creating Allert Message No when no users found
const page = document.querySelector('.page');
const p = document.createElement('p');
p.style.display = 'none';
const studentUL = document.querySelector('.student-list');
p.textContent = `No students found`;
page.insertBefore(p,studentUL);

// Create search box function
const searchBox = () => {

   // Createa an array 
   let searchMatch = [];

   // Clear an array 
   searchMatch = [];

   // Get pagination elements
   let div = document.getElementsByClassName("pagination")[0]; 
      
   // Remove all pagination buttons
   if(div) { 
      div.remove();
   };

// Loop thru student list and if there is maching studens push them into an array, and studens which is not maching
// search results do not display on the page.
      for(let k = 0; k < studentList.length; k++){
         let text = searchInput.value;
         studentList[k].style.display = 'none';
         if (studentList[k].innerText.toUpperCase().includes(text.toUpperCase())) {
            searchMatch.push(studentList[k]);
         }
         if (searchMatch.length === 0) {
            p.style.display = '';
         } else {
            p.style.display = 'none';
         }
      }
      showPage(searchMatch, 1);
      appendPageLinks(searchMatch);
}

// Create add event listener to act when users type someting in the search box
searchInput.addEventListener('keyup', (e) => {
   // Call search function
   searchBox();
});
