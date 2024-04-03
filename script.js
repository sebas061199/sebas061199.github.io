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