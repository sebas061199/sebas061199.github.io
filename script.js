(function () {
  const defaultItem = '❓'; // Standaard item om weer te geven bij het resetten
  const doors = document.querySelectorAll('.door');
  const playButton = document.querySelector('#spinner');
  const resetButton = document.querySelector('#reseter');
  let spinningDoors = 0; // Houdt bij hoeveel deuren momenteel aan het spinnen zijn

  // Verberg de resetknop bij het laden van de pagina
  resetButton.style.display = 'none';

  playButton.addEventListener('click', spin);
  resetButton.addEventListener('click', reset);

  async function init(firstInit = true, groups = 1, duration = 1, resetMode = false) {
    // Haal de locatienummers op uit data.json en voeg deze toe aan de items array
    const data = await fetch('data.json').then(response => response.json());
    const locations = data.locaties;
    const items = locations.map(location => location.number);

    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
        continue; // Ga naar de volgende deur als deze al gesponnen is
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
            spinningDoors++; // Houd bij hoeveel deuren momenteel aan het spinnen zijn
          },
          { once: true }
        );

        boxesClone.addEventListener(
          'transitionend',
          function () {
            this.querySelector('.box').style.filter = 'blur(0)';
            spinningDoors--; // Verminder het aantal deuren dat momenteel aan het spinnen is
            if (spinningDoors === 0) {
              // Als er geen deuren meer aan het spinnen zijn, toon de reset knop
              setTimeout(() => {
                resetButton.style.display = 'block'; // Toon de reset knop na 4 seconden
                const selectedNumber = this.querySelector('.box').textContent;
                displayNumberModal(selectedNumber); // Toon de modal met het geselecteerde nummer
              }, 4000);
            }
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
    resetButton.style.display = 'none'; // Verberg de reset knop voordat het spinnen begint
    playButton.style.display = 'none'; // Verberg de play knop tijdens het spinnen
  
    // Voer het spinnen uit met een maximale duur van 3 seconden
    const startTime = performance.now(); // Tijdstip waarop het spinnen begint
    let elapsedTime = 0; // Verstreken tijd tijdens het spinnen
  
    while (elapsedTime < 3000) {
      init(false, 1, 4); // Voer het spinnen uit
      await new Promise(resolve => setTimeout(resolve, 100)); // Wacht 100 ms voordat de volgende iteratie begint
      elapsedTime = performance.now() - startTime; // Bereken de verstreken tijd
    }
  
    // Na het spinnen, toon de resetknop en haal het geselecteerde nummer op
    resetButton.style.display = 'block'; // Toon de reset knop na het spinnen
    const selectedNumber = doors[doors.length - 1].querySelector('.box').textContent; // Krijg het nummer van de laatste deur
    displayNumberModal(selectedNumber); // Toon de modal met het geselecteerde nummer
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
  function displayNumberModal(number) {
    var modal = document.getElementById("myModal");
    var modalContent = document.querySelector(".modal-content");
  
    // Maak een nieuw div-element voor de modale inhoud met het nummer
    var numberDiv = document.createElement("div");
    numberDiv.textContent = "Geselecteerd nummer: " + number;
  
    // Voeg een sluitknop toe aan de modale inhoud
    var closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", function() {
      modal.style.display = "none"; // Sluit de modal bij klik op de sluitknop
    });
    
    // Voeg de sluitknop en modale inhoud toe aan de modale container
    modalContent.innerHTML = ''; // Wis de modale inhoud
    modalContent.appendChild(closeButton); // Voeg de sluitknop toe
    modalContent.appendChild(numberDiv); // Voeg de modale inhoud toe
  
    // Toon modal
    modal.style.display = "block";
  }

  init(true); // Initialiseer de slotmachine bij het laden van de pagina met resetMode ingesteld op true
})();
