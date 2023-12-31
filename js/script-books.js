'use strict'

class Model {
    constructor() {
        this.apiBooks = 'data-books.json';
    }

    getLocalArr() {
        const arr = localStorage.getItem('arrBooks');
        return JSON.parse(arr);
    }

    addBook(close) {
        let agree = false;

        let id = document.querySelector('#addId').value.trim();
        let name = document.querySelector('#addName').value;
        let nameAuthor = document.querySelector('#addAuthor').value;
        let year = document.querySelector('#addYear').value.trim();
        let namePublish = document.querySelector('#addNamePublish').value;
        let pageValue = document.querySelector('#addPage').value.trim();
        let valueBooks = document.querySelector('#addValueBooks').value.trim();
        let regName = /[а-я А-Яі]{5,40}/i;
        let addError = document.querySelector('.modal-window__error');

        const conditions = [
            { check: Number(id) > 0 },
            { check: regName.test(name) },
            { check: regName.test(nameAuthor) },
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
            page: Number(pageValue),
            value: Number(valueBooks)
        }

        if(agree) {
            const arr = JSON.parse(localStorage.getItem('arrBooks'));
            arr.push(obj);
            localStorage.setItem('arrBooks', JSON.stringify(arr));
            close();
        } else {
            addError.style.visibility = "visible";
            setTimeout(function() {
                addError.style.visibility = "hidden";
            },2000)
        }
    }

    editBook(id,close) {
        let agree = false;

        const arr = JSON.parse(localStorage.getItem('arrBooks'));
        let editId = document.querySelector('#editId').value.trim();
        let name = document.querySelector('#editName').value;
        let nameAuthor = document.querySelector('#editAuthor').value;
        let year = document.querySelector('#editYear').value.trim();
        let namePublish = document.querySelector('#editNamePublish').value;
        let pageValue = document.querySelector('#editPage').value.trim();
        let valueBooks = document.querySelector('#editValueBooks').value.trim();
        let regName = /[а-я А-Яі]{5,40}/i;
        let addError = document.querySelector('.modal-edit__error');

        const conditions = [
            { check: Number(editId) > 0, value: Number(editId), key: 'id' },
            { check: regName.test(name), value: name, key: 'name' },
            { check: regName.test(nameAuthor), value: nameAuthor, key: 'nameAuthor' },
            { check: Number(year) > 0, value: year, key: 'year' },
            { check: namePublish, value: namePublish, key: 'publishHouse' },
            { check: Number(pageValue) > 0, value: Number(pageValue), key: 'page' },
            { check: Number(valueBooks) > 0, value: Number(valueBooks), key: 'value' }
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
            close();
        } else {
            addError.style.visibility = "visible";
            setTimeout(function() {
                addError.style.visibility = "hidden";
            },2000)
        }
    }

    closeModalAdd() {
        let modal = document.querySelector('.add-modal');
        let modalWindow = document.querySelector('.modal-window');
        document.body.style.overflow = "visible";
        modalWindow.style.display = "none";
        let html = `<img id="addDone" src="img/icon/icons-done.png">`;
        modal.insertAdjacentHTML('afterbegin', html);
        setTimeout(function() {
            modal.style.display = "none";
            modal.removeChild(document.querySelector('#addDone'));
        },1000);
    }

    closeModalEdit() {
        let modal = document.querySelector('.edit-modal');
        let modalWindow = document.querySelector('.modal-edit');
        document.body.style.overflow = "visible";
        modalWindow.style.display = "none";
        let html = `<img id="editDone" src="img/icon/icons-done.png">`;
        modal.insertAdjacentHTML('afterbegin', html);
        setTimeout(function() {
            modal.style.display = "none";
            modal.removeChild(document.querySelector('#editDone'));
        },1000);
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

    addElement(even) {
        if(even.target.matches('.modal-window__add')) {
            this.model.addBook(this.model.closeModalAdd);
            this.view.mainContainer.innerHTML = '';
            const arr = this.model.getLocalArr();
            this.view.renderTableItem(arr);
        }
    }

    editElement(even) {
        if(even.target.closest('.item-icon_edit')) {
            this.addValueForEdit(even.target.parentElement.dataset.id);
            let idEl = even.target.parentElement.dataset.id;
            document.querySelector('.modal-edit__add').setAttribute('data-id', idEl) 
        }

        if(even.target.matches('.modal-edit__add')) {
            this.model.editBook(even.target.dataset.id,this.model.closeModalEdit);
            this.view.mainContainer.innerHTML = '';
            const arr = this.model.getLocalArr();
            this.view.renderTableItem(arr);
        } 
    }

    addValueForEdit(id) {
        const arr = this.model.getLocalArr();
        let editId = document.querySelector('#editId');
        let name = document.querySelector('#editName');
        let nameAuthor = document.querySelector('#editAuthor');
        let year = document.querySelector('#editYear');
        let namePublish = document.querySelector('#editNamePublish');
        let pageValue = document.querySelector('#editPage');
        let valueBooks = document.querySelector('#editValueBooks');

        editId.value = arr[id].id;
        name.value = arr[id].name;
        nameAuthor.value = arr[id].nameAuthor;
        year.value = arr[id].year;
        namePublish.value = arr[id].publishHouse;
        pageValue.value = arr[id].page;
        valueBooks.value = arr[id].value;
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
            let searchVal = document.querySelector('.choice-by__text').value.toLowerCase();
            const arr = this.model.getLocalArr();
            const tempArr = [];

            if (searchVal !== '') {
                arr.forEach(function(elem) {
                    let n = elem.name.toLowerCase();
                    let auth = elem.nameAuthor.toLowerCase();
                    let publ = elem.publishHouse.toLowerCase();

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
        this.view.renderBooksItem(this.model.getLocalArr());
        document.body.addEventListener('click', this.addElement.bind(this));
        document.body.addEventListener('click', this.editElement.bind(this));
        document.body.addEventListener('click', this.deleteElement.bind(this));
        document.body.addEventListener('click', this.findElement.bind(this));
        document.body.addEventListener('click', this.sortElement.bind(this));
    }
}

const control = new Controller();
control.init();