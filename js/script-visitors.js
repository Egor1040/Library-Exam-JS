'use strict'

class Model {
    constructor() {
        this.apiBooks = 'data-visitors.json';
    }

    getLocalArr() {
        const arr = localStorage.getItem('arrVisitors');
        return JSON.parse(arr);
    }

    addVisitor(close) {
        let agree = false;

        let id = document.querySelector('#addId').value.trim();
        let fullName = document.querySelector('#addFullName').value;
        let phoneNumber = document.querySelector('#addPhone').value;
        let regFullName = /[а-я А-Яі]{5,40}/i;
        let regNumb = /0[0-9 -]{9,12}/i;

        const conditions = [
            { check: Number(id) > 0 },
            { check: regFullName.test(fullName) },
            { check: regNumb.test(phoneNumber) },
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

        if(agree) {
            const arr = JSON.parse(localStorage.getItem('arrVisitors'));
            arr.push(obj);
            localStorage.setItem('arrVisitors', JSON.stringify(arr));
            close();
        }
    }

    editVisitor(id,close) {
        let agree = false;

        const arr = JSON.parse(localStorage.getItem('arrVisitors'));
        let editId = document.querySelector('#editId').value.trim();
        let fullName = document.querySelector('#editFullName').value;
        let phoneNumber = document.querySelector('#editPhone').value;
        let regFullName = /[а-я А-Яі]{5,40}/i;
        let regNumb = /0[0-9 -]{9,12}/i;

        const conditions = [
            { check: Number(editId) > 0, value: Number(editId), key: 'id'},
            { check: regFullName.test(fullName), value: fullName, key: 'fullName' },
            { check: regNumb.test(phoneNumber), value:phoneNumber, key: 'phoneNumber' },
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
            localStorage.setItem('arrVisitors', JSON.stringify(arr));
            close();
        }
    }

    closeModalAdd() {
        let modal = document.querySelector('.add-modal');
        let modalWindow = document.querySelector('.modal-window');
        document.body.style.overflow = "visible";
        modal.style.display = "none";
        modalWindow.style.display = "none";
    }

    closeModalEdit() {
        let modal = document.querySelector('.edit-modal');
        let modalWindow = document.querySelector('.modal-edit');
        document.body.style.overflow = "visible";
        modal.style.display = "none";
        modalWindow.style.display = "none";
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
            this.model.addVisitor(this.model.closeModalAdd);
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
            this.model.editVisitor(even.target.dataset.id,this.model.closeModalEdit);
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
                    let id = String(elem.id);
                    let fullName = String(elem.fullName);

                    if(id.indexOf(searchVal) !== -1 || fullName.indexOf(searchVal) !== -1) {
                        let obj = {
                            id: elem.id,
                            fullName: elem.fullName,
                            phoneNumber: elem.phoneNumber
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

            this.model.sortDataNumber(val, 'id', 'id',this.model.getLocalArr(),this.view.mainContainer,this.view);
            this.model.sortDataStr(val, 'fullName', 'fullName',this.model.getLocalArr(),this.view.mainContainer,this.view);
        }
    }

    init() {
        this.view.renderBooksItem(this.model.getLocalArr());
        document.body.addEventListener('click', this.addElement.bind(this));
        document.body.addEventListener('click', this.editElement.bind(this));
        document.body.addEventListener('click', this.sortElement.bind(this));
        document.body.addEventListener('click', this.findElement.bind(this));
    }
}

const control = new Controller();
control.init();