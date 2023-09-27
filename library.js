const myLibrary = [];
const addBook = document.querySelector(".addBook");
const dialog = document.querySelector("dialog");
const authorInput = dialog.querySelector("#author");
const titleInput = dialog.querySelector("#title");
const pageInput = dialog.querySelector("#pages");
const readInput = dialog.querySelector("#read");
const submitBtn = dialog.querySelector(".submit");
const cancelBtn = dialog.querySelector(".cancel");
let bookIndex = 0;

function Book(author, title, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = bookIndex;
}

function addBookToLibrary(author, title, pages, read) {
    let isRead;
    if(read === false) {
        isRead = "No";
    }else {
        isRead = "Yes";
    }
    const book = new Book(author, title, pages, isRead);
    myLibrary.push(book);
}

function displayBooks () {
    let table = document.querySelector("table");
    for(let book of myLibrary) {
        if(!(book.index === bookIndex)) {
            continue;
        }
        let row = table.insertRow();
        const authorCell = row.insertCell(0);
        const titleCell = row.insertCell(1);
        const pagesCell = row.insertCell(2);
        const readCell = row.insertCell(3);
        authorCell.innerText = book.author;
        titleCell.innerText = book.title;
        pagesCell.innerText = book.pages;
        readCell.innerText = book.read;
    }
}

function reset() {
    authorInput.value = "";
    titleInput.value = "";
    pageInput.value = "";
    readInput.checked = false;
}

addBook.addEventListener('click', e => {
    reset();
    dialog.showModal();
});

cancelBtn.addEventListener("click", e => {
    dialog.close();
    reset();
})

submitBtn.addEventListener("click", e => {
    e.preventDefault();
    dialog.close();
    addBookToLibrary(authorInput.value, titleInput.value, pageInput.value, readInput.checked);
    displayBooks();
    bookIndex++;
    reset();
})

