const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
const pageSelect = document.getElementById('pag-pages');
app.appendChild(container);
const modalContent = document.getElementById('modal-card');
const api_key = 'rfZN5VA1';

function doSearch(query, resultPage, resultsPerPage, sortResults) {
//    const api_key = 'rfZN5VA1';
    const query_api_url = `https://www.rijksmuseum.nl/api/en/collection?q=${query}&key=${api_key}&imgonly=true&format=json&p=${resultPage}&ps=${resultsPerPage}&s=${sortResults}`;
    let request = new XMLHttpRequest();
    request.open('GET', query_api_url, true);

    request.onload = function () {

        let data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
            console.log(data.count);
            console.log(resultsPerPage);
            pagPages(data.count,resultsPerPage);
            data.artObjects.forEach(artObject => {
                createCard(artObject)
            });
            addListenerToCards();
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Gah, it's not working!`;
            container.appendChild(errorMessage);
        }
    }
    request.send();
}

function createCard(inputObject) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    const imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'card-image');
    imgDiv.setAttribute('id', inputObject.objectNumber);
    imgDiv.style.backgroundImage = 'url(' + inputObject.headerImage.url + ')';
    const titleDiv = document.createElement('div');
    titleDiv.textContent = inputObject.longTitle;
    titleDiv.setAttribute('class', 'overlay');
    container.appendChild(card);
    card.appendChild(imgDiv);
    card.appendChild(titleDiv);
}


 function pagPages(count,resultsPerPage){
    let pagesNumber = Math.ceil(count / resultsPerPage);
    let n = 2;
    console.log(`number of pages: ${pagesNumber}`);
    if (pagesNumber > 1) {
        while (pagesNumber >= n) {
            const option = document.createElement('option');
            option.setAttribute('value', n);
            option.textContent = n;
            pageSelect.appendChild(option);
            console.log(`n: ${n}`);
            n++;
        }
    }
}

function getValuesDoSearch(){
    let query = document.getElementById('search').value;
    let resultPage = document.getElementById('pag-pages').value;
    let resultsPerPage = document.getElementById('resultsPerPage').value;
    let sortResults = document.getElementById('orderBy').value;
    doSearch(query, resultPage, resultsPerPage, sortResults);
}

function resultsPerPageChange(){
    removeAllCards(container);
    removeAllCards(pageSelect);
    createFirstOption();
    getValuesDoSearch();
}

function resultPageChange(){
    removeAllCards(container);
    getValuesDoSearch();
}

function sortResultsChange(){
    removeAllCards(container);
    removeAllCards(pageSelect);
    createFirstOption();
    getValuesDoSearch();
    pageSelect.selectedIndex = 1;
}

function createFirstOption(){
    let option = document.createElement('option');
    option.setAttribute('value', 1);
    option.textContent = 1;
    pageSelect.appendChild(option);
}

function removeAllCards(container){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}




// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
//btn.onclick = function() {
//  modal.style.display = "block";
//}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
    removeAllCards(modalContent);
}

//// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
//  if (event.target == modal) {
//    modal.style.display = "none";
//  }
//}



function addListenerToCards() {
    cardsImage = document.querySelectorAll('.card-image');
    for (let i = 0; i < cardsImage.length; i++) {
        cardsImage[i].addEventListener('click', infoPopupData);
    }
}



  function infoPopupData(e) {
    event.stopPropagation();
    let artObjectId = e.target.getAttribute('id');
    let item_api_url = `https://www.rijksmuseum.nl/api/en/collection/${artObjectId}?key=${api_key}&format=json`;

    let request = new XMLHttpRequest();
    request.open('GET', item_api_url, true);

    request.onload = function () {

        let artObjectData = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            console.log(artObjectData);
            fillModalWindow(artObjectData);
        } else {
            console.log(`Gah, it's not working!`)
        }
    }
    request.send();
  }

function fillModalWindow (inputObject){
    const modalWebImage = document.createElement('img');
    modalWebImage.src = inputObject.artObject.webImage.url;
    modalWebImage.alt = inputObject.artObject.title;
    const modalHeader = document.createElement('div');
    modalHeader.textContent = inputObject.artObject.longTitle;
    modalContent.appendChild(modalWebImage);
    modalContent.appendChild(modalHeader);
    modal.style.display = "block";
}

