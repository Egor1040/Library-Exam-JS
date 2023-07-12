'use strict'

let apiBook = 'data-books.json';
let apiVisitors = 'data-visitors.json';
let apiCards = 'data-cards.json';

let bookJsonName = 'arrBooks';
let visitorsJsonName = 'arrVisitors';
let cardsJsonName = 'arrCards';

setLocalArr(apiBook, bookJsonName);
setLocalArr(apiVisitors, visitorsJsonName);
setLocalArr(apiCards, cardsJsonName);

function setLocalArr(api, jsonName) {
    if(!localStorage.getItem(jsonName) || localStorage.getItem(jsonName) == null) {
        fetch(api)
            .then(res => res.json())
            .then(res => localStorage.setItem(jsonName, JSON.stringify(res)));
    }
}