// Event listeners
// document.addEventListener("mousemove", handleMousemove);

// Setup
const letters = Array.from(document.querySelectorAll(".letter"));
const title = document.querySelector(".titleContainer");

const wWidth = window.innerWidth;
const wHeight = window.innerHeight;

// Assign color related to background
letters.forEach(function(letter) {
  letter.addEventListener("mouseover", handleMouseEnter);
  letter.style.color = `rgb(${randomColor.second})`;
  setInterval(function() {
    letter.style.transform = `translateY(${getRandomRange(
      -40,
      40
    )}px) rotate(${getRandomRange(-10, 10)}deg)`;
  }, getRandomRange(2000, 6000));
});

// Functions
function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function handleMouseEnter() {
  let randomColor = sketch.updateColors();

  letters.forEach(function(letter) {
    letter.style.color = `rgb(${randomColor.second})`;
  });
}
