'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// selecting elements modal
const rulesEl = document.querySelector('.btn--rules');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// opening the modal
rulesEl.addEventListener('click', openModal);

// closing the modal
btnCloseModal.addEventListener('click', closeModal);

// setting the score before the game starts
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // setting the scores to 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // removing classes
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');

  // adding classes
  player0El.classList.add('player--active');
  diceEl.classList.add('hidden');
};

init();
// switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // if the player 0 doesnt have a class name "player--active" the toggle will add one, and if it already has one it will remove it.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1) Generate a random dice roll
    const randomRoll = Math.floor(Math.random() * 6) + 1;

    // 2) Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomRoll}.png`;

    // 3) Check for rolled 1, switch to next player
    if (randomRoll !== 1) {
      // Add dice to current score
      currentScore += randomRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      // if active player is 0, it will switch to 1 when the roll is igual to 1
      //  and when the active player is 1 and the dice is iqual to 1, it will switch to player 0.
      // if the player 0 doesnt have a class name "player--active" the toggle will add one, and if it already has one it will remove it.
      switchPlayer();
    }
  }
});

// holding the current score.
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1) add current score to active player's score
    //   it will add the current score to the currect active player.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2) check if palyers score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // 3) finish the game

      // remove the dice message
      diceEl.classList.add('hidden');
      diceEl.src = `dice-${randomRoll}.png`;

      // changing the background once a player won
    }

    // 4) if not, switch players
    switchPlayer();
  }
});

// resetting the game
btnNew.addEventListener('click', init);

// modal
