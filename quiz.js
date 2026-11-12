
/* Web Servers Quiz - Countdown Timer */

// Set the quiz time limit to 10 minutes
let timeRemaining = 600;
let elapsedTime = 0;

// Update the countdown every second
let timer = setInterval(function () {
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


/* Quiz Grading System */

// Correct answers for all 10 questions
const correctAnswers = {
    q1: ["b"],
    q2: ["c"],
    q3: ["c"],
    q4: ["b"],
    q5: ["caching"],
    q6: ["reverse"],
    q7: ["cdn"],
    q8: ["a","b","c"],
    q9: ["a","b","c"],
    q10: ["a","b","c"]
};

// Listen for quiz submission
document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Stop the countdown
    clearInterval(timer);

    let score = 0;
    let feedback = "";

    // Check each question
    for (let i = 1; i <= 10; i++) {
        const question = "q" + i;
        const correct = correctAnswers[question];

        let selected = [];

        if (i >= 5 && i <= 7) {
            const answer = document.querySelector(`[name="${question}"]`).value;
            selected = [answer.trim().toLowerCase()];
        } else {
            selected = Array.from(
                document.querySelectorAll(`[name="${question}"]:checked`)
            ).map(input => input.value);
        }

        const isCorrect =
            selected.length === correct.length &&
            selected.every(answer => correct.includes(answer));

        if (isCorrect) {
            score++;
        }

        feedback += `
    <p class="${isCorrect ? "correct-answer" : "incorrect-answer"}">
        Question ${i}: ${isCorrect ? "Correct" : "Incorrect"}
        (Score: ${isCorrect ? 1 : 0}/1)<br>
        Correct Answer: ${correct.join(", ").toUpperCase()}
    </p>
`;
    }

    // Display final results
    const passed = score >= 7;

    document.getElementById("quiz-results").innerHTML = `
        <h2>${passed ? "Passed!" : "Failed"}</h2>
        <h3>Final Score: ${score}/10 (${score * 10}%)</h3>
        <p>Time Taken: ${Math.floor(elapsedTime / 60)} minutes
        and ${elapsedTime % 60} seconds</p>
        <h3>Question Results</h3>
        ${feedback}
    `;

    // Prevent additional submissions
    document.getElementById("submit-quiz").disabled = true;
    document.getElementById("retake-quiz").hidden = false;
});


// Retake Quiz Functionality
document.getElementById("retake-quiz").addEventListener("click", function () {
    // Reset all answers
    document.getElementById("quiz-form").reset();

    // Clear previous results
    document.getElementById("quiz-results").innerHTML = "";

    // Enable the submit button again
    document.getElementById("submit-quiz").disabled = false;

    // Hide the retake button
    document.getElementById("retake-quiz").hidden = true;

    // Reset the timer
    timeRemaining = 600;
    elapsedTime = 0;

    document.getElementById("timer").textContent =
        "Time Remaining: 10:00";
});

clearInterval(timer);

timer = setInterval(function () {
    timeRemaining--;
    elapsedTime++;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    document.getElementById("timer").textContent =
        `Time Remaining: ${minutes}:${String(seconds).padStart(2, "0")}`;

    if (timeRemaining <= 0) {
        clearInterval(timer);
        document.getElementById("quiz-form").requestSubmit();
    }
}, 1000);