let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchTime = 0;

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateClock() {
  const clockDisplay = document.getElementById('clock-display');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function updateStopwatch() {
  const stopwatchDisplay = document.getElementById('stopwatch-display');
  stopwatchDisplay.textContent = formatTime(stopwatchTime);
}

function startStop() {
  const startStopButton = document.getElementById('start-stop');
  
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatch();
    }, 1000);
    startStopButton.textContent = 'Stop';
  } else {
    clearInterval(stopwatchInterval);
    startStopButton.textContent = 'Start';
  }

  stopwatchRunning = !stopwatchRunning;
}

function resetStopwatch() {
  const startStopButton = document.getElementById('start-stop');
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatch();
  startStopButton.textContent = 'Start';
  stopwatchRunning = false;
}

// Update clock every second
setInterval(updateClock, 1000);
