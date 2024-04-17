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
    // Haal de locatienummers op uit data.json en voeg deze toe aan de items array
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const locations = data.locaties;
        const items = [];
        locations.forEach(location => {
          items.push(location.number);
        });

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
      })
      .catch(error => console.error('Er is een fout opgetreden bij het ophalen van de data:', error));
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

function displayLocationCardModal(location) {
  var modal = document.getElementById("myModal");
  var modalContent = document.querySelector(".modal-content");

  // Maak een nieuw div-element voor de locatiekaart
  var locationCard = document.createElement("div");
  locationCard.classList.add("location-card");

  var photoSrc = location.photo !== '' ? 'assets/' + location.photo : 'assets/no-image.png';
  locationCard.innerHTML = `
    <h2>${location.name}</h2>
    <img src="${photoSrc}" alt="${location.name}" class="location-photo">
    ${location.description ? `<h5>${location.description}</h5>` : ""}
    <p>${location.address}</p>
    <button onclick="openInGoogleMaps('${location.name}', '${location.address}')">Route</button>
  `;

  // Voeg locatiekaart toe aan modal
  modalContent.innerHTML = ''; // Clear modal content
  modalContent.appendChild(locationCard);

  // Toon modal
  modal.style.display = "block";
}



