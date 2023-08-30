const popup = document.getElementById("popup");
const questionsContainer = document.getElementById("questionsContainer");
const submitButton = document.getElementById("submitAnswers");

const questions = [
    "Who misses you every day?",
    "Who needs to hug you every day?",
    "Who boasts to you every day?"
];

const correctChoices = ["A", "A", "A"]; // Correct choices for each question

const answerChoices = [
    ["A. P'Mean", "B. A stray dog", "C. No one"],
    ["A. P'Mean", "B. A stray dog", "C. No one"],
    ["A. P'Mean", "B. A stray dog", "C. No one"]
];

let currentQuestion = 0; // Track the current question index
let userChoices = new Array(questions.length).fill(null); // Initialize userChoices array with null values

function showPopup(message) {
    popup.innerHTML = `
        <p>${message}</p>
        <div class="popup-buttons">
            <button class="popup-button" onclick="handlePopupResponse('yes')">Yes</button>
            <button class="popup-button" onclick="handlePopupResponse('no')">No</button>
        </div>
    `;
    popup.style.display = "block";
}

function handlePopupResponse(response) {
    if (response === 'yes') {
        showPopup("I love Creammy so much");
    } else {
        currentQuestion = 0; // Reset question index
        userChoices.fill(null); // Reset user choices
        popup.style.display = "none"; // Hide the popup
        showQuestion(); // Show the first question again
    }
}

function checkAnswers() {
    return userChoices.every((choice, index) =>
        choice !== null && choice.toUpperCase() === correctChoices[index]
    );
}

submitButton.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        if (userChoices[currentQuestion] !== null) {
            currentQuestion++;
            showQuestion();
        } else {
            alert("Please select an answer before moving to the next question.");
        }
    } else {
        if (userChoices[currentQuestion] !== null) {
            if (checkAnswers()) {
                showPopup("Can you be my girlfriend?");
            } else {
                alert("One or more answers are incorrect. Please try again.");
            }
        } else {
            alert("Please select an answer before submitting.");
        }
    }
});

function showQuestion() {
    questionsContainer.innerHTML = ''; // Clear previous questions

    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.textContent = questions[currentQuestion];

    answerChoices[currentQuestion].forEach(choiceText => {
        const choiceLabel = document.createElement("label");
        const choiceRadio = document.createElement("input");
        choiceRadio.type = "radio";
        choiceRadio.name = "choice";
        choiceRadio.value = choiceText.charAt(0);
        choiceRadio.addEventListener("change", () => {
            userChoices[currentQuestion] = choiceText.charAt(0);
        });

        choiceLabel.appendChild(choiceRadio);
        choiceLabel.appendChild(document.createTextNode(choiceText));
        questionDiv.appendChild(choiceLabel);
    });

    questionsContainer.appendChild(questionDiv);
}

showQuestion();
