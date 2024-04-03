function openInGoogleMaps(address) {
    var googleMapsURL = "https://www.google.com/maps?q=" + encodeURI(address);
    document.getElementById("googleMapsLink").href = googleMapsURL;
}

fetch('data.json')