
const dateInput = document.getElementById('date-input');
const today = new Date().toISOString().split('T')[0];
dateInput.max = today;
//User can choose today or an earlier date only
console.log(`Today's date is: ${today}`);
console.log('Date input max attribute set to today\'s date.');

async function getData(date = '') {
    const apiKey = "018AfLkn2f8qTddthufcT0z9hl2fsUEIpJwjWQk3";  // My NASA API key
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    if (date) {
        apiUrl += `&date=${date}`;
        console.log(`Fetching data for date: ${date}`);
    } else {
        console.log('Fetching data for today');
    }

    try {
        const result = await fetch(apiUrl);
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        const infoFromServer = await result.json();
        console.log('Data fetched successfully:', infoFromServer);
        
        const content = document.querySelector("#nasa-info");
        content.innerHTML = `
            <h2>${infoFromServer.title}</h2>
            <p>${infoFromServer.date}</p>
            ${infoFromServer.media_type === 'video' 
                ? `<iframe src="${infoFromServer.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
                //image size 
                : `<img src="${infoFromServer.url}" alt="${infoFromServer.title}" style="max-width: 80%;"/>`}
            <p class="explanation">${infoFromServer.explanation}</p>
        `;
        console.log('Content updated successfully');
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

document.getElementById('fetch-button').addEventListener('click', () => {
    const dateInputValue = document.getElementById('date-input').value;
    console.log(`Fetch button clicked. Selected date: ${dateInputValue}`);
    getData(dateInputValue);
});

// Fetch today's image on initial load
console.log('Fetching today\'s image on initial load.');
getData();
