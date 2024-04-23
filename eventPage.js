// Laad de JSON-gegevens vanuit events.json, update de link, en maak event-cards
function loadDataAndUpdateLinkAndCreateEventCards() {
    fetch("events.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Netwerk response was niet ok');
            }
            return response.json();
        })
        .then((data) => {
            // Create event cards based on the JSON data
            data.events.forEach((event) => {
                createEventCard(event);
            });
        })
        .catch((error) => console.error("Error fetching JSON: ", error));
}

// Function to create event cards
function createEventCard(event) {
    // Create a new div element for the event card
    var eventCard = document.createElement("div");
    eventCard.classList.add("event-card");

    eventCard.innerHTML = `
        <h2>${event.name}</h2>
        <p>Locatie: ${event.location}</p>
        <p>${event.description}</p>
        <p>Datum: ${event.duration.join(' - ')}</p>
    `;

    // Add the event card to the card container
    var eventCardContainer = document.getElementById("event-card-container");
    eventCardContainer.appendChild(eventCard);
}

// Call the function to load data and create event cards
loadDataAndUpdateLinkAndCreateEventCards();
