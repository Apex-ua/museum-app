const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

//    var query = 'Wine fountain and cooler';
//    var resultPage = 0;
//    var resultsPerPage = 10;

function doSearch(query,resultPage,resultsPerPage,sortResults){
    const api_key = 'rfZN5VA1';
    const api_url = `https://www.rijksmuseum.nl/api/en/collection?q=${query}&key=${api_key}&imgonly=true&format=json&p=${resultPage}&ps=${resultsPerPage}&s=${sortResults}`;
    let request = new XMLHttpRequest();
    request.open('GET', api_url, true);

    request.onload = function () {

    let data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            data.artObjects.forEach(artObject => {
                createCard(artObject)
            });
        }
        else {
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
    const titleDiv = document.createElement('div');
    titleDiv.textContent = inputObject.title;
    titleDiv.setAttribute('class', 'overlay');
    const imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'card-image');
    imgDiv.style.backgroundImage = 'url(' + inputObject.webImage.url +')';
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

