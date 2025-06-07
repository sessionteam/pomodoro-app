const startPauseBtn = document.getElementById("start-pause");
const resetBtn = document.getElementById("reset");
const timeDisplay = document.getElementById("time");
const progressCircle = document.getElementById("progress");
const beep = document.getElementById("beep");

let duration = 25 * 60; // 25 minutes
let remainingTime = duration;
let timer;
let running = false;

const circumference = 2 * Math.PI * 90;
progressCircle.style.strokeDasharray = circumference;

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const offset = circumference - (remainingTime / duration) * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

function startPauseTimer() {
  if (!running) {
    timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
      } else {
        clearInterval(timer);
        beep.play();
        running = false;
        startPauseBtn.textContent = "Start";
      }
    }, 1000);
    running = true;
    startPauseBtn.textContent = "Pause";
  } else {
    clearInterval(timer);
    running = false;
    startPauseBtn.textContent = "Start";
  }
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  remainingTime = duration;
  updateDisplay();
  startPauseBtn.textContent = "Start";
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
