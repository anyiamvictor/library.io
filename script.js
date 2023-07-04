'use strict'

const bookInput = document.getElementById('user-input_book').value;
const stars = document.querySelectorAll('.star');
const rating = document.querySelector('#rating');
const toggleRead = document.querySelector('#toggle');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const btnSubmit = document.querySelector('#btn-submit');

let myLibrary = [];

function Book(title, author, numberOfpages, isReadState, rating ) {
    this.title = title;
    this.author = author;
    this.pages = numberOfpages;
    this.isRead = isReadState;
    this.rating = rating;

}


// A modal window for the form
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.style.background='gray'
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
    } else {
      // If the clicked star is not active, update the rating and add 'active' class to the clicked star and previous siblings
      stars.forEach((s, i) => {
        if (i <= index) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
      const rate_value = index + 1;
      rating.textContent = `${rate_value} Star Rating`;
    }
  });
});
