// Laad de JSON-gegevens vanuit data.json, update de link, en maak locatiekaarten
function loadDataAndUpdateLinkAndCreateLocationCards() {
    fetch("data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Netwerk response was niet ok');
            }
            return response.json();
        })
        .then((data) => {
            // Get the name and address from the first object in the JSON data
            var firstObjectData = data.locaties[0];

            // Update the link with onclick attribute
            var googleMapsLink = document.getElementById("googleMapsLink");
            googleMapsLink.setAttribute(
                "onclick",
                "openInGoogleMaps('" +
                firstObjectData.name +
                "', '" +
                firstObjectData.address +
                "'); return false;"
            );

            // Create location cards based on the JSON data
            data.locaties.forEach((location) => {
                createLocationCard(location);
            });

            // Load category filters and filter locations
            var categories = getUniqueCategories(data);
            addCategoryFilters(categories);
            filterLocaties();
        })
        .catch((error) => console.error("Error fetching JSON: ", error));
}

// Function to create location cards
function createLocationCard(location) {
    // Create a new div element for the location card
    var locationCard = document.createElement("div");
    locationCard.classList.add("location-card");

    var photoSrc = location.photo !== '' ? 'assets/' + location.photo : 'assets/no-image.png';
    locationCard.innerHTML = `
        <h2>${location.name}</h2>
        <img src="${photoSrc}" alt="${location.name
        }" class="location-photo">
        ${location.description ? `<h5>${location.description}</h5>` : ""
        }        
        <p>${location.address}</p>
        <button onclick="openInGoogleMaps('${location.name}', '${location.address
        }')">Route</button>
    `;

    // Add the location card to the card container
    var locationCardContainer = document.getElementById(
        "location-card-container"
    );
    locationCardContainer.appendChild(locationCard);
}

// Function to filter locations based on selected category
function filterLocaties() {
    var selectedCategory = document.getElementById("categoryDropdown").value;
    console.log("Geselecteerde categorie:", selectedCategory); // Log de geselecteerde categorie naar de console
    var locatiesList = document.getElementById("location-card-container");
    locatiesList.innerHTML = ''; // Clear the location card container before adding new items
  
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Netwerk response was niet ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Geladen locaties:", data.locaties);
            data.locaties.forEach(function(locatie) {
                if (selectedCategory === "alle" || locatie.category.includes(selectedCategory)) {
                    createLocationCard(locatie); // Only add location cards that match the selected category
                }
            });
        })
        .catch(error => console.error('Er is een fout opgetreden bij het laden van de locaties:', error));
  
    // Update dropdown summary text with selected category
    var dropdownSummary = document.getElementById("dropdownSummary");
    dropdownSummary.textContent = selectedCategory;
}

document.addEventListener("DOMContentLoaded", function () {
    // Set the default value for the category dropdown to 'alle'
    document.getElementById("categoryDropdown").value = "alle";
    // Filter de locaties op basis van de standaard geselecteerde categorie
    filterLocaties();
});



// Function to add category filters
function addCategoryFilters(categories) {
    var categoryDropdown = document.getElementById("categoryDropdown");
    categories.forEach(function (category) {
        var listItem = document.createElement("li");
        var link = document.createElement("a");
        link.href = "#";
        link.dataset.value = category;
        link.textContent = category;
        listItem.appendChild(link);
        categoryDropdown.appendChild(listItem);
    });
}

// Function to get unique categories
function getUniqueCategories(data) {
    var categories = [];
    data.locaties.forEach(function (locatie) {
        locatie.category.forEach(function (category) {
            if (!categories.includes(category)) {
                categories.push(category);
            }
        });
    });
    return categories;
}

// Listen for clicks on the category buttons
document.getElementById("categoryDropdown").addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
        var selectedCategory = event.target.dataset.value;
        document.getElementById("categoryDropdown").value = selectedCategory;
        filterLocaties();
    }
});

// Execute the function to load JSON data, update link, and create location cards when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Set the default value for the category dropdown to 'alle'
    document.getElementById("categoryDropdown").value = "alle";
    loadDataAndUpdateLinkAndCreateLocationCards();
});

// Function to open Google Maps with specified name and address
function openInGoogleMaps(name, address) {
    var googleMapsURL =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(name + ", " + address);
    window.open(googleMapsURL, "_blank");
}
