const container = document.querySelector('.container'),
    userResult = document.querySelector('.user-result img'),
    cpuResult = document.querySelector('.cpu-result img'),
    options = document.querySelectorAll('.option-image'),
    score = document.getElementById('score-board'),
    result = document.getElementById('result'),
    option_field = document.querySelector(".option-field"),
    gameOverOverlay = document.getElementById('game-over-overlay'),
    gameOverMessage = document.getElementById('game-over-message'),
    restartButton = document.getElementById('restart-button'),
    userResultContainer = document.querySelector('.user-result'),
    cpuResultContainer = document.querySelector('.cpu-result');

let userScore = 0,
    cpuScore = 0,
    userWins = 0,
    userLosses = 0;

const choice = ["user", "cpu"];

options.forEach((image, index) => {
    image.addEventListener("click", (e) => {

        image.classList.add("active");
        options.forEach((image2, index2) => {
            index !== index2 && image2.classList.remove("active");
        });

        userResult.src = "img/rock.png";
        cpuResult.src = "img/rock.png";
        userResult.classList.add("shake-animation");
        cpuResult.classList.add("shake-animation");
        option_field.classList.add("disable-options");

        let randomNum;
        setTimeout(() => {
            let selectedImg = e.target.src;
            if (e.target.tagName == "IMG") {
                userResult.src = selectedImg;
            } else {
                userResult.src = image.children[0].src;
            }

            randomNum = Math.floor(Math.random() * 3);
            const cpuImg = ["img/rock.png", "img/paper.png", "img/scissors.png"];
            cpuResult.src = cpuImg[randomNum];

            userResult.classList.remove("shake-animation");
            cpuResult.classList.remove("shake-animation");
            option_field.classList.remove("disable-options")

            const cpuValue = ['R', 'P', 'S'][randomNum];
            const userValue = ['R', 'P', 'S'][index];

            if (userValue == cpuValue){
                score.innerHTML = `Score: ${userScore} - ${cpuScore} (Tied)`;
            }
            else if (userValue == 'R' && cpuValue == 'S' || userValue == 'P' && cpuValue == 'R' || userValue == 'S' && cpuValue == 'P'){
                score.innerHTML = `Score: ${userScore += 1} - ${cpuScore}`;
                const user_color = document.getElementById(`user-${userScore}`);
                user_color.setAttribute("style", "background-color: var(--highlight-color)");
            }
            else if (userValue == 'S' && cpuValue == 'R' || userValue == 'R' && cpuValue == 'P' || userValue == 'P' && cpuValue == 'S'){
                score.innerHTML = `Score: ${userScore} - ${cpuScore += 1}`;
                const cpu_color = document.getElementById(`cpu-${cpuScore}`);
                cpu_color.setAttribute("style", "background-color: var(--highlight-color)");
            }

            if (userScore == 3){
                result.innerHTML = `Matches Won: ${userWins += 1} - ${userLosses}`;
                gameOver("Congratulations! You won!");
                option_field.classList.add("disable-options");
            }

            else if (cpuScore == 3) {
                result.innerHTML = `Matches Won: ${userWins} - ${userLosses += 1} `;
                gameOver("Game over! You lost.");
                option_field.classList.add("disable-options");
            }


        }, 1700);
    });
});

function gameOver(message) {   
    gameOverMessage.textContent = message;
    gameOverOverlay.style.display = "flex";
    userResultContainer.style.display = "none";
    cpuResultContainer.style.display = "none";
}

restartButton.addEventListener("click", () => {
    gameOverOverlay.style.display = "none";
    userResultContainer.style.display = "flex";
    cpuResultContainer.style.display = "flex";
    restart();
});

function restart() {
    userScore = 0;
    cpuScore = 0;
    score.innerHTML = `Score: ${userScore} - ${cpuScore}`;
    option_field.classList.remove("disable-options")

    for (let j = 0; j < 2; j++){
        for (let i = 0; i < 3; i++){
            const color = document.getElementById(`${choice[j]}-${i+1}`);
            color.setAttribute("style", "background-color: var(--text-color)");
        }
    }
}
