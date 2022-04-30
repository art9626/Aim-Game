(() => {
  const startBtn = document.querySelector('.start');
  const screens = document.querySelectorAll('.screen');
  const timeList = document.querySelector('.time-list');
  const timeEl = document.getElementById('time');
  const board = document.getElementById('board');
  const colors = ['#FFDF0F', '#ef5795', '#0887d8', '#ed6210', '#FFFFFF', '#46AEF7'];

  let time = 0;
  let timerId;
  let score = 0;

  startBtn.addEventListener('click', e => {
    e.preventDefault();
    screens[0].classList.add('up');
  });

  timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
      time = +e.target.dataset.time;

      screens[1].classList.add('up');

      startGame()
    }
  });

  board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
      score++;
      e.target.remove();

      board.append(createRandomCircle());
    }
  })

  function startGame() {
    timerId = setInterval(decreaseTime, 1000);
    setTime(time, timeEl);

    board.append(createRandomCircle())
  }

  function decreaseTime() {
    if (time === 0) {
      clearInterval(timerId);
      finishGame()
      return;
    }
    setTime(--time, timeEl)
  }

  function setTime(value, container) {
    if (value < 10) {
      container.textContent = `00:0${time}`
    } else {
      container.textContent = `00:${time}`;
    }
  }

  function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
  }

  function createRandomCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const {width, height} = board.getBoundingClientRect();

    const size = getRandomNumber(10, 60);
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `${colors[getRandomNumber(0, colors.length - 1)]}`

    return circle;
  }

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
})()