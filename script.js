const input = document.getElementById("val");
const btn = document.querySelector(".button");
const msg = document.querySelector('.card h2');
const rg = document.querySelector(".reaming");
const startOver = document.getElementById('result')
const p = document.createElement('p');
let randomWord = "";
let guessCh = "";
let numofguesses = 1;
let playGame = true;
const words = ["apple", "grape", "smile", "bread", "flame", "shine", "charm", "plant"];

function generateWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex];
    console.log(randomWord);
}

generateWord();

if (playGame) {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const guess = String(input.value);
        validCheck(guess);
    });
}

function validCheck(guess) {
    if (guess === "") {
        alert('Please enter a word of 5 characters');
    } else if (guess.length !== 5) {
        alert('Please enter a 5 character word');
    } else if (numofguesses === 5) {
        displayMessage(`Game over! The random word was ${randomWord}`);
        
        endgame();
    } else {
        remainingGuesses(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess) {
    if (guess === randomWord) {
        displayMessage("You guessed it right!");
     
        endgame();
    } else {
        for (let i = 0; i < 5; i++) {
            if (guess[i] === randomWord[i]) {
                guessCh += guess[i];
            } else {
                guessCh += '_';
            }
            document.querySelector(".card h2").style.display="block";
            document.querySelector(".reaming").style.display="block";
        }
        displayMessage(`Your guess so far: ${guessCh}`);
        guessCh = "";
    }
}

function remainingGuesses(guess) {
    input.value = "";
    numofguesses++;
    rg.innerHTML = `${5 - numofguesses} guesses remaining`;

}

function displayMessage(message) {
    msg.innerHTML = `${message}`;
}

function endgame() {
    input.value = "";
    input.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<p id="NewGame"><img src="images/start1.png" alt=""></p>`;
    startOver.appendChild(p);
    console.log("hey")
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector("#NewGame");
    newGameButton.addEventListener('click', function (e) {
        generateWord();
        guessCh = "";
        numofguesses = 1;
        rg.innerHTML = `${5 - numofguesses} guesses remaining`;
        input.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
