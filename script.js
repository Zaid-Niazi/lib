//declarations

const form = document.querySelector("form");
form.addEventListener("submit", formCapture);
const table = document.querySelector("table");

const modal = document.querySelector("#modal");

const addNew = document.querySelector(".addnew");
addNew.addEventListener("click", () => {
  if (addNew.textContent === "Add") {
    form.setAttribute("class", "visible");
    modal.setAttribute("class", "modalvisible");
    addNew.textContent = "Cancel";
  } else {
    form.setAttribute("class", "hidden");
    modal.setAttribute("class", "modal");

    addNew.textContent = "Add";
  }
});

let booksArray = [];

//functions

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  method() {
    this.read = this.read === true ? false : true;
  }
}

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

function formCapture(event) {
  event.preventDefault();

  const formdata = new FormData(event.target);
  const formObject = Object.fromEntries(formdata);
  const readCheckbox = document.getElementById("read");

  const title = formObject.title;
  const author = formObject.author;
  const pages = formObject.pages;
  const read = readCheckbox.checked;
  // const id = counter++

  const newBook = new Book(title, author, pages, read);
  booksArray.push(newBook);
  displayForms();
  form.setAttribute("class", "hidden");
  modal.setAttribute("class", "modal");

  addNew.textContent = "Add";
}

function displayForms() {
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  booksArray.forEach((book, index) => {
    const tr = document.createElement("tr");

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", removeFunction);

    for (let key in book) {
      let td = document.createElement("td");
      if (typeof book[key] === "boolean") {
        const readStatus = document.createElement("button");

        readStatus.addEventListener("click", () => {
          if (readStatus.textContent === "Unread") {
            book.method();
            readStatus.textContent = "Read";
          } else {
            book.method();

            readStatus.textContent = "Unread";
          }
        });

        if (book[key] === true) {
          readStatus.textContent = "Read";
        } else {
          readStatus.textContent = "Unread";
        }
        td.appendChild(readStatus);
      }

      // else if (typeof book[key] === 'number'){
      // }
      else {
        td.textContent = book[key];
      }
      tr.appendChild(td);
      tr.appendChild(removeBtn);
    }

    tr.dataset.newAttribute = tbody.childElementCount;

    tbody.appendChild(tr);
    function removeFunction() {
      tbody.removeChild(tr);
      booksArray.splice(tr.dataset, 1);
    }
  });
}
