function openInGoogleMaps(event, name, address) {
    event.preventDefault();
    var googleMapsURL = "https://www.google.com/maps?q=" + encodeURIComponent(name+ ", " + address);
    window.open(googleMapsURL, "_blank");
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        var firstObjectData = data.locaties[0];
        var googleMapsLink = document.getElementById("googleMapsLink");
        googleMapsLink.addEventListener("click", function(event) {
            openInGoogleMaps(firstObjectData.name, firstObjectData.address);
        });
        
    })
    .catch(error => console.error('Error fetching JSON: ', error));