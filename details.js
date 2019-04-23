const detailsContainer = document.getElementById('root');
detailsContainer.setAttribute('class', 'details-container');

const api_key = 'rfZN5VA1';

function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        console.log(vars);
        return vars;
    }
   var test =  getUrlVars();

if(test) {
    getObjectData(test);
}

  function getObjectData(input) {
    let objectNumber = input.objectNumber;
    let item_api_url = `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=${api_key}&format=json`;

    let request = new XMLHttpRequest();
    request.open('GET', item_api_url, true);

    request.onload = function () {

        let artObjectData = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            console.log(artObjectData);
            fillDetailsPage(artObjectData);
//            fillModalWindow(artObjectData);
        } else {
            console.log(`Gah, it's not working!`)
        }
    }
    request.send();
  }


//function createCard(inputObject) {
//    const card = document.createElement('div');
//    card.setAttribute('class', 'card');
//    const imgDiv = document.createElement('div');
//    imgDiv.setAttribute('class', 'card-image');
//    imgDiv.setAttribute('id', inputObject.objectNumber);
//    imgDiv.style.backgroundImage = 'url(' + inputObject.headerImage.url + ')';
//    const titleDiv = document.createElement('div');
//    titleDiv.textContent = inputObject.longTitle;
//    titleDiv.setAttribute('class', 'overlay');
//    card.appendChild(imgDiv);
//    card.appendChild(titleDiv);
//    container.appendChild(card);
//}


function fillDetailsPage (inputObject){
    if(inputObject.artObject.webImage){
        const detailWebImage = document.createElement('img');
        detailWebImage.src = inputObject.artObject.webImage.url;
        detailWebImage.alt = inputObject.artObject.title;
        detailsContainer.appendChild(detailWebImage);
    } else {
        const unavailableWebImage = document.createElement('div');
        unavailableWebImage.setAttribute('class', 'unavailable');
        unavailableWebImage.textContent = "Sorry, full image is unavailable";
        detailsContainer.appendChild(unavailableWebImage);
    }
    const detailsHeader = document.createElement('h3');
    detailsHeader.textContent = inputObject.artObject.longTitle;
    detailsContainer.appendChild(detailsHeader);
}



