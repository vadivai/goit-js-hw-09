
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body'); // можно так называть переменную?

let timer = null;

startBtn.addEventListener('click', () => {
    timer = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        console.log(body.style.backgroundColor);
      }, 1000);
    startBtn.setAttribute('disabled', ''); 
});
// есть ли аналогия - активный enabled? что правильно писать в параметре value у setAttribute


stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    startBtn.removeAttribute('disabled');
  });

  function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}