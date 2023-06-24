const cards = document.querySelectorAll('.card');
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;

let player = 1;
let player1Matches = 0;
let player2Matches = 0;

let timerInterval;



//switch player, Der Spieler wechselt wenn eine runde vorbei ist
function switchPlayer() {
  player = player === 1 ? 2 : 1;
  document.getElementById('ActivePlayerSpace').value = player;
}

//timer
window.addEventListener('DOMContentLoaded', startTimer);

function startTimer() {
  var timerElement = document.getElementById('timer');
  var startTime = new Date().getTime(); // Startzeit in Millisekunden

  // Aktualisiere den Timer alle 1 Sekunde
  timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    var currentTime = new Date().getTime(); // Aktuelle Zeit in Millisekunden
    var elapsedTime = currentTime - startTime; // Vergangene Zeit in Millisekunden

    // Berechne Minuten und Sekunden
    var minutes = Math.floor(elapsedTime / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);

    // Füge eine führende Null hinzu, wenn Minuten oder Sekunden einstellig sind
    var formattedTime = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);

    // Aktualisiere den Timer im HTML
    timerElement.textContent = formattedTime;
  }
}

function stopTimer() {
  clearInterval(timerInterval); // Intervall wird gelöscht, Timer wird angehalten
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

    updateCounter();

    checkAllCardsMatch();

    vanishCard();

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
      switchPlayer();
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

function updateCounter() { //Wenn ein Match gefunden wurde wird der Matchcounter des jeweiligen Spielers raufgezählt
  if (player === 1) {
    player1Matches++;
    document.getElementById('Player1TextSpace').value = 'Matches: ' + player1Matches;
  } else {
    player2Matches++;
    document.getElementById('Player2TextSpace').value = 'Matches: ' + player2Matches;
  }
}

function checkAllCardsMatch() {
  let allMatch = true;

  cards.forEach(card => {
    if (!card.classList.contains('match')) {
      allMatch = false;
      return;
    }
  });

  if (allMatch) {//wenn alle Elemente die Klasse match haben wird diese funktion ausgeführt
    console.log('spiel fertig');

    stopTimer();
  }
}

function vanishCard() {
  const matchCards = document.querySelectorAll('.match');
  setTimeout(() => {
    matchCards.forEach(card => {
      card.classList.add('matchfound');
      card.classList.remove('match');
      addFoundClassToChild();
    });
  }, 1500);
}



function addFoundClassToChild() {
  const parentElements = document.querySelectorAll('.matchfound');

  parentElements.forEach(parentElement => {
    const childElement = parentElement.querySelector('.back');
    if (childElement) {
      childElement.classList.add('found');
    }
  });
}



const button = document.getElementById('Restart'); //Restart button wird in der Variable gespeichert

function resetGame() { //Setzt das Spiel zurück
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;

  // Spielstände und aktiven Spieler Zurücksetzen
  player1Matches = 0;
  player2Matches = 0;
  player = 1;
  
document.getElementById('Player1TextSpace').value = 'Matches: ';
  document.getElementById('Player2TextSpace').value = 'Matches: ';
  document.getElementById('ActivePlayerSpace').value = 'Player 1';
}

function resetVanish() {
  const childElements = document.querySelectorAll('.found');
  
  setTimeout (() =>
  childElements.forEach(childElement => {
    childElement.classList.remove('found');
  }), 600);
}

function ResetCards() {
  // Zurücksetzen der Karten
  cards.forEach(card => {
    card.classList.remove('flip');
    card.classList.remove('matchfound');
    card.addEventListener('click', flipCard);
  });
}


  function shuffleAnew() { // Karten neu mischen
  setTimeout (() => 
    cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  }), 600);
}

function resetTimer() { //zurücksetzen des Timers
  var timerElement = document.getElementById('timer');
  clearInterval(timerInterval); // Intervall wird gelöscht, Timer wird angehalten
  timerElement.textContent = '00:00'; // Setze den Timer auf den Ausgangswert zurück
  startTime = new Date().getTime(); // Setze die Startzeit auf die aktuelle Zeit
  timerInterval = setInterval(updateTimer, 1000); // Starte den Timer wieder

  function updateTimer() { //Timer wird neu gestartet
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    var minutes = Math.floor(elapsedTime / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);
    var formattedTime = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    timerElement.textContent = formattedTime;
  }
}

button.addEventListener('click', resetGame); //Event listener führen die funktionen aus
button.addEventListener('click', ResetCards);
button.addEventListener('click', shuffleAnew);
button.addEventListener('click', resetTimer);
button.addEventListener('click', resetVanish);




// function markMatch { //Fehlgeschlagerner versuch den Karten erst nach einer kurzen Zeit einen Leuchteffekt
// setTimeout(()=>{
//   firstCard.classList.add('match');
//   secondCard.classList.add('match');}, 500)}


//if alle karten === klasse match, timer stoppen, sieger anzeigen, game decided


