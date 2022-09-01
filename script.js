const questionBtn = document.querySelector("#question");
const closeBtn = document.querySelector("#close");
const mainPart = document.querySelector(".main");
const howToPlay = document.querySelector(".how-to-play");

questionBtn.addEventListener("click", () => {
  mainPart.style.display = "none";
  closeBtn.style.display = "block";
  howToPlay.style.display = "block";
  //   questionBtn.style.display = "none";
});
closeBtn.addEventListener("click", () => {
  location.reload();
});
