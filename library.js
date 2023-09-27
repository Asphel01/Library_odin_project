const myLibrary = [];
const addBook = document.querySelector(".addBook");
const dialog = document.querySelector("dialog");
const authorInput = dialog.querySelector("#author");
const titleInput = dialog.querySelector("#title");
const pageInput = dialog.querySelector("#pages");
const readInput = dialog.querySelector("#read");
const submitBtn = dialog.querySelector(".submit");
const cancelBtn = dialog.querySelector(".cancel");
const table = document.querySelector("table");

function Book(author, title, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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
    for(let book of myLibrary) {
        const index = myLibrary.indexOf(book);
        if(!(index === myLibrary.length - 1)) {
            continue;
        }
        
        const row = table.insertRow();
        row.setAttribute("index", index);
        const authorCell = row.insertCell(0);
        const titleCell = row.insertCell(1);
        const pagesCell = row.insertCell(2);
        const readCell = row.insertCell(3);
        const statusCell = row.insertCell(4);
        const removeCell = row.insertCell(5);

        authorCell.innerText = book.author;
        titleCell.innerText = book.title;
        pagesCell.innerText = book.pages;
        readCell.innerText = book.read;

        const statusBtn = document.createElement("button");  
        statusBtn.classList.add("changeStatus");
        statusBtn.innerText = "Change";

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove");
        removeBtn.innerText = "Remove";

        statusCell.appendChild(statusBtn);
        removeCell.appendChild(removeBtn);

        statusBtn.addEventListener('click', e => {
            if(readCell.innerText === "Yes") {
                readCell.innerText = "No";
                myLibrary[row.getAttribute("index")].read = "No";
            }else {
                readCell.innerText = "Yes";
                myLibrary[row.getAttribute("index")].read = "Yes";
            }             
        });

        removeCell.addEventListener('click', e => {
            const removeIndex = row.getAttribute("index");
            row.remove();
            myLibrary.splice(removeIndex, 1);
        })
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
    reset();
})

