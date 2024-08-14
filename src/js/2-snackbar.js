import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formCreatePromises = document.querySelector('.form');

formCreatePromises.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const inputDelay = event.target.elements.delay.value;
  const promiseState = event.target.elements.state.value;

  createPromise(inputDelay, promiseState)
    .then(delay => {
      success.message = `Fulfilled promise in ${delay}ms`;
      iziToast.show(success);
    })
    .catch(delay => {
      error.message = `Rejected promise in ${delay}ms`;
      iziToast.show(error);
    });
}

function createPromise(delay, promiseState) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

const success = {
  title: 'OK',
  backgroundColor: '#59A10D',
  position: 'topRight',
  theme: 'dark',
};

const error = {
  title: 'Error',
  backgroundColor: '#EF4040',
  position: 'topRight',
  theme: 'dark',
};
