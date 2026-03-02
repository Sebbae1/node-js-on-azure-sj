/*
    Author: Sebastian Jaculbe - dcode
    Created: February 15th, 2026
    Updated: March 1st, 2026
*/

function createDice(number) {
    const dotPositionMatrix = {
        1: [
            [50, 50] /* [left, top] */
        ],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ],
        4: [
            [20, 20],
            [20, 80],
            [80, 20],
            [80, 80]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 20],
            [80, 80],
        ],
        6: [
            [20, 20],
            [20, 80],
            [50, 20],
            [50, 80],
            [80, 20],
            [80, 80]
        ]
    }

    const dice = document.createElement("div");
    dice.classList.add("dice");

    for (const dotPosition of dotPositionMatrix[number]) {
        const dot = document.createElement("div")
        dot.classList.add("dice-dot");
        dot.style.setProperty("--top", dotPosition[0] + "%");
        dot.style.setProperty("--left", dotPosition[1] + "%");
        dice.appendChild(dot);
    }
    return dice
}

async function randomizeDice(diceContainer, numberOfDice) {
    diceContainer.innerHTML = "";

    const response = await fetch(
        "https://node-js-on-azure-sj-fycdfzc2e0btbpfw.canadacentral-01.azurewebsites.net/" + numberOfDice
    );
    const data = await response.json();

    for (const value of data.rolls) {
        const dice = createDice(value);
        diceContainer.appendChild(dice);
    }
}

const NUMBER_OF_DICE = 5
const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");
const enterKey = document.querySelector(".btn-roll-dice");

// Wake up the server on load
fetch("https://node-js-on-azure-sj-fycdfzc2e0btbpfw.canadacentral-01.azurewebsites.net/");

randomizeDice(diceContainer, NUMBER_OF_DICE);

btnRollDice.addEventListener("click", () => {
    const interval = setInterval(() => { 
        randomizeDice(diceContainer, NUMBER_OF_DICE);
    }, 50);
    setTimeout(() => clearInterval(interval), 1000);
});

enterKey.addEventListener("click", () => {
    document.querySelector("btn-roll-dice").focus();
})