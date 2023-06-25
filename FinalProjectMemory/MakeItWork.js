const cards = document.querySelectorAll('.card');
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;

let player = 1;
let player1Matches = 0;
let player2Matches = 0;

let timerInterval;

//Audio
var audio = document.getElementById('audioPlayer'); //background audio
var playButton = document.getElementById('playButton');
var isPlaying = false;

var flippingSound = document.getElementById('flipSound')

function togglePlayback() { //button switches inbetween play and pause icon
  if (isPlaying) {
    audio.pause();
    playButton.textContent = '\u25B7';
  } else {
    audio.play();
    playButton.textContent = '\u23F8';
  }

  isPlaying = !isPlaying; //plays the music when paused, pauses the music then played. Reverses the current state
}

//switch player, alternates between player 1 and 2
function switchPlayer() {
  player = player === 1 ? 2 : 1;
  document.getElementById('ActivePlayerSpace').value = player;
}

//timer
window.addEventListener('DOMContentLoaded', startTimer); //timer starts when the page is loaded

function startTimer() {
  var timerElement = document.getElementById('timer');
  var startTime = new Date().getTime(); // starting time is milliseconds

  timerInterval = setInterval(updateTimer, 1000); // refresh timer every second

  function updateTimer() {
    var currentTime = new Date().getTime(); // current time in miliseconds
    var elapsedTime = currentTime - startTime; // elapsedt time in miliseconds

    var minutes = Math.floor(elapsedTime / 60000); // calculate minutes and secounds
    var seconds = Math.floor((elapsedTime % 60000) / 1000);

    var formattedTime = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2); // Put a zero infront of the curent value, if minutes or seconds are one digit

    timerElement.textContent = formattedTime; // put timer value in the corresponding html element
  }
}

function stopTimer() {
  clearInterval(timerInterval); // Timer interval gets deleted, this stops the timer
}



//Flip thy cards
function flipCard() {
  if (lockBoard) return; // if the board is locked, this function won't execute 
  if (this === firstCard) return;

  var flipSound = new Audio('clickselect-92098.mp3'); //plays a sound when card gets flipped
  flipSound.volume = 0.15
  flipSound.play();

  this.classList.add('flip'); //adds flip class to display the cards backside

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

  if (firstCard.dataset.framework === secondCard.dataset.framework) { //If the symbols match, leave the cards open

    disableCards();

    resetBoard();

    updateCounter();

    checkAllCardsMatch();

    vanishCard();

    var matchBell = new Audio('glass-hit.mp3'); //plays a sound when the cards match up
    matchBell.volume = 0.15
    matchBell.play();


    return;

  }

  //reset the cards when no match is found
  else {
    lockBoard = true;
    setTimeout(() => { //Cards stay flipped for a moment, then the flip class gets removed to turn them again
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
      switchPlayer();
    }, 900)
  }

}

function disableCards() { //executes when a match is found

  firstCard.removeEventListener('click', flipCard); //Remove event listener so the card won't respond to a click anymore

  secondCard.removeEventListener('click', flipCard);//Same for the secod card

  firstCard.classList.add('match'); //Marks the cards as matched
  secondCard.classList.add('match');
  firstCard.classList.add('matchMarker'); //Adds a CSS class for the glow effect
  secondCard.classList.add('matchMarker');

}

function resetBoard() { //End of turn, state of the cards get reset

  [hasFlippedCard, lockBoard] = [false, false];

  [firstCard, secondCard] = [null, null];

}

(function shuffle() {

  cards.forEach(card => {

    let ramdomPos = Math.floor(Math.random() * 12); //Cards get assined a random possition

    card.style.order = ramdomPos;

  });

})();

cards.forEach(card => card.addEventListener('click', flipCard));

function updateCounter() { //If a player finds a match, their counter gets increased by one
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

  if (allMatch) {//if all elements have the class 'match' the timer gets stopped
    stopTimer();
  }
}

function vanishCard() { //removes the glow and adds a class to the backside div
  const matchCards = document.querySelectorAll('.match');
  setTimeout(() => {
    matchCards.forEach(card => {
      card.classList.add('matchfound');
      card.classList.remove('matchMarker');
      addFoundClassToChild();
    });
  }, 1500);
}



function addFoundClassToChild() { //adds a CSS class to the backside so it gets invisible
  const parentElements = document.querySelectorAll('.matchfound');

  parentElements.forEach(parentElement => {
    const childElement = parentElement.querySelector('.back');
    if (childElement) {
      childElement.classList.add('found');
    }
  });
}



const button = document.getElementById('Restart'); //Restart button gets stored in a variable

function resetGame() { //resets the values
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;

  player1Matches = 0;
  player2Matches = 0;
  player = 1;

  document.getElementById('Player1TextSpace').value = 'Matches: '; //put the dispay back to start
  document.getElementById('Player2TextSpace').value = 'Matches: ';
  document.getElementById('ActivePlayerSpace').value = 'Player 1';
}

function resetVanish() { //remove found so the backsides are visisble again
  const childElements = document.querySelectorAll('.found');

  setTimeout(() =>
    childElements.forEach(childElement => {
      childElement.classList.remove('found');
    }), 600);
}

function ResetCards() {

  var dealingSound = new Audio('whoosh.mp3'); //plays a whoosh sound when the cards get reset
  dealingSound.volume=0.15
  dealingSound.play();

  cards.forEach(card => { //reset the cards
    card.classList.remove('flip');
    card.classList.remove('matchfound');
    card.classList.remove('match');
    card.addEventListener('click', flipCard);
  });
}

function shuffleAnew() { // shuffle the cards anew, with a delay so the cards get suffeled after they turned back
  setTimeout(() =>
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    }), 600);
}

function resetTimer() { //reset the timer
  var timerElement = document.getElementById('timer');
  clearInterval(timerInterval); // stop timer
  timerElement.textContent = '00:00'; // reset value
  startTime = new Date().getTime(); 
  timerInterval = setInterval(updateTimer, 1000); // set the interval anew

  function updateTimer() { //restart the timer
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    var minutes = Math.floor(elapsedTime / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);
    var formattedTime = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    timerElement.textContent = formattedTime;
  }
}

button.addEventListener('click', resetGame); //Event listener to call all the reset functions
button.addEventListener('click', ResetCards);
button.addEventListener('click', shuffleAnew);
button.addEventListener('click', resetTimer);
button.addEventListener('click', resetVanish);

// All sound effects from Pixabay
//All images made by me
