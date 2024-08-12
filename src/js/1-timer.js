import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const onStartBtnClick = timerInit;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.show(error);
      startBtn.setAttribute('disabled', '');
    } else {
      startBtn.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', onStartBtnClick);

function timerInit() {
  startBtn.setAttribute('disabled', '');
  dateTimePicker.setAttribute('disabled', '');

  const intervalId = setInterval(() => {
    const deltaTime = userSelectedDate - Date.now();

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      dateTimePicker.removeAttribute('disabled');
      return;
    }

    const dateConvert = convertMs(deltaTime);

    days.textContent = addLeadingZero(dateConvert.days);
    hours.textContent = addLeadingZero(dateConvert.hours);
    minutes.textContent = addLeadingZero(dateConvert.minutes);
    seconds.textContent = addLeadingZero(dateConvert.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const error = {
  title: 'Error',
  message: 'Please choose a date in the future',
  backgroundColor: 'red',
  position: 'topRight',
  theme: 'dark',
};
