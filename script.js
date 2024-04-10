// Fetch JSON data from file
fetch("data.json")
    .then((response) => response.json())
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
    })
    .catch((error) => console.error("Error fetching JSON: ", error));

function createLocationCard(location) {
    // Maak een nieuw div-element voor de locatiekaart
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

    // Voeg de locatiekaart toe aan de kaartcontainer
    var locationCardContainer = document.getElementById(
        "location-card-container"
    );
    locationCardContainer.appendChild(locationCard);
}

// Laad de JSON-gegevens vanuit data.json en maak locatiekaarten
function loadDataAndCreateLocationCards() {
    fetch("data.json")
        .then((response) => response.json())
        .then((json) => {
            json.locaties.forEach((location) => {
                createLocationCard(location);
            });
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// Voer de functie uit om de JSON-gegevens te laden en locatiekaarten te maken wanneer de pagina geladen is
document.addEventListener("DOMContentLoaded", loadDataAndCreateLocationCards);

// Function to open Google Maps with specified name and address
function openInGoogleMaps(name, address) {
    var googleMapsURL =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(name + ", " + address);
    window.open(googleMapsURL, "_blank");
}

(function () {
    const defaultItem = '❓'; // Standaard item om weer te geven bij het resetten
    const doors = document.querySelectorAll('.door');
    const playButton = document.querySelector('#spinner');
    const resetButton = document.querySelector('#reseter');
    
    // Verberg de resetknop bij het laden van de pagina
    resetButton.style.display = 'none';
  
    playButton.addEventListener('click', spin);
    resetButton.addEventListener('click', reset);
  
    function init(firstInit = true, groups = 1, duration = 1, resetMode = false) {
      for (const door of doors) {
        if (firstInit) {
          door.dataset.spinned = '0';
        } else if (door.dataset.spinned === '1') {
          return;
        }
  
        const boxes = door.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
  
        if (!firstInit) {
          const pool = [];
          const items = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',    
            '12',
            '13',
            '14',
            '15',
          ];
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...items);
          }
          pool.push(...shuffle(arr));
  
          boxesClone.addEventListener(
            'transitionstart',
            function () {
              door.dataset.spinned = '1';
              this.querySelector('.box').style.filter = 'blur(1px)';
              playButton.style.display = 'none'; // Verberg de play knop tijdens het spinnen
              resetButton.style.display = 'none'; // Verberg de reset knop tijdens het spinnen
            },
            { once: true }
          );
  
          boxesClone.addEventListener(
            'transitionend',
            function () {
              this.querySelector('.box').style.filter = 'blur(0)';
              setTimeout(() => {
                resetButton.style.display = 'block'; // Toon de reset knop na 4 seconden
              }, 4000);
            }
          );
  
          const randomItem = resetMode ? defaultItem : pool[Math.floor(Math.random() * pool.length)];
          const box = document.createElement('div');
          box.classList.add('box');
          box.textContent = randomItem;
          boxesClone.appendChild(box);
        } else {
          const box = document.createElement('div');
          box.classList.add('box');
          box.textContent = defaultItem;
          boxesClone.appendChild(box);
        }
        
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        door.replaceChild(boxesClone, boxes);
      }
    }
  
    async function spin() {
      resetButton.style.display = 'none'; // Verberg de reset knop voordat de animatie begint
      playButton.style.display = 'none'; // Verberg de play knop tijdens het spinnen
      setTimeout(() => {
        resetButton.style.display = 'block'; // Toon de reset knop na 4 seconden
      }, 3000);
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          init(false, 1, 4);
        }, i * 100);
      }
    }
  
    function reset() {
      init(false, 1, 1, true); // Reset de slotmachine door alleen het standaarditem weer te geven
      playButton.style.display = 'block'; // Toon de play knop na het resetten
      resetButton.style.display = 'none'; // Verberg de reset knop na het resetten
    }
  
    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }
  
    init(true); // Initialiseer de slotmachine bij het laden van de pagina met resetMode ingesteld op true
  })();
  
  
  
  
  





