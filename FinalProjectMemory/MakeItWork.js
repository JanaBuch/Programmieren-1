const cards = document.querySelectorAll('.card');
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let player = 1;

//change player (WIP)
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

document.getElementById('ActivePlayerSpace').value = player;

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

  if (firstCard.dataset.framework === secondCard.dataset.framework) {

    disableCards();

    resetBoard();

    return;

  }

  //reset the cards when no match is found
  else {
    lockBoard = true;
    //kenzeichnungsfunktion hier hinzufügen
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 900)
  }

}

function disableCards() {

  firstCard.removeEventListener('click', flipCard);

  secondCard.removeEventListener('click', flipCard);

  firstCard.classList.add('match');
  secondCard.classList.add('match');

}

function resetBoard() {

  [hasFlippedCard, lockBoard] = [false, false];

  [firstCard, secondCard] = [null, null];

}

// function markMatch {
// setTimeout(()=>{
//   firstCard.classList.add('match');
//   secondCard.classList.add('match');}, 500)}

(function shuffle() {

  cards.forEach(card => {

    let ramdomPos = Math.floor(Math.random() * 12);

    card.style.order = ramdomPos;

  });

})();

cards.forEach(card => card.addEventListener('click', flipCard));

