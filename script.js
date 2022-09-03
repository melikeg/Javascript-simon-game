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
let level = 1;

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  scoresCont.style.visibility = "visible";
  nextStep();
});
btnCont.addEventListener("click", (e) => playerMovements(e));

function nextStep() {
  computerChoices += nextChoice;
  nextChoice.push(randomCreater());
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
  console.log("çalıştı");
}
function playerMovements(e) {
  playerChoices += newPlayerChoice;
  let id = Number(e.target.dataset.id);
  newPlayerChoice.push(id);
  playSound(id);

  console.log(newPlayerChoice);
  console.log("nextChoice", nextChoice);

  nextChoice.forEach((i) => {
    if (newPlayerChoice[i] === nextChoice[i]) {
      if (newPlayerChoice.length === nextChoice.length) {
        level += 1;
        newPlayerChoice = [];
        nextStep();
      }
      console.log("true");
    } else {
      console.log("false");
      return;
    }
  });
}

function activeButton(id) {
  const selectedBtnId = document.querySelector(`[data-id='${id}']`);
  console.log("selectedBtnId:", selectedBtnId);
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

questionBtn.addEventListener("click", () => {
  mainPart.style.display = "none";
  closeBtn.style.display = "block";
  howToPlay.style.display = "block";
  //   questionBtn.style.display = "none";
});
closeBtn.addEventListener("click", () => {
  location.reload();
});
