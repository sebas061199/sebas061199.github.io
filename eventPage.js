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
            // Sorteer de events op basis van de startdatum
            const sortedEvents = data.events.sort((a, b) => new Date(a.duration[0]) - new Date(b.duration[0]));

            // Maak event cards op basis van de gesorteerde JSON-gegevens
            sortedEvents.forEach((event) => {
                createEventCard(event);
            });
        })
        .catch((error) => console.error("Error fetching JSON: ", error));
}

// Function to create event cards
function createEventCard(event) {
    // Check if event date is in the future
    if (new Date(event.duration[0]) < new Date()) {
        // Event date has passed, do not create event card
        return;
    }

    // Create a new div element for the event card
    var eventCard = document.createElement("div");
    eventCard.classList.add("event-card");

    var photoSrc = event.photo !== '' ? 'assets/' + event.photo : 'assets/no-image.png';
    eventCard.innerHTML = `
        <h2>${event.name}</h2>
        <img src="${photoSrc}" alt="${event.name}" class="event-photo">
        <p>Locatie: ${event.location}</p>
        <p>${event.description}</p>
        <p>Datum: ${event.duration.join(' - ')}</p>
    `;

    // Voeg de event card toe aan de card container
    var eventCardContainer = document.getElementById("event-card-container");
    eventCardContainer.appendChild(eventCard);
}

// Roep de functie aan om gegevens te laden en event cards te maken
loadDataAndUpdateLinkAndCreateEventCards();
