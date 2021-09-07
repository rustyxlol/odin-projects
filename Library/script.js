const DEFAULT_LIBRARY = [
    {
        title: "The Invisible Man",
        author: "H.G. Wells",
        image: "https://images-na.ssl-images-amazon.com/images/I/71KA2gr8xBL.jpg",
        read: true,
    },
    {
        title: "Call of The Wild",
        author: "Jack London",
        image: "https://images-na.ssl-images-amazon.com/images/I/818O7+xGNWL.jpg",
        read: false,
    },
];

const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", () => (popUp.style.display = "unset"));

const submitButton = document.querySelector(".submitAddBook");
submitButton.addEventListener("click", addBookToLibrary);

const popUp = document.querySelector(".addBookPopUp");

const popUpClose = document.querySelector(".close");
popUpClose.onclick = () => (popUp.style.display = "none");

const search = document.querySelector(".search");
const bookContainer = document.querySelector(".bookContainer");

let myLibrary = [];
let book;
class Book {
    constructor(title, author, image, read) {
        this.title = form.addBookTitle.value;
        this.author = form.addBookAuthor.value;
        this.image = form.addBookImage.value;
        this.read = form.readingStatus.checked;
    }
}

function addBookToLibrary() {
    book = new Book(addBookTitle, addBookAuthor, addBookImage, readingStatus);
    if (addBookTitle.value !== "" && addBookAuthor.value !== "") {
        addBookTitle.value;
        myLibrary.push(book);
        setData();
        renderBooks();
        form.reset();
    } else {
        alert('🤔')
    }
}

function renderBooks() {
    const books = document.querySelectorAll(".book");
    books.forEach((book) => bookContainer.removeChild(book));

    for (let i = 0; i < myLibrary.length; i++) {
        displayOnPage(myLibrary[i]);
    }
}

function displayOnPage(item) {
    const elmBook = document.createElement("div");
    const elmBookDetails = document.createElement("div");
    const elmBookImg = document.createElement("img");
    const elmBookTitle = document.createElement("p");
    const elmBookAuthor = document.createElement("p");
    const elmBookButtons = document.createElement("div");
    const elmBookRemove = document.createElement("button");
    const elmBookRead = document.createElement("button");

    elmBook.classList.add("book");
    elmBookDetails.classList.add("bookDetails");
    elmBookImg.src = item.image;

    elmBookTitle.classList.add("bookTitle");
    elmBookTitle.textContent = item.title;

    elmBookAuthor.classList.add("bookAuthor");
    elmBookAuthor.textContent = item.author;

    elmBookDetails.appendChild(elmBookImg);
    elmBookDetails.appendChild(elmBookTitle);
    elmBookDetails.appendChild(elmBookAuthor);

    elmBook.appendChild(elmBookDetails);

    elmBookButtons.classList.add("bookButtons");

    elmBookRemove.classList.add("bookRemove");
    elmBookRemove.textContent = "remove";
    elmBookRemove.addEventListener("click", function (event) {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        setData();
        event.target.parentNode.parentNode.remove();
    });

    elmBookRead.classList.add("bookRead");
    if (item.read == true) {
        elmBookRead.textContent = "read";
        elmBookRead.classList.add("btnFocus");
    } else {
        elmBookRead.textContent = "not read";
    }
    elmBookRead.addEventListener("click", function () {
        elmBookRead.classList.toggle("btnFocus");
        if (elmBookRead.classList.contains("btnFocus")) {
            item.read = true;
            elmBookRead.textContent = "read";
        } else {
            item.read = false;
            elmBookRead.textContent = "not read";
        }
        setData();
    });
    elmBookButtons.appendChild(elmBookRemove);
    elmBookButtons.appendChild(elmBookRead);

    elmBook.appendChild(elmBookButtons);
    bookContainer.appendChild(elmBook);
}

function setData() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function checkLocalStorage() {
    if (localStorage.getItem("myLibrary")) {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    } else {
        myLibrary = DEFAULT_LIBRARY;
    }
    renderBooks();
}

function get42(tds) {
    return Array.prototype.map.call(tds, function (t) {
        return t.textContent;
    });
}

search.addEventListener("keyup", function (e) {
    let elements = document.querySelectorAll(".bookTitle");
    let titles = get42(elements);
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = titles.filter((title) => {
        return title.toLowerCase().includes(searchString);
    });

    for (let i = 0; i < elements.length; i++) {
        if (filteredCharacters.includes(elements[i].textContent)) {
            elements[i].parentNode.parentNode.style.display = "unset";
        } else {
            elements[i].parentNode.parentNode.style.display = "none";
        }
    }
});

checkLocalStorage();
