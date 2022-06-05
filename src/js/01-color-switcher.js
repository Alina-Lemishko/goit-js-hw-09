// Variables
const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  body: document.body,
}

// Listeners
refs.buttonStart.addEventListener('click', onClickStart);
refs.buttonStop.addEventListener('click', onClickStop);

let intervalId;

//Functions
function onClickStart() {
  if (onClickStart) {
    refs.buttonStart.setAttribute("disabled", true);
    refs.buttonStop.removeAttribute("disabled", true);
   intervalId = setInterval(onChanceColor, 1000);
  }
}

// Changed color function
function onChanceColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

// Function for stop change color
function onClickStop(){
  if (onClickStop) {
    clearInterval(intervalId);
    refs.buttonStart.removeAttribute("disabled", true)
    refs.buttonStop.setAttribute("disabled", true);
  }
};

// Function for getting random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

