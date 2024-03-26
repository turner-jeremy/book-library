const bookLibrary = [];
const newBookForm = document.getElementById("addNewBook");
const database = document.querySelector('.database');
const dbHeader = `
<div class="col-title center">Title</div>
<div class="col-title center">Author</div>
<div class="col-title center">Pages</div>
<div class="col-title center">Status</div>
`
let statusString = ""
let dbCurrent = ``
let dbNew = ``
let newBook = ""

const get = element => document.getElementById(element);


get("new-book-btn").addEventListener("click", () => {
    get("bookDialog").showModal();
  });

get("cancel-btn").addEventListener("click", () => {
    get("bookDialog").close();
});

get("submit-btn").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form from clearing 

    // Assign form values to variables
    let newTitle = document.getElementById("book-title").value;
    let newAuthor = document.getElementById("book-author").value;
    let newPages = document.getElementById("book-pages").value;   
    let newStatus = document.querySelector('input[name="book-status"]:checked').value;
    
    statusString = convertStatusToString(newStatus)

    // Create new book object and push to library array
    const newBook = new Book(newTitle, newAuthor, newPages, statusString);
    bookLibrary.push(newBook);

    newBook.logBook();

    // Reset form
    newBookForm.reset();

    // Update library HTML
    updateLibraryHTML();

    document.getElementById("book-title").focus();
});

let iconListener = function() {
  console.log(this);
}

function Book(new_title, new_author, new_pages, new_status) {
  this.title = new_title,
  this.author = new_author,
  this.pages = new_pages,
  this.status = new_status;
  this.logBook = function() {
    console.log(`${this.title} by ${this.author} has been added to the library!`);
    console.log(`Books currently in library: ${bookLibrary.length}`);
  }
}

function convertStatusToString(status) {
  if (status == "status-unread") {
    statusString = "Unread"
    } else {
      statusString = "Read"
    }
  return statusString;
}

function updateLibraryHTML() {
  databaseHTML = dbHeader
  bookIndex = 0
  bookLibrary.forEach(book => {
  let statusIcon = ""
  let statusClass = ""

    if (book.status == "Read") {
      statusIcon = "book-check.svg"
      statusClass = "status-read"
    } else {
      statusIcon = "book.svg"
      statusClass = "status-unread"
    }

    databaseHTML += `
    <div class="book-row" id="book-${bookIndex}">
    <div class="book-title center">${book.title}</div>
    <div class="book-author center">${book.author}</div>
    <div class="book-pages center">${book.pages}</div>
    <div class="book-read center ${statusClass}">${book.status}</div>
    <img class="book-icon toggle-icon" id="book-${bookIndex}-toggle" width="25px" src="./images/${statusIcon}">
    <img class="book-icon delete-icon" id="book-${bookIndex}-delete" width="25px" src="./images/book-remove.svg">
    </div>
    `

    bookIndex += 1
  });

  database.innerHTML = databaseHTML;
}

database.addEventListener('click', function (e) {
  if (e.target.classList.contains('toggle-icon')) {
    let idString = e.target.id;
    let toggleIndex = Number(idString.slice(5, 6));
    toggleStatus(idString, toggleIndex);
  } else if (e.target.classList.contains('delete-icon')) {
    let idString = e.target.id;
    let deleteIndex = Number(idString.slice(5, 6));
    deleteBook(deleteIndex);
  }
})

function toggleStatus(idString, bookIndex) {
  if (bookLibrary[bookIndex].status == "Read") {
    bookLibrary[bookIndex].status = "Unread";
  } else if (bookLibrary[bookIndex].status == "Unread") {
    bookLibrary[bookIndex].status = "Read";
  }

  updateLibraryHTML();
}

function deleteBook(bookIndex) {
  if (bookIndex == 0) {
    bookLibrary.shift(bookIndex);
  } else {
  bookLibrary.splice(bookIndex, bookIndex);
  }
  updateLibraryHTML();
}