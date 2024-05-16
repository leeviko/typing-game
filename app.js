import { words } from './utils.js';

const gameElement = document.querySelector('.game');

const wordSpeed = 1; // px per frame
const run = true;

function createTextElement() {
  const textElement = document.createElement('span');
  textElement.classList.add('word');

  textElement.style.left =
    Math.max(80, Math.random() * gameElement.getBoundingClientRect().width) +
    'px';
  textElement.innerText = words[Math.floor(Math.random() * words.length)];

  gameElement.appendChild(textElement);

  animateTextElement(textElement);
}
function animateTextElement(element) {
  let y = -25;

  function step() {
    y += wordSpeed;
    element.style.top = y + 'px';

    if (element.offsetTop < gameElement.offsetHeight) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const interval = setInterval(createWordElement, 1000);
