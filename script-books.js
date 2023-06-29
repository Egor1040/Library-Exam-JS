'use strict'

class Model {
    constructor() {
        this.apiBooks = 'data-books.json';
        this.dataBooks = this.getLocalArr();
    }

    async setLocalArr() {
        try {
            const resp = await fetch(this.apiBooks);
            const arr = await resp.json();
            localStorage.setItem('arrBooks', JSON.stringify(arr));
            this.data = arr;
        } catch (error) {
            console.error(error);
        }
    }

    getLocalArr() {
        let arr = localStorage.getItem('arrBooks');
        return JSON.parse(arr);
    }
}

class View {
    constructor() {
        this.mainContainer = document.querySelector('.table-body');
    }

    renderTableItem(arrData) {
        arrData.forEach(elem => {
            let html = `<tr class="table-descr">
                            <td class="table-descr__item">${elem.id}</td>
                            <td class="table-descr__item">${elem.name}</td>
                            <td class="table-descr__item">${elem.nameAuthor}</td>
                            <td class="table-descr__item">${elem.year}</td>
                            <td class="table-descr__item">${elem.publishHouse}</td>
                            <td class="table-descr__item">${elem.page}</td>
                            <td class="table-descr__item">${elem.value}</td>
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

    async init() {
        this.model.setLocalArr();
        this.view.renderBooksItem(this.model.dataBooks);
    }
}

const control = new Controller();
control.init();