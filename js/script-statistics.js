'use strict'

class Model {
    getLocalCards() {
        const arr = localStorage.getItem('arrCards');
        return JSON.parse(arr); 
    }

}

class View {
    renderLi(arr,parent) {
        arr.forEach((el,index) => {
            let html = `<li>${index + 1}.${el.value}</li>`;
            parent.insertAdjacentHTML('beforeend', html);
        })

    }
}

class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.ulBooks = document.querySelector('.statistics__books');
        this.ulVisitors = document.querySelector('.statistics__visitors');
    }

    countTopEl(property) {
        let arrfirst = [];
        const objCount = {};

        this.model.getLocalCards().forEach(elem => {
            const element = elem[property];
            if (objCount[element]) {
                objCount[element] += 1;
            } else {
                objCount[element] = 1;
            }
        });

        for(const [value, count] of Object.entries(objCount)) {
            arrfirst.push({ value: value, count });
        }

        arrfirst.sort((a, b) => b.count - a.count);
        const topFiveEl = arrfirst.slice(0,5);

        return topFiveEl;
    }

    init() {
        this.view.renderLi(this.countTopEl('book'),this.ulBooks);
        this.view.renderLi(this.countTopEl('visitor'),this.ulVisitors);
    }
}

const control = new Controller();
control.init();