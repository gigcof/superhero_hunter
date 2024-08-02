let params = new URLSearchParams(window.location.search);
let id = params.get('id');
const publicKey = '3962a880cfae5a41f716ed03369a693e';
const privateKey = '904be6883e02f1107b560b18df8527e7f53a2d63';

function renderHero(selectedHero) {
    const heroImgDiv = document.querySelector('#hero-img');
    const heroImg = document.createElement('img');
    heroImg.className = 'img-fluid';
    heroImg.src = `${selectedHero.thumbnail.path}.${selectedHero.thumbnail.extension}`;
    heroImgDiv.appendChild(heroImg);

    const heroName = document.querySelector('#hero-name');
    heroName.textContent = selectedHero.name;

    const heroDescription = document.querySelector('#description');
    heroDescription.textContent = selectedHero.description || "No description available";

    const modified = document.querySelector('#modified');
    modified.textContent = new Date(selectedHero.modified).toDateString();

    const comics = document.querySelector('.hero-comics');
    const ts = new Date().getTime().toString(); // unique timestamp
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    selectedHero.comics.items.forEach(comic => {
        const comicItem = document.createElement('li');
        comicItem.className = 'list-group-item';
        comicItem.innerHTML = `<a href="${comic.resourceURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}" target="_blank">${comic.name}</a>`;
        comics.appendChild(comicItem);
    });

    const series = document.querySelector('.series');
    selectedHero.series.items.forEach(serie => {
        const serieItem = document.createElement('li');
        serieItem.className = 'list-group-item';
        serieItem.innerHTML = `<a href="${serie.resourceURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}" target="_blank">${serie.name}</a>`;
        series.appendChild(serieItem);
    });

    const stories = document.querySelector('.stories');
    selectedHero.stories.items.forEach(story => {
        const storyItem = document.createElement('li');
        storyItem.className = 'list-group-item';
        storyItem.innerHTML = `<a href="${story.resourceURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}" target="_blank">${story.name}</a>`;
        stories.appendChild(storyItem);
    });

    const events = document.querySelector('.events');
    if (selectedHero.events.items.length === 0) {
        const eventItem = document.createElement('li');
        eventItem.className = 'list-group-item';
        eventItem.textContent = 'No events available';
        events.appendChild(eventItem);
    } else {
        selectedHero.events.items.forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.className = 'list-group-item';
            eventItem.innerHTML = `<a href="${event.resourceURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}" target="_blank">${event.name}</a>`;
            events.appendChild(eventItem);
        });
    }
}

async function main() {
    let selectedHero = localStorage.getItem('selectedHero');
    selectedHero = JSON.parse(selectedHero);
    console.log(selectedHero)
    renderHero(selectedHero);
}

main();