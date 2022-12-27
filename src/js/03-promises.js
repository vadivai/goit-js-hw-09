// 1. подключаем библиотеки через import 
import Notiflix from 'notiflix';

// 2. доступ к элементам формы в DOM 
const form = document.querySelector('.form');

// 3. вешаем запуск генератора промисов по нажатию кнопки
form.addEventListener('submit', onPromiseGenerate);

// функция createPromise - создание 1 промиса
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

 // генерируем промисы согласно введенных данных
function onPromiseGenerate(event) {
  event.preventDefault();
  const formElement = event.currentTarget.elements;
  const delayFirst = formElement.delay.value;
  const step = formElement.step.value;
  const amount = formElement.amount.value;

//нумерация промисов можно от 1?
// Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
// Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
  
  for (let i = 1; i<= amount; i += 1) {
    const delay = +delayFirst + +step * (i-1);
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    }    
}
