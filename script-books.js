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

        const conditions = [
            { check: Number(id) > 0 },
            { check: name },
            { check: nameAuthor },
            { check: Number(year) > 0 },
            { check: namePublish },
            { check: Number(pageValue) > 0 },
            { check: Number(valueBooks) > 0 }
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
            name: name,
            nameAuthor: nameAuthor,
            year: Number(year),
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

    editBook(id) {
        let agree = false;

        const arr = JSON.parse(localStorage.getItem('arrBooks'));
        let editId = document.querySelector('#editId').value.trim();
        let name = document.querySelector('#editName').value;
        let nameAuthor = document.querySelector('#editAuthor').value;
        let year = document.querySelector('#editYear').value.trim();
        let namePublish = document.querySelector('#editNamePublish').value;
        let pageValue = document.querySelector('#editPage').value.trim();
        let valueBooks = document.querySelector('#editValueBooks').value.trim();

        const conditions = [
            { check: Number(editId) > 0, value: Number(editId), key: 'id' },
            { check: name, value: name, key: 'name' },
            { check: nameAuthor, value: nameAuthor, key: 'nameAuthor' },
            { check: Number(year) > 0, value: year, key: 'year' },
            { check: namePublish, value: namePublish, key: 'publishHouse' },
            { check: Number(pageValue) > 0, value: pageValue, key: 'page' },
            { check: Number(valueBooks) > 0, value: valueBooks, key: 'value' }
        ];
          
        let isValid = true;
          
        for (const condition of conditions) {
            if (condition.check) {
                arr[id][condition.key] = condition.value;
            } else {
                isValid = false;
            }
        }

        agree = isValid;
        if(agree) {
            localStorage.setItem('arrBooks', JSON.stringify(arr));
        }
    }

    deleteBook(id) {
        const arr = JSON.parse(localStorage.getItem('arrBooks'));
        arr.splice(id, 1);
        localStorage.setItem('arrBooks', JSON.stringify(arr));
    }

    sortDataStr(val,paramSort,keyData,dataArr,container,renderFunc) {
        if(val === paramSort) {
            const arr = dataArr;
            arr.sort((a, b) => {
                let nameA = a[keyData].toUpperCase();
                let nameB = b[keyData].toUpperCase();
    
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
    
                return 0;
            })

            container.innerHTML = '';
            renderFunc.renderTableItem(arr);
        }
    }
    sortDataNumber(val,paramSort,keyData,dataArr,container,renderFunc) {
        if(val === paramSort) {
            const arr = dataArr;
            arr.sort((a, b) => {
                let nameA = a[keyData];
                let nameB = b[keyData];
    
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
    
                return 0;
            })

            container.innerHTML = '';
            renderFunc.renderTableItem(arr);
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
                            <td class="table-descr__item">${elem.name}</td>
                            <td class="table-descr__item">${elem.nameAuthor}</td>
                            <td class="table-descr__item">${elem.year}</td>
                            <td class="table-descr__item">${elem.publishHouse}</td>
                            <td class="table-descr__item">${elem.page}</td>
                            <td class="table-descr__item">${elem.value}</td>
                            <td class="table-descr__item table-descr__item_img">
                                <div class="item-icon item-icon_edit" data-id="${index}">
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

    openCloseBtnMenu(even) {
        if(even.target.matches('.menu-btn')) {
            let menu = document.querySelector('.menu');
            let span = document.querySelectorAll('.menu-btn span');

            document.body.style.overflow = "hidden"
            menu.classList.toggle('active');
            span.forEach(function(el) {
                el.classList.toggle('menu-btn__active')
            })
        }
    }

    manipulateAddModal(even) {
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

    manipulateEditModal(even) {
        let modal = document.querySelector('.edit-modal');
        let modalWindow = document.querySelector('.modal-edit');

        if(even.target.closest('.item-icon_edit')) {
            if(modal.style.display = "none") {
                modal.style.display = "flex";
                modalWindow.style.display = "block";
            }
        }
        if(even.target.closest('.modal-edit__close')) {
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
            this.model.editBook(even.target.dataset.id);
            this.view.mainContainer.innerHTML = '';
            const arr = this.model.getLocalArr();
            this.view.renderTableItem(arr);
        } 
    }

    deleteElement(even) {
        if(even.target.closest('.item-icon_del')) {
            this.model.deleteBook(even.target.parentElement.dataset.id);
            this.view.mainContainer.innerHTML = '';
            const arr = this.model.getLocalArr();
            this.view.renderTableItem(arr);
        }
    }

    findElement(even) {
        if (even.target.matches('#search')) {
            let searchVal = document.querySelector('.choice-by__text').value.trim();
            const arr = this.model.getLocalArr();
            const tempArr = [];

            if (searchVal !== '') {
                arr.forEach(function(elem) {
                    let n = elem.name;
                    let auth = elem.nameAuthor;
                    let publ = elem.publishHouse;

                    if(n.indexOf(searchVal) !== -1 || auth.indexOf(searchVal) !== -1 || publ.indexOf(searchVal) !== -1) {
                        let obj = {
                            id: elem.id,
                            name: elem.name,
                            nameAuthor: elem.nameAuthor,
                            year: elem.year,
                            publishHouse: elem.publishHouse,
                            page: elem.page,
                            value: elem.value
                        }

                        tempArr.push(obj)
                    }
                });

                this.view.mainContainer.innerHTML = '';
                this.view.renderTableItem(tempArr);
            } else if (searchVal === '') {
                const arr = this.model.getLocalArr();
                this.view.mainContainer.innerHTML = '';
                this.view.renderTableItem(arr);
            }
        }
    }

    sortElement(even) {
        let target = even.target;
        if(target.matches('#sort')) {
            let val = document.querySelector('#sortBy').value;

            this.model.sortDataStr(val, 'name', 'name',this.model.getLocalArr(),this.view.mainContainer,this.view);
            this.model.sortDataStr(val, 'nameAuthor', 'nameAuthor',this.model.getLocalArr(),this.view.mainContainer,this.view);
            this.model.sortDataNumber(val, 'valueEl', 'value',this.model.getLocalArr(),this.view.mainContainer,this.view);
        }
    }

    async init() {
        this.model.setLocalArr();
        this.view.renderBooksItem(this.model.dataBooks);
        document.body.addEventListener('click', this.openCloseBtnMenu.bind(this))
        document.body.addEventListener('click', this.manipulateAddModal.bind(this));
        document.body.addEventListener('click', this.manipulateEditModal.bind(this));
        document.querySelector('.modal-window__add').addEventListener('click', this.addElement.bind(this));
        document.body.addEventListener('click', this.editElement.bind(this))
        document.body.addEventListener('click', this.deleteElement.bind(this));
        document.body.addEventListener('click', this.findElement.bind(this));
        document.body.addEventListener('click', this.sortElement.bind(this));
    }
}

const control = new Controller();
control.init();