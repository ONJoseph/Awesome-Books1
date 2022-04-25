/* eslint-disable no-plusplus */
const displaList = document.getElementById('Book-List');
const displaBooks = document.getElementById('Add-Books');
const displaContact = document.getElementById('contact');
class Library {
  constructor(Title, Author, ID) {
    this.title = Title;
    this.author = Author;
    this.id = ID;
  }

  addBook = (bookTitle, bookAuthor, bookID) => {
    const awesomeBook = {
      title: bookTitle,
      author: bookAuthor,
      id: bookID,
    };
    this.awesomeBooks.push(awesomeBook);
  };

  removeBook = (id) => {
    this.awesomeBooks = this.awesomeBooks.filter((book) => book.id !== id);
  };
}

const library = new Library();
library.awesomeBooks = [];

const saveBooks = () => {
  localStorage.setItem('myAwesomeBooks', JSON.stringify(library.awesomeBooks));
};

const getStorageData = () => {
  const localFormData = JSON.parse(localStorage.getItem('myAwesomeBooks'));
  if (localFormData == null) {
    library.awesomeBooks = [];
  } else {
    library.awesomeBooks = localFormData;
  }
};

window.onload = getStorageData();

// Display Books Data section

const displayBooks = () => {
  const booksList = document.querySelector('.books');
  booksList.innerHTML = '';
  let i = 0;
  library.awesomeBooks.forEach((book) => {
    i++;
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    if (i % 2 !== 0) {
      bookElement.classList.add('odd-color');
    }
    const headTitle = document.createElement('h2');
    headTitle.textContent = `'${book.title}' by ${book.author}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    removeBtn.addEventListener('click', () => {
      library.removeBook(book.id);
      displayBooks();
    });
    bookElement.appendChild(headTitle);
    bookElement.appendChild(removeBtn);
    booksList.appendChild(bookElement);
  });
  saveBooks();
};

const generateBookID = () => {
  const id = Math.random().toString();
  return id;
};

// Get Form Data from Local Storage section

const form = document.querySelector('form');
const title = form.querySelector('#title');
const author = form.querySelector('#author');

const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', (event) => {
  if (author.value && title.value) {
    event.preventDefault();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookID = generateBookID();
    library.addBook(bookTitle, bookAuthor, bookID);
    displayBooks();
    saveBooks();
    title.value = null;
    author.value = null;
  } else {
    event.preventDefault();
  }
});

getStorageData();
displayBooks();

window.onbeforeunload = () => {
  getStorageData();
  displayBooks();
};

// Navigation section

function displayList() {
  if (displaList.style.display === 'none') {
    displaList.style.display = 'flex';
    displaBooks.style.display = 'none';
    displaContact.style.display = 'none';
  } else {
    displaList.style.display = 'flex';
    displaBooks.style.display = 'none';
    displaContact.style.display = 'none';
  }
}

function displayAdd() {
  if (displaBooks.style.display === 'none') {
    displaList.style.display = 'none';
    displaBooks.style.display = 'flex';
    displaContact.style.display = 'none';
  } else {
    displaList.style.display = 'none';
    displaBooks.style.display = 'flex';
    displaContact.style.display = 'none';
  }
}

function displayContact() {
  if (displaContact.style.display === 'none') {
    displaList.style.display = 'none';
    displaBooks.style.display = 'none';
    displaContact.style.display = 'flex';
  } else {
    displaList.style.display = 'none';
    displaBooks.style.display = 'none';
    displaContact.style.display = 'flex';
  }
}

// Date and time section
function addZero(num) {
  return num < 10 ? `0${num}` : num;
}
const today = new Date();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const date = today.getDate();
const hours = addZero(today.getHours());
const minutes = addZero(today.getMinutes());
const seconds = addZero(today.getSeconds());
const currentDate = `${month}/${date}/${year} -- ${hours}:${minutes}:${seconds} `;
document.getElementById('date').innerText = currentDate;
