const questionBtn = document.querySelector("#question");
const closeBtn = document.querySelector("#close");
const startBtn = document.querySelector(".startBtn");
const replayBtn = document.querySelector(".replayBtn");
const mainPart = document.querySelector(".main");
const howToPlay = document.querySelector(".how-to-play");
const btnCont = document.querySelector(".btn-container");
const scoresCont = document.querySelector(".scores-container");
const levelSpan = document.querySelector(".level");
const highestSpan = document.querySelector(".highest");
const info = document.querySelector(".info");

const sound1 = new Audio("./audio/simonSound1.mp3");
const sound2 = new Audio("./audio/simonSound2.mp3");
const sound3 = new Audio("./audio/simonSound3.mp3");
const sound4 = new Audio("./audio/simonSound4.mp3");

let selectedBtnSound = 0;
let playerChoices = [];
let newPlayerChoice = [];
let computerChoices = [];
let nextChoice = [];
let level = 0;
let index = 0;
let play = false;

highestSpan.innerHTML = localStorage.getItem("highest")
  ? localStorage.getItem("highest")
  : 0;

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  scoresCont.style.visibility = "visible";
  play = true;
  nextStep();
});

btnCont.addEventListener("click", (e) => playerMovements(e));

function nextStep() {
  nextChoice.push(randomCreater());
  computerChoices += nextChoice;
  playLevel(nextChoice);
}

function randomCreater() {
  randomNumber = Math.floor(Math.random() * 4 + 1); //random number from 1 to 4

  return randomNumber;
}

function playLevel(nextChoice) {
  btnCont.classList.add("unclick");

  for (let i = 0; i < nextChoice.length; i++) {
    setTimeout(() => {
      activeButton(nextChoice[i]);
      i + 1 === nextChoice.length && btnCont.classList.remove("unclick");
    }, (i + 1) * 1000);
  }
}
function playerMovements(e) {
  let id = Number(e.target.dataset.id);

  compare(id, index);
  index += 1;
  newPlayerChoice.push(id);
  playerChoices = [...newPlayerChoice];
  playSound(id);

  if (newPlayerChoice.length == nextChoice.length && play === true) {
    newPlayerChoice = [];

    if (level < 19) {
      nextStep();
      level += 1;
    } else if (level === 19) {
      play = false;
      localStorage.getItem("highest") < level &&
        localStorage.setItem("highest", level);
      highestSpan.innerHTML = localStorage.getItem("highest")
        ? localStorage.getItem("highest")
        : 0;
      showInfo("You passed all levels", "replay");
    }
    index = 0;
  }

  levelSpan.innerHTML = level;
}
function compare(id, index) {
  if (id == nextChoice[index]) {
    showInfo("Keep going", "continiue");
  }

  if (id != nextChoice[index]) {
    localStorage.getItem("highest") < level &&
      localStorage.setItem("highest", level);
    highestSpan.innerHTML = localStorage.getItem("highest")
      ? localStorage.getItem("highest")
      : 0;
    showInfo("Oops! Game over, you pressed the wrong tile", "replay");
  }
}

function activeButton(id) {
  const selectedBtnId = document.querySelector(`[data-id='${id}']`);

  playSound(id);
  selectedBtnId.classList.add("active");

  setTimeout(() => {
    selectedBtnId.classList.remove("active");
  }, 800);
}

function playSound(id) {
  switch (id) {
    case 1 || "1":
      selectedBtnSound = sound1;
      break;
    case 2:
      selectedBtnSound = sound2;
      break;
    case 3:
      selectedBtnSound = sound3;
      break;
    case 4:
      selectedBtnSound = sound4;
      break;
  }
  selectedBtnSound.play();
}
function showInfo(text, status) {
  info.style.display = "block";
  info.innerHTML = text;
  if (status == "replay") {
    resetGame();
    replayBtn.style.display = "block";
  }
}
function resetGame() {
  playerChoices = [];
  newPlayerChoice = [];
  computerChoices = [];
  nextChoice = [];
  level = 0;
  play = false;
  btnCont.classList.add("unclick");
}

questionBtn.addEventListener("click", () => {
  closeBtn.style.display = "block";
  howToPlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  closeBtn.style.display = "none";
  howToPlay.classList.remove("active");
});

replayBtn.addEventListener("click", () => {
  location.reload();
});
