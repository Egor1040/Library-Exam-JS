'use strict'

class Model {
    getLocalCards() {
        const arr = localStorage.getItem('arrCards');
        return JSON.parse(arr); 
    }

    getLocalArrVisitors() {
        const arr = localStorage.getItem('arrVisitors');
        return JSON.parse(arr);
    }

    getLocalArrBooks() {
        const arr = localStorage.getItem('arrBooks');
        return JSON.parse(arr);
    }

    getDateNow() {
        const date = new Date();

        let d = date.getDate().toString().padStart(2, '0');
        let m = (date.getMonth() + 1).toString().padStart(2, '0');
        let y = date.getFullYear();

        return `${d}.${m}.${y}`;
    }
}

class View {
    constructor() {
        this.selectVisitor = document.querySelector('.add-descr__item_visitor');
        this.selectBook = document.querySelector('.add-descr__item_book');
        this.tableBody = document.querySelector('.table-body');
    }

    renderSelectVisitor(arrVis) {
        if(arrVis === null) {
            let html = `<option>Відвідувачів немає</option>`;
            this.selectVisitor.insertAdjacentHTML('beforeend', html);
        }
        if(arrVis !== null) {
            arrVis.forEach((elem) => {
                let html = `<option>${elem.fullName}</option>`;
                this.selectVisitor.insertAdjacentHTML('beforeend', html);
            });
        }
    }

    renderSelectBook(arrBooks) {
        arrBooks.forEach((elem) => {
            let html = `<option class="option-book">${elem.name ? elem.name : 'Пусто'}</option>`;
            this.selectBook.insertAdjacentHTML('beforeend', html);
        });
    }

    renderTableEl(arr) {
        this.tableBody.innerHTML = '';
        arr.forEach((elem,index) => {
            let html = `<tr class="table-descr">
                            <td class="table-descr__item">${index+1}</td>
                            <td class="table-descr__item">${elem.visitor}</td>
                            <td class="table-descr__item">${elem.book}</td>
                            <td class="table-descr__item">${elem.dateGet}</td>
                            <td class="table-descr__item" style="height: 39px" data-id="${index}">${elem.dateBack}</td>
                        </tr>`;
            this.tableBody.insertAdjacentHTML('beforeend', html);
        });
    }
}

class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
    }

    setToLocalChoiceElement(getDate,dataId) {
        const arr = JSON.parse(localStorage.getItem('arrCards'));
        const obj = {
            visitor: document.querySelector('.add-descr__item_visitor').value,
            book: document.querySelector('.add-descr__item_book').value,
            dateGet: getDate,
            dateBack: `<div class="item-icon item-icon_return" data-id="${dataId}"><img src="./img/icon/return-arrow.png"></div>`
        }
        arr.push(obj);
        localStorage.setItem('arrCards', JSON.stringify(arr));
    }

    addCard(even) {
        if(even.target.matches('.modal-window__add')) {
            let visitor = document.querySelector('.add-descr__item_visitor').value;
            let same = document.querySelector('.add-descr__item_book').value;
            let bookArr = this.model.getLocalArrBooks();
            let index = bookArr.findIndex(elem => elem.name === same);

            bookArr[index].value -= 1;
            if(bookArr[index].value !== -1 && visitor !== 'Відвідувачів немає') {
                this.setToLocalChoiceElement(this.model.getDateNow(),index);
                let arr = JSON.parse(localStorage.getItem('arrCards'));
                this.view.renderTableEl(arr);
                localStorage.setItem('arrBooks', JSON.stringify(bookArr));
            }
        }
    }

    returnCard(even) {
        if(even.target.closest('.item-icon_return')) {
            let dataIdBooks = even.target.parentElement.dataset.id;
            let dataIdCards = even.target.parentElement.parentNode.dataset.id;
            let bookArr = this.model.getLocalArrBooks();
            let arr = JSON.parse(localStorage.getItem('arrCards'));

            bookArr[dataIdBooks].value += 1;
            arr[dataIdCards].dateBack = `${this.model.getDateNow()}`;

            localStorage.setItem('arrCards', JSON.stringify(arr));
            localStorage.setItem('arrBooks', JSON.stringify(bookArr));

            this.view.renderTableEl(arr);
        }
    }

    init() {
        this.view.renderTableEl(this.model.getLocalCards());
        this.view.renderSelectVisitor(this.model.getLocalArrVisitors());
        this.view.renderSelectBook(this.model.getLocalArrBooks());
        document.body.addEventListener('click', this.addCard.bind(this));
        document.body.addEventListener('click', this.returnCard.bind(this));
    }
}

const control = new Controller();
control.init();