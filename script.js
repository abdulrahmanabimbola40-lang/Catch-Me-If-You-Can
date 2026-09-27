const arena = document.getElementById("arena");
const target = document.getElementById("target");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const result = document.getElementById("result");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const finalScore = document.getElementById("finalScore");
const message = document.getElementById("message");

let score = 0;
let time = 20;
let playing = false;
let timer;

function randomPosition() {
  const padding = 20;
  const topSpace = 95;

  const maxX = arena.clientWidth - target.offsetWidth - padding;
  const maxY = arena.clientHeight - target.offsetHeight - padding;

  const x = padding + Math.random() * Math.max(1, maxX - padding);
  const y = topSpace + Math.random() * Math.max(1, maxY - topSpace);

  target.style.left = x + "px";
  target.style.top = y + "px";
}

function moveAway() {
  if (!playing) return;

  randomPosition();

  const messages = [
    "NOPE! 😈",
    "TOO SLOW!",
    "NICE TRY 😂",
    "MISSED ME!",
    "ALMOST!",
    "HAHA! 👀"
  ];

  target.textContent =
    messages[Math.floor(Math.random() * messages.length)];
}

function startGame() {
  score = 0;
  time = 20;
  playing = true;

  scoreEl.textContent = "0";
  timeEl.textContent = "20.0";
  start.style.display = "none";
  result.style.display = "none";
  target.style.display = "block";
  message.textContent = "GO! GO! GO! 🏃";

  randomPosition();

  clearInterval(timer);

  timer = setInterval(() => {
    time -= 0.1;
    timeEl.textContent = Math.max(0, time).toFixed(1);

    if (time <= 0) {
      endGame();
    }
  }, 100);
}

function endGame() {
  playing = false;
  clearInterval(timer);

  target.style.display = "none";
  finalScore.textContent = score;
  result.style.display = "grid";
  message.textContent = "Game over!";
}

target.addEventListener("mouseenter", () => {
  if (playing && Math.random() < 0.85) {
    moveAway();
  }
});

target.addEventListener("click", (event) => {
  if (!playing) return;

  event.preventDefault();

  score++;
  scoreEl.textContent = score;

  // The button immediately escapes after being clicked.
  moveAway();
});

arena.addEventListener("mousemove", (event) => {
  if (!playing) return;

  const r = target.getBoundingClientRect();
  const centerX = r.left + r.width / 2;
  const centerY = r.top + r.height / 2;
  const distance = Math.hypot(
    event.clientX - centerX,
    event.clientY - centerY
  );

  if (distance < 80 && Math.random() < 0.15 + score * 0.012) {
    moveAway();
  }
});

start.addEventListener("click", startGame);
restart.addEventListener("click", startGame);

window.addEventListener("resize", () => {
  if (playing) {
    randomPosition();
  }
});
