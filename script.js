function openInGoogleMaps(address) {
    var googleMapsURL = "https://www.google.com/maps?q=" + encodeURI(address);
    document.getElementById("googleMapsLink").href = googleMapsURL;
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        var firstObjectData = data.data[0].address;
        openInGoogleMaps(firstObjectData);
    })
    .catch(error => console.error('Error fetching JSON: ', error));