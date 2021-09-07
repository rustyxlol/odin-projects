const userSelection = document.querySelectorAll(".userSelect");
const userBoard = document.querySelector(".userChoice");
const botBoard = document.querySelector(".pcChoice");
const roundBoard = document.querySelector(".roundNumber");
const pcSc = document.querySelector(".playerScore");
const botSc = document.querySelector(".botScore");
const popup = document.querySelector(".popup");
const restartButton = document.querySelector(".restartButton");
const whoWon = document.querySelector(".whoWon");
const comments = document.querySelector(".comments");

let wonRound = [
    "Winning isn’t everything, it’s the only thing",
    "When you win, say nothing. When you lose, say less",
    "You cannot expect victory and plan for defeat",
    "Victory is always possible for the person who refuses to stop fighting",
    "Victory is sweetest when you've known defeat",
];

let lostRound = [
    "If you're confused about what to do, it's a sign that your enemy is winning",
    "If you can accept losing, you can't win",
    "There are many victories worse than a defeat",
    "Defeat isn't bitter if you don't swallow it",
    "Never confuse a single defeat with a final defeat",
    "Victory is sweetest when you've known defeat",
];
let roundNumber = 1;
let playerScore = 0;
let botScore = 0;
let userChoice;
let botChoice;
// ROCK <- paper <- scissors <- rock

let combinations = ["ROCK", "PAPER", "SCISSORS"];

function update() {
    if (roundNumber == 0) {
        userBoard.textContent = '';
        botBoard.textContent = '';
        userBoard.style.backgroundColor='';
        botBoard.style.backgroundColor='';
    }
    else {
        userBoard.textContent = combinations[userChoice];
        botBoard.textContent = combinations[botChoice];
    }
    pcSc.textContent = playerScore;
    botSc.textContent = botScore;
    roundBoard.textContent = ++roundNumber;
    checkGameOver();
}

function randomNumberGenerator() {
    let rng = Math.floor(Math.random() * 3);
    return rng;
}

function checkGameOver() {
    if (playerScore == 5 || botScore == 5) {
        popup.style.display = "unset";
        if (playerScore > botScore) {
            whoWon.textContent = "You won!";
        } else {
            whoWon.textContent = "Bot won!";
        }
    }
}

function checkChoices() {
    botChoice = randomNumberGenerator();
    if ((userChoice + 1) % 3 == botChoice) {
        botScore = botScore + 1;
        botBoard.style.backgroundColor = "rgba(9, 78, 9, 0.548)";
        userBoard.style.backgroundColor = "rgba(78, 15, 9, 0.548)";
        comments.textContent =
            lostRound[Math.floor(Math.random() * lostRound.length)];
    } else if ((userChoice + 2) % 3 == botChoice) {
        playerScore = playerScore + 1;
        userBoard.style.backgroundColor = "rgba(9, 78, 9, 0.548)";
        botBoard.style.backgroundColor = "rgba(78, 15, 9, 0.548)";
        comments.textContent =
            wonRound[Math.floor(Math.random() * wonRound.length)];
    } else {
        userBoard.style.backgroundColor = "rgba(93,93, 53, 1)";
        botBoard.style.backgroundColor = "rgba(93,93,53,1)";
        comments.textContent = `It's a tie!`;
    }
    update();
}

userSelection.forEach(function (selection) {
    selection.addEventListener("click", function (e) {
        if (selection.id == "rock") {
            userChoice = 0;
        } else if (selection.id == "paper") {
            userChoice = 1;
        } else {
            userChoice = 2;
        }
        checkChoices();
    });
});

restartButton.addEventListener("click", function () {
    roundNumber = 0;
    playerScore = 0;
    botScore = 0;
    popup.style.display = "none";
    comments.textContent = "";
    update();
});
