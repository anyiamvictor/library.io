'use strict'

// variable Declarations
const bookTitle = document.getElementById('user-input_book_title');
const bookAuthor = document.getElementById('user-input_author');
const pageNumbers = document.getElementById('user-input_page_numbers');
const toggleRead = document.querySelector('#toggle');
const bookSummary = document.getElementById('user-input_summary');
let totalBookContent = document.querySelector('#total_book_content');
let totalBookCompleted = document.querySelector('#total_book_completed');
let totalBookIncomplete = document.querySelector('#total_book_incomplete');
let bookSection = document.querySelector('.add_books_section');
const newBook = document.querySelector('.new_book');
const addBooksSection = document.querySelector('.add_books_section');
const deleteBook = document.querySelector('#minus');
const deleteInput = document.querySelector('#delete_input_id');
const stars = document.querySelectorAll('.star');
const rating = document.querySelector('#rating');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const btnSubmit = document.querySelector('#btn-submit');
const libraryform = document.querySelector('#library-form');
let rate_value;
let myLibrary = [];
let book;


// creating a Book object with Constructor Function
function Book(title, author, numberOfpages, isReadState, rating , bookSummarization) {
    this.title = title;
    this.author = author;
    this.numberOfpages = numberOfpages;
    this.isReadState = isReadState;
    this.rating = rating;
  this.bookSummarization = bookSummarization;
}

// Book Prototype to be used by all instances of the Book
Book.prototype.id = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let id = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomLetter = alphabet.charAt(randomIndex);
    id += randomLetter;
  }

  return id;
};

// A modal window for the form
openModalBtn.addEventListener('click', () => {   
    libraryform.reset();
    modal.style.display = 'block';
});

// The Form window for adding the books and its properties
libraryform.addEventListener('submit', function (e) {
    e.preventDefault();
    
    let bookTitleValue = bookTitle.value;
    let bookAuthorValue = bookAuthor.value;
    let pageNumbersValue = pageNumbers.value;
    let toggleReadValue;
    if (toggleRead.checked) toggleReadValue = true;
    if (!toggleRead.checked) toggleReadValue = false;
    let bookSummaryValue = bookSummary.value;
  
   
  book = new Book(bookTitleValue, bookAuthorValue, pageNumbersValue, toggleReadValue, bookSummaryValue);
  
  // creating a unique id for each book
  const word = bookTitleValue.slice(0, 3);
  const bookIdContent = book.id();
  const bookId = `${word}--${bookIdContent}`;
  book.identity = bookId;
  
  // adding the book
    const newBookHTML =
        `
      <div class="new_book" id=${bookId}>
      <h3 class=" new_book_h"> Book ID:</h3><p class=" new_book_p" id="book_id">${bookId}</p>
      <h3 class=" new_book_h"> Book Title:</h3><p class=" new_book_p" id="book_title_content">${bookTitleValue}</p>
      <h3 class=" new_book_h"> Book Author:</h3><p class=" new_book_p" id="book_author_content">${bookAuthorValue}</p>
      <h3 class=" new_book_h"> Number of Pages:</h3><p class=" new_book_p" id="book_pgnum_content">${pageNumbersValue}</p>
      <h3 class=" new_book_h"> My Rating:</h3><p class=" new_book_p" id="book_rating_content">${rate_value ? rate_value : '0'} Star rating</p>
      <h3 class=" new_book_h"> Status:</h3><p class=" new_book_p" id="book_toggle_content">${toggleReadValue ? 'Finished Reading' : 'In Progress'}</p>
      <h3 class=" new_book_h" id="summary_heading"> Summary</h3><p class=" new_book_p" id="book_title_summary">${bookSummaryValue ? bookSummaryValue : '<i>No Summary Provided</i>'}</p>
      </div>`;
   bookSection.insertAdjacentHTML('beforeend', newBookHTML);
          
    
  // add the created book to the Library Array
  myLibrary.push(book);
    
  // updating the Total Books in the Library Summary User interface
  totalBookContent.textContent = myLibrary.length;
  
  //select the close button of all newly created books
  const bookCloseElements = document.querySelectorAll('.book_close');


  // updating the completed and unfinished Books in the Library Summary User interface
    if (toggleReadValue) {
        +(totalBookCompleted.textContent++);
    }
    else {
        +(totalBookIncomplete.textContent++);
        
    }

    // resets all parametars

  this.reset();  
      
  // reset the star rating
  stars.forEach((star) => {
    star.classList.remove('active');
  });
  rating.textContent = '0 Star Rating';
  rate_value = 0;
  

  // close form after submitting
  modal.style.display = 'none';   
})

// Button and logic for deleting a book by it id and updating the UI
deleteBook.addEventListener('click', function (e) {
    deleteInput.classList.toggle('hidden');
    deleteInput.focus();

deleteInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    this.classList.add('hidden');
    const deleteInputValue = deleteInput.value;
    let deleteFoundBook = myLibrary.find(item => item.identity === deleteInputValue);
    if (deleteFoundBook) {
      let elementToDelete = document.getElementById(`${deleteFoundBook.identity}`);
      elementToDelete.remove();      
      let index = myLibrary.indexOf(deleteFoundBook);
      myLibrary.splice(index, 1);
      totalBookContent.textContent = myLibrary.length;
    }
    try {
  if (deleteInputValue !== deleteFoundBook.identity) {
    throw new Error('The ID number you entered does not match');
  }
} catch (error) {
  alert(error.message);
}

    if (deleteFoundBook.isReadState == true) +(totalBookCompleted.textContent)--;
    if (deleteFoundBook.isReadState == false) +(totalBookIncomplete.textContent)--;
    }   
  });  

  })

  // close button for the modal(form)
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// closing the modal(form) by clicking outside it
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

//Star Rating feauture for the books
stars.forEach((star, index) => {
        star.addEventListener('click', () => {
       
    if (star.classList.contains('active')) {
      // If the clicked star is already active, remove 'active' class from all stars
      stars.forEach((s) => {
        s.classList.remove('active');
      });
      rating.textContent = '0 Star Rating';
    } else
    {
      // If the clicked star is not active, update the rating and add 'active' class to the clicked star and previous siblings
      stars.forEach((s, i) => {
        if (i <= index) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
       rate_value = index + 1;
        rating.textContent = `${rate_value} Star Rating`;
        return rate_value;
    }
  });
});



// API call for the ramdon quote of the day
//code goes here