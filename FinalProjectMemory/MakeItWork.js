const cards = document.querySelectorAll('.card');
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let player = 1;

let seconds = 0;
let timer;

//Schwierigkeitsstufe checken
function checkDifficulty(event) {
  let amountOfCards = event.target.id;
  // let amountOfCards = 6;
  document.getElementById("board").style.gridTemplateColumns = `repeat(${amountOfCards / 5}, 20px)`;

  let buttons = document.querySelectorAll(".difficulty");
  buttons.forEach(function(buttons) {
      buttons.style.display = "none";
  })
  createCards(amountOfCards);
}

//Karten erstellen funktion
let dataSet = []; function createCards(amountOfCards) {
  let counter = 0;
  let dataVar = 1;
  let childID = 0;
  let parentID = 0;
  for (let i = 1; i <= amountOfCards; i++) {
    if (counter == 2) { dataVar++; counter = 0; } dataSet.push({ data: dataVar, text: dataVar, childID: childID, parentID: parentID, });
    counter++;
    childID++;
    parentID++;
  }
  shuffleData(dataSet);
  console.table(dataSet);
  for (let i = 0; i < amountOfCards; i++) {
    setTimeout(() => {        //creating the correct amount of playing cards, based on the entered difficulty(amountOfCards)         cardsParent = document.createElement("div");         cardsParent.classList.add("card");         cardsParent.id = "parent" + dataSet[i].parentID;           card = document.createElement("div");         card.data = dataSet[i].data;           
      cards.id = "child" + dataSet[i].childID;

      cards.style.backgroundImage = `url(.//${dataSet[i].data}.png)`;

      cards.classList.add("card");
      cards.classList.add("back-img");
      text = document.createTextNode(dataSet[i].text);


      cards.appendChild(text);

      cards.addEventListener("click", function () {
        cardClicked(event);
      });

      cardsParent.appendChild(cards);
      document.getElementById("mainBoard").appendChild(cardsParent);
      
      
      // Animation();       

      let startPos = document.getElementById("start").getBoundingClientRect();
      let endPos = document.getElementById("parent" + dataSet[i].parentID).getBoundingClientRect();
      let child = document.getElementById("child" + dataSet[i].childID);


      child.style.top = startPos.top - endPos.top + 'px'; // Ändere die Berechnung der top-Position
      child.style.left = startPos.left - endPos.left + 'px'; // Ändere die Berechnung der left-Position

      setTimeout(() => {
        child.style.top = '0';
        child.style.left = '0';
      }, 20);
      if (i === amountOfCards - 1) {
        setTimeout(() => {
          multiplayer();
          document.getElementById("restart").style.display = "block";
          // Hier kommt der Code, der nach der Wartezeit von 2 Sekunden ausgeführt werden soll
        }, 700);
      }
    }, 60 * i);//speed for the animation
  }
}

//change player (WIP), Der Spieler wechselt wenn eine runde vorbei ist
function switchPlayer() {
  if (player = 1) {
    player = 2;
    return
  }
  if (player = 2) {
    player = 1;
    return
  }
}

//wählt den die Textbox für den Aktiven Spiler aus
document.getElementById('ActivePlayerSpace').value = player;

function startTimer() {
  timer = setInterval(updateTimer, 1000); // Timer wird jede Sekunde aktualisiert
}

function updateTimer() {
  seconds++;
  printTime //timer wert in enstpechendes Feld printen
}

function printTime() {
  Timer.value = seconds;
}

//Flip thy cards
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;


  this.classList.add('flip');

  if (!hasFlippedCard) {

    hasFlippedCard = true;

    firstCard = this;

    return
  }

  secondCard = this;

  checkForMatch();
}


//disable the cards when a match has been found
function checkForMatch() {

  if (firstCard.dataset.framework === secondCard.dataset.framework) { //Wenn die Karten gleich sind werden sie Aufgedeckt gelassen

    disableCards();

    resetBoard();

    return;

  }

  //reset the cards when no match is found
  else {
    lockBoard = true;
    //kenzeichnungsfunktion für missmatch hier hinzufügen
    setTimeout(() => { //Karten bleiben für einen Moment aufgedeckt, und drehen sich dann wieder
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 900)
  }

}

function disableCards() { //wird usgeführt sobald ein mach gefunden wurde

  firstCard.removeEventListener('click', flipCard); //der eventlistener wird entfernt so das die karte nich mehr auf ein click reagiert

  secondCard.removeEventListener('click', flipCard);

  firstCard.classList.add('match'); //Fügt ein eine CSS Klasse hinzu um den Karten einen Leuchteffekt zu geben
  secondCard.classList.add('match');

}

function resetBoard() { //Ende der Runde, Zustand das Karten geklickt wurde wird Zurückgesetzt.

  [hasFlippedCard, lockBoard] = [false, false];

  [firstCard, secondCard] = [null, null];

}

(function shuffle() {

  cards.forEach(card => {

    let ramdomPos = Math.floor(Math.random() * 12); //Karten bekommmen eine Zufällige position zugewiesen

    card.style.order = ramdomPos;

  });

})();

cards.forEach(card => card.addEventListener('click', flipCard));

function resetGame() { //Setzt das Spiel zurück
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;

  // Zurücksetzen der Karten
  cards.forEach(card => {
    card.classList.remove('flip');
    card.classList.remove('match');
    card.addEventListener('click', flipCard);
  });

  // Karten neu mischen
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });

  //add reset timer
}

// function markMatch { //Fehlgeschlagerner versuch den Karten erst nach einer kurzen Zeit einen Leuchteffekt
// setTimeout(()=>{
//   firstCard.classList.add('match');
//   secondCard.classList.add('match');}, 500)}


//if alle karten === klasse match, timer stoppen, sieger anzeigen, game decided


