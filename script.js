(async function () {
  const defaultItem = '❓'; // Standaard item om weer te geven bij het resetten
  const doors = document.querySelectorAll('.door');
  const playButton = document.querySelector('#spinner');
  const resetButton = document.querySelector('#reseter');
  const categoryDropdown = document.getElementById('categoryDropdown');
  let items = []; // Array om de nummers van locaties met overeenkomende categorie op te slaan

  // Verberg de resetknop bij het laden van de pagina
  resetButton.style.display = 'none';

  playButton.addEventListener('click', spin);
  resetButton.addEventListener('click', reset);

  // Functie om categorieën naar de front-end te brengen
  async function loadCategories() {
    const data = await fetch('data.json').then(response => response.json());
    
    // Loop door alle locaties
    data.locaties.forEach(location => {
      // Voeg de primaire categorie toe aan de categorieënlijst
  
      // Voeg de geselecteerde categorie toe als secundaire categorie aan de categorieënlijst
      if (location.secondaryCategories && location.secondaryCategories.includes(selectedCategory)) {
        categories.add(selectedCategory);
      }
    });
  
    // Maak categorieknoppen voor alle unieke categorieën
 
  }
  

  // Laad categorieën wanneer de pagina geladen is
  window.addEventListener('DOMContentLoaded', loadCategories);

  // Luister naar klikgebeurtenissen op de categorie knoppen
  categoryDropdown.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      const selectedCategory = event.target.dataset.value;
      categoryDropdown.value = selectedCategory;
      if (selectedCategory === 'Alle') {
        init(true, 1, 1, false); // Initialiseer de slotmachine met alle locaties
      } else {
        init(true, 1, 1, false, selectedCategory); // Initialiseer de slotmachine met de geselecteerde categorie
      }
      // playButton.removeEventListener('click', spin); // Verwijder de eventlistener van de startknop
    }
  });

  async function init(firstInit = true, groups = 1, duration = 1, resetMode = false, selectedCategory) {
    // Haal de locatienummers op uit data.json en voeg deze toe aan de items array
    const data = await fetch('data.json').then(response => response.json());
    const locations = data.locaties;

    // Resetmodus: toon alleen het standaarditem in de box
    if (resetMode) {
      for (const door of doors) {
        const boxes = door.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = defaultItem;
        boxesClone.appendChild(box);
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        door.replaceChild(boxesClone, boxes);
      }
      return;
    }

    // Filter locaties met overeenkomende categorie of selecteer alle locaties
    if (selectedCategory === 'alle') {
      items = locations.map(location => location.number);
    } else {
      // Filter locaties met overeenkomende categorie
      const filteredLocations = locations.filter(location => location.category === selectedCategory);
      // Selecteer nummers van locaties met overeenkomende categorie
      items = filteredLocations.map(location => location.number);
    }

    console.log("selectedCategory:", selectedCategory);
    console.log("items:", items);

    for (const door of doors) {
      if (firstInit) {
          door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
          continue; // Ga naar de volgende deur als deze al gesponnen is
      }

      const boxes = door.querySelector('.boxes');
      console.log(boxes); // Debug: controleer of de .boxes elementen worden gevonden

      const boxesClone = boxes.cloneNode(false);

      if (!firstInit) {
          const pool = [];
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
              arr.push(...items);
          }
          pool.push(...shuffle(arr));

        // Vul de boxen met de nummers uit de pool
        for (const item of pool) {
          const box = document.createElement('div');
          box.classList.add('box');
          box.textContent = item;
          boxesClone.appendChild(box);
        }
      } else {
        // Als het de eerste initialisatie is, toon de standaarditem in de box
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = defaultItem;
        boxesClone.appendChild(box);
      }

      // Vervang de bestaande boxen door de gekloonde boxen met nummers
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      door.replaceChild(boxesClone, boxes);
    }
  }

  async function spin() {
    resetButton.style.display = 'none'; // Verberg de reset knop voordat het spinnen begint
    playButton.style.display = 'none'; // Verberg de play knop tijdens het spinnen

    // Voer het spinnen uit met een maximale duur van 3 seconden
    const startTime = performance.now(); // Tijdstip waarop het spinnen begint
    let elapsedTime = 0; // Verstreken tijd tijdens het spinnen

    const spinDuration = 3000; // Totale duur van het spinnen in milliseconden
    const spinInterval = 100; // Interval tussen elk framespin in milliseconden
    const frameDuration = 200; // Duur van elk framespin in milliseconden

    while (elapsedTime < spinDuration - frameDuration) {
      // Update de laatste box met een willekeurig nummer
      const lastDoor = doors[doors.length - 1];
      const lastBox = lastDoor.querySelector('.box');
      lastBox.textContent = items[Math.floor(Math.random() * items.length)];

      // Wacht voor het volgende framespin
      await new Promise(resolve => setTimeout(resolve, spinInterval));

      // Update de verstreken tijd
      elapsedTime = performance.now() - startTime;
    }

    // Laatste framespin: selecteer het uiteindelijke nummer en toon de resetknop
    const selectedNumber = items[Math.floor(Math.random() * items.length)];
    const lastDoor = doors[doors.length - 1];
    const lastBox = lastDoor.querySelector('.box');
    lastBox.textContent = selectedNumber;
    resetButton.style.display = 'block';

    // Toon de modal met het geselecteerde nummer
    displayNumberModal(selectedNumber);
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

  // Display modal met het geselecteerde nummer
  function displayNumberModal(selectedNumber) {
    fetch('data.json')
      .then((response) => response.json())
      .then((json) => {
        // Zoek de locatie die overeenkomt met het doorgegeven nummer
        const location = json.locaties.find((locatie) => locatie.number === selectedNumber);
        if (location) {
          // Maak en toon de locatiekaart als er een overeenkomstige locatie is gevonden
          const locationCard = createLocationCard(location);
          showModal(locationCard);
        } else {
          console.log('Geen overeenkomstige locatie gevonden voor nummer:', selectedNumber);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  function openInGoogleMaps(name, address) {
    var googleMapsURL =
      "https://www.google.com/maps?q=" +
      encodeURIComponent(name + ", " + address);
    window.open(googleMapsURL, "_blank");
  }

  document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
      .then((response) => response.json())
      .then((json) => {
        json.locaties.forEach((location) => {
          createLocationCard(location);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  });

  function createLocationCard(location) {
    var locationCard = document.createElement("div");
    locationCard.classList.add("location-card");
    var photoSrc = location.photo !== '' ? 'assets/' + location.photo : 'assets/no-image.png';
    locationCard.innerHTML = `
      <h2>${location.name}</h2>
      <img src="${photoSrc}" alt="${location.name}" class="location-photo">
      ${location.description ? `<h5>${location.description}</h5>` : ""}
      <p>${location.address}</p>
      <button class="googleMapsLink">Route</button>
    `;

    // Voeg een klikgebeurtenis toe aan de knop voor het openen van Google Maps
    var googleMapsLink = locationCard.querySelector(".googleMapsLink");
    googleMapsLink.addEventListener("click", function (event) {
      openInGoogleMaps(location.name, location.address);
      event.preventDefault(); // Voorkom standaardgedraging van de link
      showModal(locationCard);
    });

    return locationCard;
  }

  function showModal(content) {
    // Maak een element voor de sluitknop
    const closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.textContent = "×"; // Tekst voor de sluitknop, bijvoorbeeld 'X'

    // Voeg een event listener toe aan de sluitknop om de modal te sluiten wanneer erop wordt geklikt
    closeButton.addEventListener("click", function () {
      closeModal();
    });

    // Voeg de sluitknop toe aan de modale inhoud
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = ''; // Leeg de modale inhoud
    modalContent.appendChild(closeButton); // Voeg de sluitknop toe
    modalContent.appendChild(content); // Voeg de inhoud van de modal toe

    // Toon de modal
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    // Start het confetti-effect binnen de confetti-container
  }

  function closeModal() {
    // Sluit de modal
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }

  init(true); // Initialiseer de slotmachine bij het laden van de pagina met resetMode ingesteld op true
})();
