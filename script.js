const cards = document.querySelectorAll(".memory-card");
//cards hold all the values of the cards under the class called memory-card

const resetButton = document.getElementById("reset-button");
// id under the name reset-button gets stored in the variable called resetButton

/* ------------------- MP3 files ----------------- */
const zoroSoundPath = "audio-sounds/zoro.mp3";
const zoroAudio = new Audio(zoroSoundPath);
zoroAudio.volume = 0.1;
// These lines create an Audio object for the sound file at the path audio-sounds/zoro.mp3, sets its volume to 0.1, and stores it in the zoroAudio variable
//adjust the volume of every sound by adding .volume^^^
const luffySoundPath = "audio-sounds/luffy.mp3";
const luffyAudio = new Audio(luffySoundPath);
//  creats a new path for the audio luffy

//Goku
const gokuSoundPath = "audio-sounds/goku.mp3";
const gokuAudio = new Audio(gokuSoundPath);

// gon
const gonSoundPath = "audio-sounds/gon.mp3";
const gonAudio = new Audio(gonSoundPath);

//kilua
const kiluaSoundPath = "audio-sounds/kilua.mp3";
const kiluaAudio = new Audio(kiluaSoundPath);

//vegeta
const vegetaSoundPath = "audio-sounds/vegeta.mp3";
const vegetaAudio = new Audio(vegetaSoundPath);

/*-------------add event listener to each card to play the sound -----------------------*/
const gokuCard1 = document.getElementById("goku1");
const gokuCard2 = document.getElementById("goku2");
const gonCard1 = document.getElementById("gon1");
const gonCard2 = document.getElementById("gon2");
const kiluaCard1 = document.getElementById("kilua1");
const kiluaCard2 = document.getElementById("kilua2");
const luffyCard1 = document.getElementById("luffy1");
const luffyCard2 = document.getElementById("luffy12");
const vegetaCard1 = document.getElementById("vegeta1");
const vegetaCard2 = document.getElementById("vegeta2");
const zoroCard1 = document.getElementById("zoro1");
const zoroCard2 = document.getElementById("zoro2");

//when  card is clicked it plays the right audio
function playCardsSound(event) {
  const clickedCard = event.target;
  console.log('Clicked card:', clickedCard.id);

  // Check which card was clicked by comparing IDs
  if (clickedCard.id === 'goku1' || clickedCard.id === 'goku2') {
    gokuAudio.play();
  } else if (clickedCard.id === 'gon1' || clickedCard.id === 'gon2') {
    gonAudio.play();
  } else if (clickedCard.id === 'kilua1' || clickedCard.id === 'kilua2') {
    kiluaAudio.play();
  } else if (clickedCard.id === 'luffy1' || clickedCard.id === 'luffy2') {
    luffyAudio.play();
  } else if (clickedCard.id === 'vegeta1' || clickedCard.id === 'vegeta2') {
    vegetaAudio.play();
  } else if (clickedCard.id === 'zoro1' || clickedCard.id === 'zoro2') {
    zoroAudio.play();
  }
}

cards.forEach(card => card.addEventListener('click', playCardsSound));

/*  -------------------  */

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let gameStarted = false;
//we lock the board after 2 cards are being check for matche so we cant turn more cards while they are being checkMatch

// cards.addEventListener('click', function(){
//   audio.play();
//   console.log("Just clicked the button!");
// });

//flip card function that checks which card is being fliped first or secodn, and plays the assigned aout depending on whic card is being clicked

const startButton = document.getElementById("start-button");

const initialScreen = document.querySelector(".initial-screen");

//adds an event listener to the "Match them" button and hiddes the initial screen
startButton.addEventListener("click", () => {
  initialScreen.classList.add("hidden");
  gameStarted = true;
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  
  this.classList.add("flip");

  if (!hasFlippedCard) {
    // First card clicked
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second card clicked
  hasFlippedCard = false;
  secondCard = this;

  // Play audio based on the second card clicked
  if (secondCard.id === 'goku1' || secondCard.id === 'goku2') {
    gokuAudio.play();
  } else if (secondCard.id === 'gon1' || secondCard.id === 'gon2') {
    gonAudio.play();
  } else if (secondCard.id === 'kilua1' || secondCard.id === 'kilua2') {
    kiluaAudio.play();
  } else if (secondCard.id === 'luffy1' || secondCard.id === 'luffy2') {
    luffyAudio.play();
  } else if (secondCard.id === 'vegeta1' || secondCard.id === 'vegeta2') {
    vegetaAudio.play();
  } else if (secondCard.id === 'zoro1' || secondCard.id === 'zoro2') {
    zoroAudio.play();
  }

  // Check for match after second card is clicked
  checkForMatch();
}


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  //ternary operator //lets you write the if statment in less lines
  //isMatch is condition ? true : false
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  //its a match!!
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  //if its a match it stops the card to be clicked again^^^

  //resetBoard after two cards have been clicked it puts it back to initial stat of the lockboard and hasFlipped
  resetBoard();
  // Check if all cards are matched
  const matchedCards = document.querySelectorAll(".flip");
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      //given a set timer to wait a 1.5 seconds before it plays
      // All cards are matched, play the audio
      const allMatchedAudio = new Audio("audio-sounds/victory.mp3");
      allMatchedAudio.volume = 0.1;
      allMatchedAudio.play();
    }, 1500);
  }
}

//gives time to check if the cards match
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
  //if cards dont match it will unflip them after 1.5s
} //stat of the board after evey secondCard has been clicked
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
//randomizing the position of each card for every new game
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12); //Math.random give  a number between 0 and 1 and then multiplys it wiht 12 // then math.floor will round up the number to the nearest integer
    card.style.order = randomPos;
  });
})();

//button that restarts the game from the begining
document.getElementById("reset-game").addEventListener("click", function () {
  window.location.reload();
  return false;
});

//calls the function that flips name
cards.forEach((card) => card.addEventListener("click", flipCard));
