'use strict'

document.querySelector('.menu-btn').addEventListener('click', function() {
    let menu = document.querySelector('.menu');
    let span = document.querySelectorAll('.menu-btn span');

    document.body.style.overflow = "hidden";
    menu.classList.toggle('active');
    span.forEach(function(el) {
        el.classList.toggle('menu-btn__active')
    })
})