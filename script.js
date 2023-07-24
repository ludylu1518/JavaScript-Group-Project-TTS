// array of div or game cards
const cards = document.querySelectorAll('.gameCard');

// reset button 
const reset = document.querySelector('.reset');

// number of moves . span
const scoreBoard = document.querySelector('.score');

// keep track of number of moves
let score = 0;

// keep track only two cards flipped at a time
let numFlipped = 0;

// storing the cards to be check for match
let firstCard, secondCard;

// keep track of how many cards are matched 
let totalMatch = 0;

// give each card the ability to flip
cards.forEach(card => card.addEventListener('click', flipCard));

// flip card, making sure only two cards are flipped at a time
function flipCard() {

    // make sure only two cards are flipped
    if (numFlipped == 2) {
        return;
    }

    // flips the card
    this.classList.add('flip');
    
    // first card flip
    if (numFlipped == 0) {
        firstCard = this;
        numFlipped += 1;
        return;
    } 

    // in case same card clicked twice, do nothing
    if (this === firstCard) {
        return;
    }

    // second card flip
    secondCard = this;
    numFlipped += 1;

    checkMatch();
}

// when two cards don't match then unflip the cards
function unflipCard() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        numFlipped = 0;
    }, 1000)
}

// check if two cards matches
function checkMatch() {
    // increment number of moves (moves count in pairs)
    score += 1;
    scoreBoard.textContent = score;

    // if cards are same
    if (firstCard.dataset.name === secondCard.dataset.name) {

        // reset number of card flipped
        numFlipped = 0;

        // increment number of match
        totalMatch += 1;

        // make sure the matched card can't be flipped again
        lockCard();

        // check if player won after each successful match
        setTimeout(() => {
            checkWinner();
        }, 500)

        return;
    }
    
    unflipCard();
}

// make sure flipped cards can't be flipped again
function lockCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

// check if player matched every card
function checkWinner() {
    if (totalMatch == 8) {
        alert("You Won!")

        // reset total match
        totalMatch = 0;
    }
    return;
}

// shuffle the cards 
function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 16);
      card.style.order = ramdomPos;
    });
}

// reset the game board
reset.addEventListener('click', () => {
    // unflip all cards
    cards.forEach(card => card.classList.remove('flip'));

    // reset all counters (global let variables)
    numFlipped = 0;
    firstCard = null;
    secondCard = null;
    totalMatch = 0;
    score = 0;

    // return all cards the ability to flip
    cards.forEach(card => card.addEventListener('click', flipCard));

    // shuffle all cards
    shuffle();

    // reset scoreboard
    scoreBoard.textContent = score;
})