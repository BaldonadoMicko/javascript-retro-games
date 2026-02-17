const guessing_game = document.querySelector('.number-guessing-game'),
    correct = document.getElementById('correct'),
    high = document.getElementById('too-high'),
    low = document.getElementById('too-low'),
    message = document.getElementById('message'),
    attempts = document.getElementById('attempts'),
    confirmButton = document.getElementById('confirm'),
    history = document.getElementById('history'),
    guessContainer = document.querySelector('.guessing-game-container'),
    title = document.querySelector('.guessing-game-title'),
    numList = Array(5),
    inputList = Array(5),
    historyList = [];
    
let maxAttempts = 1;
    
history.style.display = 'none';

function restart() {
    for (let a = 0; a < inputList.length; a++){
        document.getElementById(a+1).value = "";
    }
    correct.innerHTML = "Correct: ";
    high.innerHTML = "Too High: ";
    low.innerHTML = "Too Low: ";
    attempts.innerHTML = "Attempts: 0 / 15";
    message.innerHTML = "";
    history.innerHTML = "";
    maxAttempts = 1;
    historyList.length = 0;
    generateNumber();
    confirmButtonShow();
}

function startGame() {
    generateNumber();
    confirmButton.setAttribute("onclick", "confirm()");
    confirm();
}

function restartButtonShow() {
    confirmButton.setAttribute("onclick", "restart()");
    confirmButton.setAttribute("value", "Restart");
}

function confirmButtonShow() {
    confirmButton.setAttribute("onclick", "confirm()");
    confirmButton.setAttribute("value", "Confirm");
}

function confirm() {
    for (let a = 0; a < inputList.length; a++){
        inputList[a] = Math.floor(document.getElementById(a+1).value);
        message.innerHTML = `Your Guess: ${inputList.join("")}`;
    }
    report();
}

function generateNumber() {
    for (let i = 0; i < numList.length; i++){
        const randomNum = Math.floor((Math.random() * (5 - 1 + 1)) + 1);
        numList[i] = randomNum;
    }
}

function validateGuess() {
    let wrongInput = 0;
    for (let i = 0; i < inputList.length; i++) {
        const input = document.getElementById(i+1).value;
        if (input == "") {
            message.innerHTML = "Please fill all the boxes.";
            wrongInput += 1;
        }
        else if (isNaN(input) || (input < 1)|| (input > 5)){
            message.innerHTML = "Only digits from 1-5 are allowed.";
            wrongInput += 1;
        }
    }
    return wrongInput === 0;
}

function report() {
    if (validateGuess()) {
        if (history.style.display === 'none') {
            changeDisplay();
        }

        let correctAns = 0;
        let tooHigh = 0;
        let tooLow = 0;
        for (let j = 0; j < numList.length; j++){
            if (inputList[j] == numList[j]){
                correctAns += 1;
            }
            else if (inputList[j] > numList[j]){
                tooHigh += 1;
            }
            else {
                tooLow += 1;
            }
            if (correctAns == 5) {
                message.innerHTML = `You Won! The secret code is: ${inputList.join("")}.`;
                restartButtonShow();
            }
        }
        attempts.innerHTML = `Attempt ${maxAttempts} of 15`;
        correct.innerHTML = `Correct: ${correctAns}`;
        high.innerHTML = `Too High: ${tooHigh}`;
        low.innerHTML = `Too Low: ${tooLow}`;
        
        displayHistory(maxAttempts-1, correctAns, tooHigh, tooLow);
        if (maxAttempts >= 15 && correctAns != 5) {
            message.innerHTML = `You Lose! The secret code is ${numList.join("")}.`;
            restartButtonShow();
            return;
        }
        maxAttempts += 1;
    }
}

function changeDisplay() {
    guessContainer.classList.add('slide-out');
    title.classList.add('slide-out');
    setTimeout(() => {
        title.style.display = 'none';
        history.style.display = 'block';
        history.classList.add('slide-in');
        guessContainer.classList.remove('slide-out');
    }, 500);
}

function displayHistory(i, correct, high, low) {
    historyList.push(inputList.join(""));
    if (i === 0) {
        history.innerHTML += `
            <div class="report">
                <table>
                    <tr>
                        <th>Attempt</th>
                        <th>Guess</th>
                        <th>Correct</th>
                        <th>Too high</th>
                        <th>Too low</th>
                    </tr>
                </table>
            </div>`;
    }

    const attemptReport = `
        <tr>
            <td>${i + 1}</td>
            <td>${historyList[i]}</td>
            <td>${correct}</td>
            <td>${high}</td>
            <td>${low}</td>
        </tr>`;
    history.querySelector('table').insertAdjacentHTML('beforeend', attemptReport);
}

function slideOut(url) {
    guessing_game.classList.add('slide-out');
    
    setTimeout(function() {
        window.location.href = url;
    }, 500);
  }