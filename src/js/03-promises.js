// Import
import Notiflix from 'notiflix';

// Variables
const form = document.querySelector('.form')

// Object 
let formValues = {
  delay: 0,
  step: 0,
  amount: 0,
};

// Listeners
form.elements.delay.addEventListener('input', handleFormUpdate)
form.elements.step.addEventListener('input', handleFormUpdate)
form.elements.amount.addEventListener('input', handleFormUpdate)
form.addEventListener('submit', handlePromises);

//Functions
function handleFormUpdate(e) {
  const { name, value } = e.target;
  formValues[name] = value;
}

function handlePromises(e) {
  e.preventDefault();

  const { delay, step, amount } = formValues;

  setTimeout(() => {
    let delayCounter = Number(delay);

    for (let i = 1; i <= amount; i += 1) {
      setTimeout(() => {
        createPromise(i, delayCounter)
          .then(({ position, delay }) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
          .catch(({ position, delay }) => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
        
        delayCounter += Number(step)
      }, step * i);
    }
  }, delay);
  
  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    
    return new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay })
      }
    })
  }
}