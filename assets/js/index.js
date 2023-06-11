class Book {
  constructor(formElem, bookCollectionName, elemToInsertData) {
    this.bookCollectionName = bookCollectionName;
    this.elemToInsertData = elemToInsertData;
    this.formElem = document.querySelector(formElem);
    this.bookCollection = JSON.parse(localStorage.getItem(this.bookCollectionName)) || [];
    this.bookTitleField = document.querySelector('.book-title');
    this.bookAuthorField = document.querySelector('.book-author');
    this.formEventHandler();
    this.displayBooks();
  }

  updateLocalStorageData() {
    // This method will update data in localStorage
    localStorage.setItem(this.bookCollectionName, JSON.stringify(this.bookCollection));
  }

  addBookToList(title, author) {
    // This method will add a new book into the booklist
    if (!title || !author) {
      alert('Please, insert title & author!');
      return;
    }
    this.bookCollection.push({ title, author });
    this.updateLocalStorageData();
    this.displayBooks();
  }

  removeBookFromList(index) {
    // This method will remove the selected book from the booklist
    this.bookCollection.splice(index, 1);
    this.updateLocalStorageData();
    this.displayBooks();
  }

  generateHtmlForBookList() {
    // This method will generate HTML element for the complete booklist
    let boilerPlate = '';
    this.bookCollection.forEach((book, index) => {
      boilerPlate += `<tr class="book-item">
        <td>"${book.title}" by ${book.author}</td>
        <td>
          <button class="btn btn-light" data-index=${index}>
            Remove
          </button>
        </td>
      </tr>`;
    });
    return boilerPlate;
  }

  activateRemoveButton() {
    // This method will add & activate remove event on remove button in each book row
    const table = document.querySelector('.booklist-table');
    const btn = table.querySelectorAll('button');
    btn.forEach((btnR, index) => {
      btnR.addEventListener('click', () => {
        this.removeBookFromList(index);
      });
    });
  }

  displayBooks() {
    // This method will generate the complete booklist and display into the HTM
    const bookList = document.querySelector(this.elemToInsertData);
    bookList.innerHTML = this.generateHtmlForBookList();
    this.activateRemoveButton();
    this.formInputFieldNormalize();
  }

  formInputFieldNormalize() {
    // This method will normalize the form input fields
    this.bookTitleField.value = '';
    this.bookAuthorField.value = '';
  }

  formEventHandler() {
    // This method will handle the form event
    this.formElem.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addBookToList(this.bookTitleField.value, this.bookAuthorField.value);
      this.titleInput.value = '' || this.titleInput.value;
      this.authorInput.value = '' || this.authorInput.value;
    });
  }
}

const bookList = new Book('#book-form', 'bookCollection', '.booklist-table');

// Dynamic content section code
function toggleElement(target) {
  const allSiblinsElem = document.querySelectorAll('.row');
  allSiblinsElem.forEach((elem, index) => {
    if (elem.className.split(' ')[1] === target) {
      elem.classList.remove('content-inactive');
      elem.classList.add('content-active');
    } else {
      elem.classList.remove('content-active');
      elem.classList.add('content-inactive');
    }
  });
}

// This function will show the target section & hide all other section
function toggleNav(targetNav) {
  const elemUl = document.querySelector('.nav-list');
  const allUl = elemUl.querySelectorAll('a');
  allUl.forEach((elem, index) => {
    if (elem === targetNav) {
      elem.classList.add('nav-active');
    } else {
      elem.classList.remove('nav-active');
    }
  });
}

// This function will highlight the active menu & deactivate all other menu
const triggerElem = document.querySelectorAll('.nav-item');
triggerElem.forEach((singleElem, index) => {
  singleElem.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = singleElem.className;
    const targetSectionClass = singleElem.getAttribute('data-target');
    toggleElement(targetSectionClass);
    toggleNav(singleElem);
  });
});

// Set date & time dynamically in "under navigation" & footer
const dateTime = new Date();
const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentYear = dateTime.getFullYear();
const currentMonth = monthList[dateTime.getMonth()];
const currentDateTimeString = dateTime.toLocaleString().split('/');
document.querySelector('#date-time').innerHTML = `${currentMonth} ${currentDateTimeString[1]} ${currentDateTimeString[2]}`;
document.querySelector('#footer-year').innerHTML = currentYear;
