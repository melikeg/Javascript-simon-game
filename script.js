const questionBtn = document.querySelector("#question");
const closeBtn = document.querySelector("#close");
const startBtn = document.querySelector(".startBtn");
const mainPart = document.querySelector(".main");
const howToPlay = document.querySelector(".how-to-play");
const btnCont = document.querySelector(".btn-container");
const scoresCont = document.querySelector(".scores-container");
const levelSpan = document.querySelector(".level");
const highestSpan = document.querySelector(".highest");

var sound1 = new Audio("./audio/simonSound1.mp3");
var sound2 = new Audio("./audio/simonSound2.mp3");
var sound3 = new Audio("./audio/simonSound3.mp3");
var sound4 = new Audio("./audio/simonSound4.mp3");

let selectedBtnSound = 0;
let playerChoices = [];
let newPlayerChoice = [];
let computerChoices = [];
let nextChoice = [];
let level = 0;
let index = 0;
let play = false;

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  scoresCont.style.visibility = "visible";
  play = true;
  btnCont.classList.add("unclick");
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
  console.log(randomNumber);

  return randomNumber;
}

function playLevel(nextChoice) {
  for (let i = 0; i < nextChoice.length; i++) {
    setTimeout(() => {
      activeButton(nextChoice[i]);
    }, (i + 1) * 1000);
  }
  btnCont.classList.remove("unclick");
}
function playerMovements(e) {
  let id = Number(e.target.dataset.id);
  // let id = e.target.dataset.id;

  compare(id, index);
  index += 1;
  newPlayerChoice.push(id);
  playerChoices = [...newPlayerChoice];
  playSound(id);

  if (newPlayerChoice.length == nextChoice.length && play === true) {
    newPlayerChoice = [];

    if (level < 1) {
      nextStep();
      level += 1;
    } else if (level === 1) {
      play = false;
      resetGame("You passed all levels");
      console.log("You passed all levels");
    }
    index = 0;
  }

  levelSpan.innerHTML = level;
}
function compare(id, index) {
  if (id == nextChoice[index]) {
    console.log("Keep going");
  }

  if (id != nextChoice[index]) {
    console.log("id", id);
    console.log("nextChoice[i]", nextChoice[index]);
    console.log("Oops! Game over, you pressed the wrong tile");
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
function resetGame(text) {
  playerChoices = [];
  newPlayerChoice = [];
  computerChoices = [];
  nextChoice = [];
  level = 0;
  play = false;
  startBtn.style.display = "block";
  scoresCont.style.visibility = "hidden";
  console.log(text);
  // tileContainer.classList.add("unclickable");
}
questionBtn.addEventListener("click", () => {
  mainPart.style.display = "none";
  closeBtn.style.display = "block";
  howToPlay.style.display = "block";
  //   questionBtn.style.display = "none";
});
closeBtn.addEventListener("click", () => {
  location.reload();
});
