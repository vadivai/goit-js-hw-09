//план
// 1. подключаем библиотеки
// 2. вводим дату и время inputDate
// 3. проверяем, что дата inputDate в будущем, если нет - выводим сообщение
// 4. если да - запускаем таймер нажатием кнопки start
// 5. рассчитываем разница deadline и Date.now в миллисекундах
// 6. переводим в дни, часы, минуты, секунды
// 7. делаем форматирование, чтобы в днях можно было и 3 числа, а остальные числа - из двух цифр

// 1. подключаем библиотеки
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// 2. задаем переменные элементам DOM
const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timeDays = document.querySelector('[data-days]');
const timeHours = document.querySelector('[data-hours]');
const timeMinutes = document.querySelector('[data-minutes]');
const timeSeconds = document.querySelector('[data-seconds]');
console.log(timeDays);

// 3. проверяем, что дата в будущем, если нет - выводим сообщение
//параметр options функции flatpickr - настройки, проверка даты, активация кнопки, сообщение об ошибке
let differenceTime = 0;
startBtn.setAttribute('disabled', true); // кнопка start до выбора правильной даты неактивна

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]); // почему такая запись?
    console.log(selectedDates);
    // почему несколько выбранных дат?
    const nowDate = Date.now();
    const selectedDate = new Date(inputDate.value).getTime();
    differenceTime = selectedDate - nowDate;
    
    // if (differenceTime > 0) {
        // startBtn.removeAttribute('disabled');
        // } else {
        //   Notiflix.Notify.failure("Please choose a date in the future");
        //   }
      
    differenceTime > 0 ? startBtn.removeAttribute('disabled') : Notiflix.Notify.failure('Please choose a date in the future');  
    // можно так записывать? Репета говорит, что тернарник только для значений, а не вызова функций
    },
};

flatpickr(inputDate, options);

// при нажатии кнопки старт идет запись selectedData в значение inputDate, таймер запускается
startBtn.addEventListener('click', startTimer);

function startTimer() {
  const timerId = setInterval(() => {
    if (differenceTime > 1000) {
      startBtn.setAttribute('disabled', 'false'); // не дублирую ли я?
      differenceTime -= 1000;
      const userFriendlyTime = convertMs(differenceTime);
      showTime(userFriendlyTime);
    } else {
      clearInterval(timerId);  // останавливаем таймер
    }
  }, 1000);
}

// convertMs в userFriendlyTime (привычное пользователю время)
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const secondMs = 1000;
  const minuteMs = secondMs * 60;
  const hourMs = minuteMs * 60;
  const dayMs = hourMs * 24;

  const days = Math.floor(ms / dayMs);
  const hours = Math.floor((ms % dayMs) / hourMs);
  const minutes = Math.floor(((ms % dayMs) % hourMs) / minuteMs);
  const seconds = Math.floor((((ms % dayMs) % hourMs) % minuteMs) / secondMs);

  return { days, hours, minutes, seconds };
}

// записываем время сконвертированное функцией convertMs в элементы DOM
function showTime({ days, hours, minutes, seconds }) {
    timeDays.textContent = addLeadingZero(days); // можно так делать?
    timeHours.textContent = addLeadingZero(hours); 
    timeMinutes.textContent = addLeadingZero(minutes); 
    timeSeconds.textContent = addLeadingZero(seconds); 
}

// добавляем недостающие нули перед значениями разрядов времени
function addLeadingZero(number) {
    return number.toString().padStart(2, '0');
}

