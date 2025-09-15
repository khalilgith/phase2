// 4. RANDOMLY ASSIGN CARD SYMBOLS
const cardSymbols = [
    '🎯', '🎨', '🎭', '🎪', '🚀', '⭐', '🌟', '🎈',
    '🎯', '🎨', '🎭', '🎪', '🚀', '⭐', '🌟', '🎈'
];

// Shuffle function to randomly assign symbols
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Game state variables
let flippedCards = [];
let matchedCards = [];
let canFlip = true;

// Create the game board with cards
function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const shuffledSymbols = shuffleArray(cardSymbols);

    gameBoard.innerHTML = '';

    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = shuffledSymbols[i];
        card.dataset.index = i;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front"></div>
                <div class="card-face card-back">${shuffledSymbols[i]}</div>
            </div>
        `;

        // Add click event for card flipping and matching
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    }
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.symbol === card2.dataset.symbol;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        
        if (matchedCards.length === 16) {
            setTimeout(() => {
                alert('Congratulations! You won!');
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    setTimeout(() => {
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

// Demo functions (updated for Phase 2)
function flipRandomCard() {
    const unflippedCards = document.querySelectorAll('.card:not(.flipped):not(.matched)');
    if (unflippedCards.length > 0 && canFlip) {
        const randomIndex = Math.floor(Math.random() * unflippedCards.length);
        flipCard(unflippedCards[randomIndex]);
    }
}

function flipAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (!matchedCards.includes(card)) {
            card.classList.add('flipped');
        }
    });
}

function resetCards() {
    // Reset all game state
    flippedCards = [];
    matchedCards = [];
    canFlip = true;
    
    // Remove all classes from cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
}

// New function to restart the entire game
function restartGame() {
    createGameBoard();
}

// Initialize the game board when page loads
document.addEventListener('DOMContentLoaded', function() {
    createGameBoard();
});