// Import
import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Variables
const myInput = document.querySelector("#datetime-picker");
const buttonStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer')

let selectedTime = 0;
let timerData = 0;
let intervalId = 0;

// Object 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {}
}

const fp = flatpickr(myInput, options);

// Listeners
buttonStart.addEventListener('click', onStart);
buttonStart.setAttribute("disabled", true)

Notiflix.Notify.init({
  position: 'center-top',
  borderRadius: '9px',
  backOverlay: true,
  clickToClose: true,
  cssAnimationStyle: 'from-right', 
});

//Functions
fp.config.onChange.push(function (selectedDates) {
  buttonStart.setAttribute('disabled', true);
  const currentTime = new Date().getTime();
  if (selectedDates[0] <= currentTime) {
    setTimeout(() => {
      Notiflix.Notify.failure('Please choose a date in the future');
    }, 500);
  }
  if (selectedDates[0] > currentTime) {
    buttonStart.removeAttribute('disabled', true)
  }

  selectedTime = selectedDates[0].getTime();
});

//Function for start timer
function onStart() {
  intervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    const deltaTime = selectedTime - currentTime;
    timerData = convertMs(deltaTime);

    const keys = Object.keys(timerData)
    
    for (let key of keys) {
      timer.querySelector(`[data-${key}]`).textContent = timerData[key]
    };

    if (deltaTime <= 1000) {
      clearInterval(intervalId)
    }
   
  }, 1000);
  if (onStart) {
    buttonStart.setAttribute('disabled', true);
  }
}

// Function for convert time
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

// Add leading zero in time
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};
