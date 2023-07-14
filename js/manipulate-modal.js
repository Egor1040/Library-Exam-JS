'use strict'

document.body.addEventListener('click', manipulateAddModal.bind(this));
document.body.addEventListener('click', manipulateEditModal.bind(this));

function manipulateAddModal(even) {
    let modal = document.querySelector('.add-modal');
    let modalWindow = document.querySelector('.modal-window');

    if(even.target.matches('.all-item__button')) {
        if(modal.style.display = "none") {
            document.body.style.overflow = "hidden";
            modal.style.display = "flex";
            modalWindow.style.display = "block";
        }
    }
    if(even.target.matches('.modal-window__close')) {
        if(modal.style.display = "flex") {
            document.body.style.overflow = "visible";
            modal.style.display = "none";
            modalWindow.style.display = "none";
        }
    }
}

function manipulateEditModal(even) {
    let modal = document.querySelector('.edit-modal');
    let modalWindow = document.querySelector('.modal-edit');

    if(even.target.closest('.item-icon_edit')) {
        if(modal.style.display = "none") {
            
            // document.body.style.overflow = "hidden";
            modal.style.display = "flex";
            modalWindow.style.display = "block";
            modalWindow.scrollIntoView({block: "center", behavior: "smooth"});
            document.body.style.overflow = "hidden";
        }
    }
    if(even.target.closest('.modal-edit__close')) {
        if(modal.style.display = "flex") {
            document.body.style.overflow = "visible";
            modal.style.display = "none";
            modalWindow.style.display = "none";
        }
    }
}