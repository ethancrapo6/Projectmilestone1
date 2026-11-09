
/* Web Servers Quiz - Countdown Timer */

// Set the quiz time limit to 10 minutes
let timeRemaining = 600;
let elapsedTime = 0;

// Update the countdown every second
const timer = setInterval(function () {
    timeRemaining--;
    elapsedTime++;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    document.getElementById("timer").textContent =
        `Time Remaining: ${minutes}:${String(seconds).padStart(2, "0")}`;

    // Automatically submit when time runs out
    if (timeRemaining <= 0) {
        clearInterval(timer);
        document.getElementById("quiz-form").requestSubmit();
    }
}, 1000);

