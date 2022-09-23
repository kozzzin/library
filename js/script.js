class Book {
    constructor(title, author, pages, read, cover = './img/orange-cover.jpeg') {
        this.bookId = library.shelves.length;
        this.bookCover = cover,
        this.bookTitle = title,
        this.bookAuthor = author,
        this.bookRead = read,
        this.bookPages = pages
    }


    addToLibrary(library) {
        library.addToStorage(this);
    }
}


const library = (function() {
    let storage = [];
    return {
        init() {
            for (let i = 0; i < 5; i++) {
                const book = new Book (
                    'Look to this book',
                    'J.K.Rowling Stone',
                    '678',
                    true
                );
    
            book.addToLibrary(library);
            }
        },

        addToStorage(book) {
            storage.push(book)
        },

        get shelves() {
            return storage;
        },

        deleteBook(index) {
            storage.splice(index,1)
        },

        toggleRead(cardID) {
            const index = storage.findIndex(x => x.bookId == cardID);
            storage[index].bookRead = storage[index].bookRead ? false : true;
        }
    

    }
})();


const interface = (function(){    
    return {
        cardClick(event) {
            const target = event.target;
            const cardID = target.getAttribute('data-id');
            if (target.id === 'deleteButton') {
                this.deleteCard(cardID,target);
            } else if (target.id === 'readBox') {
                library.toggleRead(cardID);
            }
        },

        deleteCard(cardID,elementID) {
            const index = library.shelves.findIndex(x => x.bookId == cardID);

            if (library.shelves[index] != undefined) {
                library.deleteBook(index);
                const target = document.querySelector(`[data-id="${cardID}"]`);
                target.remove();
            }
        },

        drawCards() {
            document.querySelector('.main').innerHTML = '';
            for (let i = 0; i < library.shelves.length; i++) {
                const checked = library.shelves[i].bookRead ? 'checked' : '';
                const HTMLTemplate =
                `
                <div class="book-card" id="${library.shelves[i].bookId}" data-id="${library.shelves[i].bookId}" >
                <div class="book-cover">
                    <!--<img src="${library.shelves[i].bookCover}" alt="">-->
                </div>
                <div class="book-info">
                    <ul>
                        <li class="title">${library.shelves[i].bookTitle}</li>
                        <li class="author">${library.shelves[i].bookAuthor}</li>
                        <li class="pages">Pages: ${library.shelves[i].bookPages}</li>
                        <li class="read">
                        <label for="">Read it:
                            <input id="readBox" data-id="${library.shelves[i].bookId}" type="checkbox" ${checked} onclick="interface.cardClick(event)">
                        </label>
                        </li>
                    </ul>
                </div>
                <div class="book-controls">
                    <div class="delete">
                        <button id="deleteButton" data-id="${library.shelves[i].bookId}" onclick="interface.cardClick(event)">Delete</button>
                    </div>
                </div>
                </div>
                `;
                document.querySelector('.main').innerHTML += HTMLTemplate;
                const buttons = document.querySelectorAll('.button');
            }
        },

        listenToSubmit() {
            document.querySelector('form').addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = Array.from(e.target.elements);
                let dataForBook = [];
                formData.forEach(e => {
                    if (e.type === 'checkbox') {
                        dataForBook.push(e.checked);
                    } else if (e.type != 'submit') {
                        dataForBook.push(e.value);
                        e.value = '';
                    }
                });

                let book = new Book (
                    ...dataForBook
                );

                book.addToLibrary(library);
                this.drawCards();
            });
        }
    }
})();


document.addEventListener('DOMContentLoaded',function() {
    library.init();
    interface.drawCards();
    interface.listenToSubmit();

    disableSubmit();


    document.querySelectorAll('input')
        .forEach((input) => {
            input.addEventListener(
                'keyup',
                (e) => {
                    checkInput(e);
                    console.log('up', e);
                    updateSubmit();
                },
            );
        });
});

function disableSubmit() {
    const submit = document.querySelector('input[type="submit"]');
    submit.disabled = true;
}

function checkInput(e) {
    const wrongClass = 'wrong';
    const errorLabel = e.target.parentNode.querySelector(`.${wrongClass}`);
    
    try {
        errorLabel.remove();
    } catch {

    }

    if (!e.target.validity.valid) {
        const div = document.createElement('div');
        div.className = wrongClass;
        div.innerText = 'required field';
        div.style = `
            left: ${e.target.offsetLeft + e.target.offsetWidth * 0.1}px;
            width: ${e.target.offsetWidth * 0.8}px;
            top: ${e.target.offsetTop + e.target.offsetHeight + 3}px;
        `;
        e.target.parentNode.append(div);
    } 
    
}

function updateSubmit() {
    const formIsValid = document.querySelector('form').checkValidity();
    if (formIsValid) {
        document.querySelector('input[type="submit"]')
            .disabled = false;
    }
}

// make submit button invalid and disabled
// before everything is fine