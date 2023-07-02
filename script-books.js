'use strict'

class Model {
    constructor() {
        this.apiBooks = 'data-books.json';
        this.dataBooks = this.getLocalArr();
    }

    async setLocalArr() {
        if(!localStorage.getItem('arrBooks')) {
            try {
                const resp = await fetch(this.apiBooks);
                const arr = await resp.json();
                localStorage.setItem('arrBooks', JSON.stringify(arr));
                this.data = arr;
            } catch (error) {
                console.error(error);
            }
        }
    }

    getLocalArr() {
        const arr = localStorage.getItem('arrBooks');
        return JSON.parse(arr);
    }

    addBook() {
        let agree = false;

        let id = document.querySelector('#addId').value.trim();
        let name = document.querySelector('#addName').value;
        let nameAuthor = document.querySelector('#addAuthor').value;
        let year = document.querySelector('#addYear').value.trim();
        let namePublish = document.querySelector('#addNamePublish').value;
        let pageValue = document.querySelector('#addPage').value.trim();
        let valueBooks = document.querySelector('#addValueBooks').value.trim();

        id > 0 && id < 1000 ? agree = true : agree = false;
        name.match(/^[а-яА-Яa-zA-Z]{5,30}$/) ? agree = true : agree = false;
        nameAuthor.match(/^[а-яА-Я]{5,30}$/) ? agree = true : agree = false;
        year > 1900 || year <= 2023 ? agree = true : agree = false;
        namePublish.match(/^[а-яА-Я]{5,30}$/) ? agree = true : agree = false;
        pageValue > 0 ? agree = true : agree = false;
        valueBooks > 0 ? agree = true : agree = false;

        const obj = {
            id: id,
            name: name,
            nameAuthor: nameAuthor,
            year: year,
            publishHouse: namePublish,
            page: pageValue,
            value: valueBooks
        }

        if(agree) {
            const arr = JSON.parse(localStorage.getItem('arrBooks'));
            arr.push(obj);
            localStorage.setItem('arrBooks', JSON.stringify(arr));
        }
    }

    deleteBook(id) {
        const arr = JSON.parse(localStorage.getItem('arrBooks'));
        arr.splice(id, 1);
        console.log(arr);
        localStorage.setItem('arrBooks', JSON.stringify(arr));
    }
}

class View {
    constructor() {
        this.mainContainer = document.querySelector('.table-body');
    }

    renderTableItem(arrData) {
        arrData.forEach((elem,index) => {
            let html = `<tr class="table-descr">
                            <td class="table-descr__item">${elem.id}</td>
                            <td class="table-descr__item">${elem.name}</td>
                            <td class="table-descr__item">${elem.nameAuthor}</td>
                            <td class="table-descr__item">${elem.year}</td>
                            <td class="table-descr__item">${elem.publishHouse}</td>
                            <td class="table-descr__item">${elem.page}</td>
                            <td class="table-descr__item">${elem.value}</td>
                            <td class="table-descr__item table-descr__item_img">
                                <div class="item-icon" data-id="${index}">
                                    <img src="./img/icon/pencil.png">
                                </div>
                            </td>
                            <td class="table-descr__item">
                                <div class="item-icon item-icon_del" data-id="${index}">
                                    <img src="./img/icon/delete.png">
                                </div>
                            </td>
                        </tr>`;
            this.mainContainer.insertAdjacentHTML('beforeend', html);
        });
    }

    renderBooksItem(arrData) {
        this.renderTableItem(arrData);
    }
}

class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
    }

    manipulateModal(even) {
        let modal = document.querySelector('.add-modal');
        let modalWindow = document.querySelector('.modal-window');
        if(even.target.matches('.all-item__button')) {
            if(modal.style.display = "none") {
                modal.style.display = "flex";
                modalWindow.style.display = "block";
            }
        }
        if(even.target.matches('.modal-window__close')) {
            if(modal.style.display = "flex") {
                modal.style.display = "none";
                modalWindow.style.display = "none";
            }
        }

    }

    addElement(even) {
        if(even.target.matches('.modal-window__add')) {
            this.model.addBook();
            this.view.mainContainer.innerHTML = '';
            const arr = JSON.parse(localStorage.getItem('arrBooks'));
            this.view.renderTableItem(arr);
        }
    }

    deleteElement(even) {
        if(even.target.closest('.item-icon_del')) {
            this.model.deleteBook(even.target.parentElement.dataset.id);
            this.view.mainContainer.innerHTML = '';
            const arr = JSON.parse(localStorage.getItem('arrBooks'));
            this.view.renderTableItem(arr);
        }
    }

    async init() {
        this.model.setLocalArr();
        this.view.renderBooksItem(this.model.dataBooks);
        document.body.addEventListener('click', this.manipulateModal.bind(this));
        document.body.addEventListener('click', this.deleteElement.bind(this));
        document.querySelector('.modal-window__add').addEventListener('click', this.addElement.bind(this));
    }
}

const control = new Controller();
control.init();