const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

//    var query = 'Wine fountain and cooler';
//    var resultPage = 0;
//    var resultsPerPage = 10;

function doSearch(query,resultPage,resultsPerPage){
    const api_key = 'rfZN5VA1';
//    var query = 'Wine fountain and cooler';
//    var resultPage = 0;
//    var resultsPerPage = 10;
    var api_url = `https://www.rijksmuseum.nl/api/en/collection?q=${query}&key=${api_key}&imgonly=true&format=json&p=${resultPage}&ps=${resultsPerPage}`;
    var request = new XMLHttpRequest();
    request.open('GET', api_url, true);

    request.onload = function () {

    var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.artObjects.forEach(artObject => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = artObject.objectNumber;

            const p = document.createElement('p');
            p.textContent = artObject.title;

            const img = document.createElement('img');
            img.src = artObject.webImage.url;
            img.alt = artObject.longTitle;

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
            card.appendChild(img);
        });
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        }
    }
    request.send();
}

