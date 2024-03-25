const bookLibrary = [];
const newBookForm = document.getElementById("addNewBook");
const database = document.querySelector('.database');
const dbHeader = `
<div class="col-title">Title</div>
<div class="col-title">Author</div>
<div class="col-title">Pages</div>
<div class="col-title">Status</div>
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
    updateLibraryHTML(newBook.bookHTML);
});

function Book(new_title, new_author, new_pages, new_status) {
  this.title = new_title,
  this.author = new_author,
  this.pages = new_pages,
  this.status = new_status;
  this.logBook = function() {
    console.log(`${this.title} by ${this.author} has been added to the library!`);
    console.log(`Books currently in library: ${bookLibrary.length}`);
  }
  this.bookHTML = `
  <div class="book-title">${this.title}</div>
  <div class="book-author">${this.author}</div>
  <div class="book-pages">${this.pages}</div>
  <div class="book-read">${this.status}</div>
  `
}

function convertStatusToString(status) {
  if (status == "status-in-progress") {
    statusString = "In Progress"
    } else if (status == "status-unread") {
    statusString = "Unread"
    } else {
      statusString = "Read"
    }
  return statusString;
}

function updateLibraryHTML(newHTMLString) {
  database.innerHTML = database.innerHTML + newHTMLString
}
