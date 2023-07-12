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

    setToLocalChoice() {
        const arr = JSON.parse(localStorage.getItem('arrCards'));
        const obj = {
            id: 1,
            visitor: document.querySelector('.add-descr__item_visitor').value,
            book: document.querySelector('.add-descr__item_book').value,
            dateGet: '22.03.1998',
            dateBack: '22.03.1998'
        }
        arr.push(obj);
        localStorage.setItem('arrCards', JSON.stringify(arr));
    }
}

class View {
    constructor() {
        this.selectVisitor = document.querySelector('.add-descr__item_visitor');
        this.selectBook = document.querySelector('.add-descr__item_book');
        this.tableBody = document.querySelector('.table-body');
    }

    renderSelectVisitor(arrVis) {
        arrVis.forEach(elem => {
            let html = `<option>${elem.fullName}</option>`;
            this.selectVisitor.insertAdjacentHTML('beforeend', html);
        });
    }

    renderSelectBook(arrBooks) {
        arrBooks.forEach(elem => {
            let html = `<option>${elem.name ? elem.name : 'Пусто'}</option>`;
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
                            <td class="table-descr__item">${elem.dateBack}</td>
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

    addCard(even) {
        if(even.target.matches('.modal-window__add')) {
            this.model.setToLocalChoice();
            let arr = JSON.parse(localStorage.getItem('arrCards'));
            this.view.renderTableEl(arr);
        }
    }

    init() {
        this.view.renderTableEl(this.model.getLocalCards());
        this.view.renderSelectVisitor(this.model.getLocalArrVisitors());
        this.view.renderSelectBook(this.model.getLocalArrBooks());
        document.body.addEventListener('click', this.addCard.bind(this));
    }
}

const control = new Controller();
control.init();