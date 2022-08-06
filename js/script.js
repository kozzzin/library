const library = []

class NewBook {
    constructor(title, author, pages, read, cover = './img/orange-cover.jpeg') {
        this.bookId = library.length;
        this.bookCover = cover,
        this.bookTitle = title,
        this.bookAuthor = author,
        this.bookRead = read,
        this.bookPages = pages    
    }
    addToLibrary(library) {
        library.push(this);
    }
}


for (let i = 0; i < 5; i++) {

    const book = new NewBook (
        'Look to this book',
        'J.K.Rowling Stone',
        '678',
        true
    );

   book.addToLibrary(library);
   console.log(library);
}

function cardClick() {
    const target = this.event.target;
    const cardID = target.getAttribute('data-id');
    if (target.id === 'deleteButton') {
        deleteCard(cardID,target);
    } else if (target.id === 'readBox') {
        toggleRead(cardID);
    }
    // console.log(this.event.target.getAttribute('data-id'));
}

function deleteCard(cardID,elementID) {
    const index = library.findIndex(x => x.bookId == cardID);

    if (library[index] != undefined) {
        library.splice(index,1);
        const target = document.querySelector(`[data-id="${cardID}"]`);
        target.remove();
    }
}

function toggleRead(cardID) {
    const index = library.findIndex(x => x.bookId == cardID);
    if (library[index].bookRead) {
        library[index].bookRead = false;
    } else {
        library[index].bookRead = true;
    }
}



document.addEventListener('DOMContentLoaded',function() {
    function drawCards() {
        document.querySelector('.main').innerHTML = '';
        for (let i = 0; i < library.length; i++) {
            const checked = library[i].bookRead ? 'checked' : '';
            const HTMLTemplate = 
            `
            <div class="book-card" id="${library[i].bookId}" data-id="${library[i].bookId}" >
            <div class="book-cover">
                <!--<img src="${library[i].bookCover}" alt="">-->
            </div>
            <div class="book-info">
                <ul>
                    <li class="title">${library[i].bookTitle}</li>
                    <li class="author">${library[i].bookAuthor}</li>
                    <li class="pages">Pages: ${library[i].bookPages}</li>
                    <li class="read">
                    <label for="">Read it: 
                        <input id="readBox" data-id="${library[i].bookId}" type="checkbox" ${checked} onclick="cardClick()">
                    </label>
                    </li>
                </ul>
            </div>
            <div class="book-controls">
                <div class="delete">
                    <button id="deleteButton" data-id="${library[i].bookId}" onclick="cardClick()">Delete</button>
                </div>
            </div>
            </div>
            `;
            document.querySelector('.main').innerHTML += HTMLTemplate;
            const buttons = document.querySelectorAll('.button');
            console.log(buttons);
        }
    }

    drawCards();
    

    // CLEAR FORM DATA!

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = Array.from(e.target.elements);
        let dataForBook = [];
        formData.forEach(e => {
            if (e.type === 'checkbox') {
                dataForBook.push(e.checked);
            } else if (e.type != 'submit') {
                dataForBook.push(e.value);
            }
        });

        console.log(formData.title);

        let book = new NewBook (
            ...dataForBook
        );
        book.addToLibrary(library);
            drawCards();
    });
});