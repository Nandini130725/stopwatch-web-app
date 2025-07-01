let startTime = 0;
let elapsedTime = 0;
let lapStartTime = 0;
let interval;
let running = false;
let lapsArray = [];

const display = document.getElementById("display");
const currentLap = document.getElementById("currentLap");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const clearLapsBtn = document.getElementById("clearLapsBtn");
const laps = document.getElementById("laps");
const lapCount = document.getElementById("lapCount");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
  currentLap.textContent = "Current Lap: " + formatTime(elapsedTime - lapStartTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  lapStartTime = Date.now() - (elapsedTime - lapStartTime);
  interval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
}

startBtn.addEventListener("click", () => {
  if (!running) {
    startTimer();
    running = true;
  }
});

pauseBtn.addEventListener("click", () => {
  if (running) {
    pauseTimer();
    running = false;
  }
});

lapBtn.addEventListener("click", () => {
  if (running) {
    const now = Date.now();
    const lapTime = now - lapStartTime;
    lapStartTime = now;
    lapsArray.push(lapTime);

    const li = document.createElement("li");
    li.textContent = `Lap ${lapsArray.length}: ${formatTime(lapTime)}`;
    laps.appendChild(li);

    lapCount.textContent = lapsArray.length;
    highlightLaps();
  }
});

resetBtn.addEventListener("click", () => {
  pauseTimer();
  elapsedTime = 0;
  lapStartTime = 0;
  updateDisplay();
  running = false;
  laps.innerHTML = "";
  lapsArray = [];
  lapCount.textContent = "0";
});

clearLapsBtn.addEventListener("click", () => {
  laps.innerHTML = "";
  lapsArray = [];
  lapCount.textContent = "0";
});

function highlightLaps() {
  if (lapsArray.length < 2) return;

  const fastest = Math.min(...lapsArray);
  const slowest = Math.max(...lapsArray);

  Array.from(laps.children).forEach((lap, i) => {
    lap.classList.remove("fastest", "slowest");
    if (lapsArray[i] === fastest) lap.classList.add("fastest");
    if (lapsArray[i] === slowest) lap.classList.add("slowest");
  });
}
