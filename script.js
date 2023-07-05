'use strict'

const bookTitle = document.getElementById('user-input_book_title');
const bookAuthor = document.getElementById('user-input_author');
const pageNumbers = document.getElementById('user-input_page_numbers');
const toggleRead = document.querySelector('#toggle');
const bookSummary = document.getElementById('user-input_summary');
let bookSection = document.querySelector('.add_books_section');


const stars = document.querySelectorAll('.star');
const rating = document.querySelector('#rating');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const btnSubmit = document.querySelector('#btn-submit');
const closeBook = document.getElementById('book_close');
const newBook = document.querySelector('.new_book');
const libraryform = document.querySelector('#library-form');
const formControl = document.querySelector('.check-rate');
let rate_value;




let myLibrary = [];

function Book(title, author, numberOfpages, isReadState, rating , bookSummarization) {
    this.title = title;
    this.author = author;
    this.pages = numberOfpages;
    this.isRead = isReadState;
    this.rating = rating;
    this.bookSummarization = bookSummarization;
}




// A modal window for the form
openModalBtn.addEventListener('click', () => {   
    libraryform.reset();
    modal.style.display = 'block';
});


libraryform.addEventListener('submit', function (e) {
    e.preventDefault();
    let bookTitleValue = bookTitle.value;
    let bookAuthorValue = bookAuthor.value;
    let pageNumbersValue = pageNumbers.value;
    let bookSummaryValue = bookSummary.value;
    let toggleReadValue;
    if (toggleRead.checked) toggleReadValue = 'Finished Reading';
    if (!toggleRead.checked) toggleReadValue = 'In Progress';
    const bookItem = new Book(
        bookTitleValue,
        bookAuthorValue,
        pageNumbersValue,
        toggleReadValue,
        rate_value,
        bookSummaryValue);
  
    console.log(bookItem);

    const newBookHTML =
      `
      <div class="new_book">
      <h3 class=" new_book_h"> Book Title:</h3><p class=" new_book_p" id="book_title_content">${bookTitleValue}</p>
      <h3 class=" new_book_h"> Book Author:</h3><p class=" new_book_p" id="book_title_content">${bookAuthorValue}</p>
      <h3 class=" new_book_h"> Number of Pages:</h3><p class=" new_book_p" id="book_title_content">${pageNumbersValue}</p>
      <h3 class=" new_book_h"> My Rating:</h3><p class=" new_book_p" id="book_title_content">${rate_value ? rate_value : '0'} Star rating</p>
      <h3 class=" new_book_h"> Status:</h3><p class=" new_book_p" id="book_title_content">${toggleReadValue}</p>
      <h3 class=" new_book_h" id="summary_heading"> Summary</h3><p class=" new_book_p" id="book_title_summary">${bookSummaryValue?bookSummaryValue:'<i>No Summary Provided</i>'}</p>
      <span class="book_close" id="book_close"></span>
        
        </div>`;
    bookSection.insertAdjacentHTML('beforeend', newBookHTML);

const bookCloseElements = document.querySelectorAll('.book_close');
  // Add click event listener to each book_close element
  bookCloseElements.forEach((bookClose) => {
    bookClose.addEventListener('click', () => {
      // Get the parent new_book element and remove it
      const newBook = bookClose.closest('.new_book');
      newBook.remove();
    });
  });
    // add the book to the Library Array from here i can list all books added
    myLibrary.push(bookItem);

    // resets all parametars
        this.reset();
        // reset the star rating
        stars.forEach((star) => {
        star.classList.remove('active');
        });
        rating.textContent = '0 Star Rating';
        rate_value = 0;
        modal.style.display = 'none';
    
    
    });


closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

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



// API call for the ramdom quote of the day
//code goes here