const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
const pageSelect = document.getElementById('pag-pages');


app.appendChild(container);



//var query = 'Wine fountain and cooler';
//var resultPage = 0;
//var resultsPerPage = 10;
//
//var query = document.getElementById('search');
//var resultPage = document.getElementById('pag-pages');
//var resultsPerPage = document.getElementById('resultsPerPage');
//var sortResults = document.getElementById('orderBy');

function doSearch(query, resultPage, resultsPerPage, sortResults) {
    const api_key = 'rfZN5VA1';
    const api_url = `https://www.rijksmuseum.nl/api/en/collection?q=${query}&key=${api_key}&imgonly=true&format=json&p=${resultPage}&ps=${resultsPerPage}&s=${sortResults}`;
    let request = new XMLHttpRequest();
    request.open('GET', api_url, true);

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
    const h1 = document.createElement('h1');
    h1.textContent = inputObject.objectNumber;
    const imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'card-image');
    imgDiv.style.backgroundImage = 'url(' + inputObject.webImage.url + ')';
    const titleDiv = document.createElement('div');
    titleDiv.textContent = inputObject.title;
    titleDiv.setAttribute('class', 'overlay');

    //    imgDiv.style.backgroundPosition = 'center';
    //    imgDiv.style.backgroundSize = 'cover';
    //    const img = document.createElement('img');
    //    img.src = inputObject.webImage.url;
    //    img.alt = inputObject.longTitle;
    //    img.title = inputObject.longTitle;
    container.appendChild(card);
    card.appendChild(h1);
    //    card.appendChild(img);
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
//pagPages(341,50);

function initDefaults(){
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
    initDefaults();
}

function resultPageChange(){
    removeAllCards(container);
    initDefaults();
}

function sortResultsChange(){
    removeAllCards(container);
    removeAllCards(pageSelect);
    createFirstOption();
    initDefaults();
    pageSelect.selectedIndex = 1;
}

function createFirstOption(){
    let option = document.createElement('option');
    option.setAttribute('value', 1);
    option.textContent = 1;
    pageSelect.appendChild(option);
}


//container.


//document.getElementById("pag-pages").firstElementChild.remove();
//pageSelect.firstElementChild.remove();

function removeAllCards(container){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
//removeAllCards(container);
//clear(pageSelect);
//    pageSelect.firstElementChild.remove();
