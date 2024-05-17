import { words } from './utils.js';

const gameElement = document.querySelector('.game');

const stats = document.querySelector('.stats');

const secondsEl = document.querySelector('.seconds');
const tensEl = document.querySelector('.tens');
const scoreEl = document.querySelector('.score span');
const healthEl = document.querySelector('.health span');

const startButton = document.querySelector('.start');

const inputElement = document.querySelector('#input');

let timerInterval;
let gameInterval;

const spawnSpeed = 1250; // ms
const wordSpeed = 1; // px per frame
let currWords = [];

const game = {
  run: true,
  score: 0,
  time: {
    seconds: 0,
    tens: 0,
  },
  health: 5,
};

function reset() {
  stats.style = 'display: none;';
  startButton.style = 'display: block;';

  currWords.forEach((el) => el.remove());
  currWords = [];

  clearInterval(timerInterval);
  clearInterval(gameInterval);
  game.score = 0;
  game.time = {
    seconds: 0,
    tens: 0,
  };
  game.health = 5;

  inputElement.style = 'display: none;';
  inputElement.value = '';

  game.run = false;

  secondsEl.innerHTML = '00';
  tensEl.innerHTML = '00';
}

startButton.addEventListener('click', () => {
  startGame();
  startButton.style = 'display: none;';
});

function startGame() {
  game.run = true;
  stats.style = 'display: flex;';
  inputElement.style = 'display: block;';
  clearInterval(timerInterval);
  clearInterval(gameInterval);

  inputElement.focus();

  timerInterval = setInterval(startTimer, 10);
  gameInterval = setInterval(gameLoop, spawnSpeed);
}

function gameOver() {
  reset();
}

function gameLoop() {
  scoreEl.innerText = game.score;
  healthEl.innerText = game.health;
  if (!game.run) {
    gameOver();
    return;
  }
  createTextElement();
}

function startTimer() {
  game.time.tens++;
  if (game.time.tens <= 9) {
    tensEl.innerHTML = '0' + game.time.tens;
  }

  if (game.time.tens > 9) {
    tensEl.innerHTML = game.time.tens;
  }

  if (game.time.tens > 99) {
    game.time.seconds++;
    secondsEl.innerHTML = '0' + game.time.seconds;
    game.time.tens = 0;
    tensEl.innerHTML = '0' + 0;
  }

  if (game.time.seconds > 9) {
    secondsEl.innerHTML = game.time.seconds;
  }
}

inputElement.addEventListener('input', (event) => {
  if (event.target.value === currWords[0].innerText) {
    currWords[0].remove();
    currWords.shift();
    event.target.value = '';
    game.score++;
  }
});

function createTextElement() {
  const textElement = document.createElement('span');
  textElement.classList.add('word');

  textElement.style.left =
    Math.max(80, Math.random() * gameElement.getBoundingClientRect().width) +
    'px';
  textElement.innerText = words[Math.floor(Math.random() * words.length)];

  gameElement.appendChild(textElement);

  currWords.push(textElement);

  animateTextElement(currWords[currWords.length - 1]);
}
function animateTextElement(element) {
  let y = -25;

  function step() {
    y += wordSpeed;
    element.style.top = y + 'px';

    if (element.offsetTop < gameElement.offsetHeight) {
      requestAnimationFrame(step);
    } else {
      game.health--;
      if (game.health <= 0) {
        game.run = false;
        return;
      }
      element.remove();
      currWords.splice(currWords.indexOf(element), 1);
    }
  }
  console.log(game);
  requestAnimationFrame(step);
}
