const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
const pageSelect = document.getElementById('pag-pages');
app.appendChild(container);
const modalContent = document.getElementById('modal-card');
const api_key = 'rfZN5VA1';
var lastSearchValue = '';

function doSearch(query, resultPage, resultsPerPage, sortResults) {
    const query_api_url = `https://www.rijksmuseum.nl/api/en/collection?q=${query}&key=${api_key}&imgonly=true&format=json&p=${resultPage}&ps=${resultsPerPage}&s=${sortResults}`;
    let request = new XMLHttpRequest();
    request.open('GET', query_api_url, true);

    request.onload = function () {

        let data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
            console.log(data.count);
            console.log(resultsPerPage);
            if (data.count == 0){
                console.log("no result");
                emptyResult(container);
            } else {
                pagPages(data.count,resultsPerPage);
                data.artObjects.forEach(artObject => {
                    createCard(artObject)
                });
                addListenerToCards();
            }
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
    card.appendChild(imgDiv);
    card.appendChild(titleDiv);
    container.appendChild(card);
}

function emptyResult(container){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = `No art object could be found by your query`;
    container.appendChild(errorMessage);
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

    let queryTest = document.getElementById('search');

    let query = document.getElementById('search').value;
    let resultPage = document.getElementById('pag-pages').value;
    let resultsPerPage = document.getElementById('resultsPerPage').value;
    let sortResults = document.getElementById('orderBy').value;

//    if (lastSearchValue != query) {
        if(checkInputValue(queryTest)){
            doSearch(query, resultPage, resultsPerPage, sortResults);
            lastSearchValue = query;
            console.log(`last search value: ${lastSearchValue}`);
        } else {
            console.log("doSearch not complited");
        }
//    } else {
//        console.log("ohrana otmena")
//    }

//    if(checkInputValue(queryTest)){
//        doSearch(query, resultPage, resultsPerPage, sortResults);
//        lastSearchValue = query;
//        console.log(`last search value: ${lastSearchValue}`);
//    } else {
//        console.log("doSearch not complited");
//    }

}

//function checkInputValue(input){
//    let letters = /[a-z]/;
//    if(input.value.match(letters)){
//        console.log("[a-z] ok");
//        return true;
//    } else if (input.value < 3)
//    {
//        console.log("too short input value");
//        return false;
//    } else
//    {
//        console.log("[a-z] not ok");
//        return false;
//    }
//}

function checkInputValue(input){
    let letters = /[a-z]/;
    if (input.value.length < 4) {
        console.log("Please enter a name with at least 4 letters");
        alert("Please enter a name with at least 4 letters");
        return false;
    } else if (!(input.value.match(letters))) {
        console.log("Only alphabets [a-z] allowed");
        alert("Only alphabets [a-z] allowed");
        return false;
    } else {
        console.log("ok");
        return true;
    }
}

function clearInput(){
    document.getElementById('search').value = '';
    lastSearchValue = '';
    removeAllCards(container);
    removeAllCards(pageSelect);
    createFirstOption();
}

//document.getElementById("submitSearch").addEventListener("click", function(event){
//    event.preventDefault(console.log("test"))
//});

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
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


var closeSpan = document.getElementById('close-button');


// When the user clicks the button, open the modal
//btn.onclick = function() {
//  modal.style.display = "block";
//}

// When the user clicks on <span> (x), close the modal
//span.onclick = function() {
//  modal.style.display = "none";
//    removeAllCards(modalContent);
//}

closeSpan.onclick = function() {
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
    if(inputObject.artObject.webImage){
        const modalWebImage = document.createElement('img');
        modalWebImage.src = inputObject.artObject.webImage.url;
        modalWebImage.alt = inputObject.artObject.title;
        modalContent.appendChild(modalWebImage);
    } else {
        const unavailableWebImage = document.createElement('div');
        unavailableWebImage.setAttribute('class', 'unavailable');
        unavailableWebImage.textContent = "Sorry, full image is unavailable";
        modalContent.appendChild(unavailableWebImage);
    }
    const modalHeader = document.createElement('h3');
    modalHeader.textContent = inputObject.artObject.longTitle;
    modalContent.appendChild(modalHeader);



    const detailsPageLink = document.createElement('a');
    detailsPageLink.href = `details.html?objectNumber=` + inputObject.artObject.objectNumber;
    detailsPageLink.textContent = inputObject.artObject.objectNumber;
    modalContent.appendChild(detailsPageLink);

    modal.style.display = "block";
}




//object.onchange = function(){myScript};
//object.addEventListener("change", myScript);


//var lastSearchKeyword = document.getElementById('search').value



function openWin(inputObject) {
    var strValue = document.getElementById('txtboxId').value;
    var url = "http://mywebpage.com?parameter=" + strValue;
    myWindow = window.open(url, '', 'width=800,height=200,scrollbars=1');
    myWindow.focus();
}

