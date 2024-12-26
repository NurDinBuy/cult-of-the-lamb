// GMAIL BLOCK

// const gmailInput = document.querySelector("#gmail_input")
// const gmailButton = document.querySelector("#gmail_button")
// const gmailResult = document.querySelector("#gmail_result")
//
// const regExp = /^[a-z]\w+@cult\.com$/
//
// gmailButton.onclick = () => {
//     console.log(gmailInput.value.match(regExp))
//     if (regExp.test(gmailInput.value)) {
//         gmailResult.innerHTML = "Valid"
//         gmailResult.style.color = "green"
//     } else {
//         gmailResult.innerHTML = "Invalid"
//         gmailResult.style.color = "red"
//     }
// }

// MOVE BLOCK

const parentBlock = document.querySelector(".parent_block");
const movingCircle = document.querySelector(".moving_circle");
const food = document.querySelector(".food");

const centerX = parentBlock.clientWidth / 2;
const centerY = parentBlock.clientHeight / 2;
const radius = centerX - 20;
let angle = 0;
const speed = 0.012;

let foodPosition = { x: 0, y: 0 };
let isFoodEaten = false;

const spawnFood = () => {
    const spawnAngle = angle + Math.PI / 2 + Math.random() * Math.PI;
    foodPosition.x = centerX + radius * Math.cos(spawnAngle) - 20;
    foodPosition.y = centerY + radius * Math.sin(spawnAngle) - 20;
    food.style.left = `${foodPosition.x}px`;
    food.style.top = `${foodPosition.y}px`;
    food.style.display = "block";
    isFoodEaten = false;
};


const updateMovingCircle = () => {
    angle += speed;
    const x = centerX + radius * Math.cos(angle) - 50;
    const y = centerY + radius * Math.sin(angle) - 50;
    movingCircle.style.left = `${x}px`;
    movingCircle.style.top = `${y}px`;

    if (!isFoodEaten &&
        Math.hypot(x + 50 - foodPosition.x - 20, y + 50 - foodPosition.y - 20) <
        20
    ) {
        isFoodEaten = true;
        food.style.display = "none";
        setTimeout(spawnFood, 200);
    }

    requestAnimationFrame(updateMovingCircle);
};

spawnFood();
updateMovingCircle();

// STOP WATCH

const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const stopButton = document.getElementById("stop");
const scoreElement = document.getElementById("score");
const cultistsContainer = document.getElementById("cultists");

let timerInterval;
let spawnInterval;
let seconds = 20;
let cultists = [];
let score = 0;
let isGameActive = false;

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
};

const updateTimer = () => {
    seconds--;
    timerElement.textContent = formatTime(seconds);
    if (seconds <= 0) {
        endGame();
    }
};

const createCultist = () => {
    const cultist = document.createElement("img");
    cultist.setAttribute("src", "../video/Lamb_Intro_31.webp");
    cultist.classList.add("cultist");
    cultist.style.top = Math.random() * 800 + "px";
    cultist.style.left = Math.random() * 640 + "px";
    cultistsContainer.appendChild(cultist);
    cultists.push(cultist);
    cultist.addEventListener("click", () => {
        cultist.remove();
        score++;
        scoreElement.textContent = `Поймано культистов: ${score}`;
    });
};

const moveCultists = () => {
    cultists.forEach((cultist) => {
        cultist.style.top = Math.random() * 270 + "px";
        cultist.style.left = Math.random() * 270 + "px";
    });
};

const startGame = () => {
    if (isGameActive) return;
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    seconds = 20;
    cultistsContainer.innerHTML = "";
    cultists = [];
    timerElement.textContent = "00:20";
    startButton.disabled = true;
    stopButton.disabled = false;
    isGameActive = true;
    timerInterval = setInterval(() => {
        updateTimer();
        moveCultists();
    }, 1000);
    spawnInterval = setInterval(createCultist, 2000);
};

const stopGame = () => {
    if (!isGameActive) return;
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    isGameActive = false;
    startButton.disabled = false;
    stopButton.disabled = true;
};

const endGame = () => {
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    alert(`Игра окончена! Вы поймали ${score} культистов.`);
    isGameActive = false;
    startButton.disabled = false;
    stopButton.disabled = true;
};

const resetGame = () => {
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    seconds = 20;
    score = 0;
    cultistsContainer.innerHTML = "";
    cultists = [];
    timerElement.textContent = "00:20";
    scoreElement.textContent = "Поймано культистов: 0";
    isGameActive = false;
    startButton.disabled = false;
    stopButton.disabled = true;
};

startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
resetButton.addEventListener("click", resetGame);




// CHARACTERS

const getCharacters = async () => {
    try {
        const response = await fetch("../data/characters.json")
        const data = await response.json()

        renderSection("main-characters", "Main Characters", data.main);
        renderSection("the_bishops", "The Bishops of the Old Faiths", data.the_bishops);
        renderSection("guardians", "Guardians", data.guardians);
        renderSection("knucklebone_players", "Knucklebone Players", data.knucklebone_players);
    }catch (error) {
        console.log(error.message)
    }
}

const renderSection = (sectionId, sectionTitle ,characters) => {
    const section = document.getElementById(sectionId)

    characters.forEach((character) => {
        console.log(character.key)
        const characterItem = document.createElement("div")
        characterItem.setAttribute("class", "character-item")
        characterItem.innerHTML = `
            <div class="character-card">
                <div class="character-photo">
                    <img src="${character.photo}" alt="${character.name}">
                    <p class="character-name">${character.name}</p>
                </div>
            </div>
        `
        section.appendChild(characterItem)
    })
}

const getCountries  = async () => {
    try {
        const response = await fetch("../data/any.json")
        const data = await response.json()
        console.log(data)
    }catch (error) {
        console.log(error.message)
    }

}

getCountries()
getCharacters()

