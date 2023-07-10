'use strict'

class Model {
    constructor() {
        this.apiBooks = 'data-visitors.json';
        this.dataVisitors = this.getLocalArr();
    }

    async setLocalArr() {
        if(!localStorage.getItem('arrVisitors')) {
            try {
                const resp = await fetch(this.apiBooks);
                const arr = await resp.json();
                localStorage.setItem('arrVisitors', JSON.stringify(arr));
                this.data = arr;
            } catch (error) {
                console.error(error);
            }
        }
    }

    getLocalArr() {
        const arr = localStorage.getItem('arrVisitors');
        return JSON.parse(arr);
    }

    addVisitor() {
        let agree = false;

        let id = document.querySelector('#addId').value.trim();
        let fullName = document.querySelector('#addFullName').value;
        let phoneNumber = document.querySelector('#addPhone').value;

        const conditions = [
            { check: Number(id) > 0 },
            { check: fullName },
            { check: phoneNumber },
        ];

        let isValid = true;

        for (const condition of conditions) {
            if (!condition.check) {
                isValid = false;   
            }
        }
        agree = isValid;

        const obj = {
            id: Number(id),
            fullName: fullName,
            phoneNumber: phoneNumber,
        }
        console.log(obj)

        if(agree) {
            const arr = JSON.parse(localStorage.getItem('arrVisitors'));
            arr.push(obj);
            localStorage.setItem('arrVisitors', JSON.stringify(arr));
        }
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
                            <td class="table-descr__item">${elem.fullName}</td>
                            <td class="table-descr__item">${elem.phoneNumber}</td>
                            <td class="table-descr__item table-descr__item_img">
                                <div class="item-icon item-icon_edit" data-id="${index}">
                                    <img src="./img/icon/pencil.png">
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

    addElement(even) {
        if(even.target.matches('.modal-window__add')) {
            this.model.addVisitor();
            this.view.mainContainer.innerHTML = '';
            const arr = this.model.getLocalArr();
            this.view.renderTableItem(arr);
        }
    }

    editElement(even) {
        if(even.target.closest('.item-icon_edit')) {
            let idEl = even.target.parentElement.dataset.id;
            document.querySelector('.modal-edit__add').setAttribute('data-id', idEl) 
        }

        if(even.target.matches('.modal-edit__add')) {
            this.model.editVisitor(even.target.dataset.id);
            this.view.mainContainer.innerHTML = '';
            const arr = this.model.getLocalArr();
            this.view.renderTableItem(arr);
        } 
    }

    init() {
        this.model.setLocalArr();
        this.view.renderBooksItem(this.model.dataVisitors);
        document.querySelector('.modal-window__add').addEventListener('click', this.addElement.bind(this));
        document.body.addEventListener('click', this.editElement.bind(this));
    }
}

const control = new Controller();
control.init();