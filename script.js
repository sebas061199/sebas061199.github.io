// Function to open Google Maps with specified name and address
function openInGoogleMaps(name, address) {
    var googleMapsURL = "https://www.google.com/maps?q=" + encodeURIComponent(name + ", " + address);
    window.open(googleMapsURL, "_blank");
}

// Fetch JSON data from file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Get the name and address from the first object in the JSON data
        var firstObjectData = data.locaties[0];
        
        // Update the link with onclick attribute
        var googleMapsLink = document.getElementById("googleMapsLink");
        googleMapsLink.setAttribute("onclick", "openInGoogleMaps('" + firstObjectData.name + "', '" + firstObjectData.address + "'); return false;");
    })
    .catch(error => console.error('Error fetching JSON: ', error));

// Line 
// Functie om een locatiekaart te maken en toe te voegen aan de kaartcontainer
function createLocationCard(location) {
    // Maak een nieuw div-element voor de locatiekaart
    var locationCard = document.createElement('div');
    locationCard.classList.add('location-card');

    // Vul de inhoud van de locatiekaart in
    locationCard.innerHTML = `
        <h2>${location.name}</h2>
        <p><strong>Address:</strong> ${location.address}</p>
    `;

    // Voeg de locatiekaart toe aan de kaartcontainer
    var locationCardContainer = document.getElementById('location-card-container');
    locationCardContainer.appendChild(locationCard);
}

// Laad de JSON-gegevens vanuit data.json en maak locatiekaarten
function loadDataAndCreateLocationCards() {
    fetch('data.json')
        .then(response => response.json())
        .then(json => {
            json.locaties.forEach(location => {
                createLocationCard(location);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Voer de functie uit om de JSON-gegevens te laden en locatiekaarten te maken wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', loadDataAndCreateLocationCards);

