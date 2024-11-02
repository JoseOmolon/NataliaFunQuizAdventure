const startBtn = document.getElementById('start-btn');
const topicSection = document.getElementById('topic-section');
const quizSection = document.getElementById('quiz-section');
const questionText = document.getElementById('question-text');
const optionsForm = document.getElementById('options-form');
const resultPopup = document.getElementById('result-popup');
const popupMessage = document.getElementById('popup-message');
const closePopupBtn = document.getElementById('close-popup');
const continueBtn = document.getElementById('continue-btn');
const scoreSection = document.getElementById('score-section');
const finalScore = document.getElementById('final-score');
const summaryList = document.getElementById('summary-list');
const speechBubble = document.getElementById('speech-bubble');
const speechText = document.getElementById('speech-text');
const message = "Hello I'm Natalia, my daddy made this app to help me with my studies, I hope you enjoy it too.";

let index = 0;
let currentTopic;
let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = [];
let questions = [];

const quizData = {
    solar: [
        { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], correctAnswer: "Jupiter" },
        { question: "What is the center of our Solar System?", options: ["Earth", "Moon", "Sun", "Mars"], correctAnswer: "Sun" },
        { question: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correctAnswer: "Mercury" },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], correctAnswer: "Mars" },
        { question: "What do we call the path that a planet takes around the Sun?", options: ["Orbit", "Rotation", "Revolution", "Circle"], correctAnswer: "Orbit" },
        { question: "Which planet is famous for its rings?", options: ["Mars", "Earth", "Saturn", "Neptune"], correctAnswer: "Saturn" },
        { question: "What is the name of the fifth planet from the Sun?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Jupiter" },
        { question: "Which planet is known as the Blue Planet because of its oceans?", options: ["Mars", "Earth", "Neptune", "Uranus"], correctAnswer: "Earth" },
        { question: "How many planets are in our Solar System?", options: ["7", "8", "9", "10"], correctAnswer: "8" }
    ],
    geography: [
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: "Paris" },
        { question: "Which continent is known as the 'Dark Continent'?", options: ["Asia", "Africa", "Europe", "Australia"], correctAnswer: "Africa" },
        { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correctAnswer: "Pacific Ocean" },
        { question: "Which country is known for having kangaroos?", options: ["Canada", "Brazil", "Australia", "India"], correctAnswer: "Australia" },
        { question: "What is the longest river in the world?", options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correctAnswer: "Nile River" },
        { question: "Which mountain is the highest in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Mount Kilimanjaro"], correctAnswer: "Mount Everest" },
        { question: "Which city is known as the 'Big Apple'?", options: ["Los Angeles", "Chicago", "New York City", "Miami"], correctAnswer: "New York City" },
        { question: "What is the capital of Japan?", options: ["Tokyo", "Seoul", "Beijing", "Bangkok"], correctAnswer: "Tokyo" }
    ],
    history:[ 
    {
        question: "Who was a famous Roman leader known for saying 'Veni, Vidi, Vici'?",
        options: ["Julius Caesar", "Napoleon", "Alexander the Great", "Cleopatra"],
        correctAnswer: "Julius Caesar"
      },
      {
        question: "Who was the famous French leader known for his big hat?",
        options: ["Napoleon Bonaparte", "Julius Caesar", "King Arthur", "George Washington"],
        correctAnswer: "Napoleon Bonaparte"
      },
      {
        question: "What is the name of the Greek god of thunder?",
        options: ["Zeus", "Hades", "Poseidon", "Apollo"],
        correctAnswer: "Zeus"
      },
      {
        question: "Which famous queen was known for her beauty and lived in Egypt?",
        options: ["Cleopatra", "Marie Antoinette", "Elizabeth I", "Queen Victoria"],
        correctAnswer: "Cleopatra"
      },
      {
        question: "Who is the Greek hero known for his strength and his 12 labors?",
        options: ["Hercules", "Achilles", "Odysseus", "Theseus"],
        correctAnswer: "Hercules"
      },
      {
        question: "What famous structure did the ancient Egyptians build as tombs for their pharaohs?",
        options: ["Colosseum", "Great Wall", "Pyramids", "Parthenon"],
        correctAnswer: "Pyramids"
      },
      {
        question: "Who was the famous Greek philosopher who taught about ethics and virtue?",
        options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
        correctAnswer: "Socrates"
      },
      {
        question: "What was the name of the famous battle where Napoleon was defeated in 1815?",
        options: ["Battle of Hastings", "Battle of Waterloo", "Battle of Gettysburg", "Battle of Agincourt"],
        correctAnswer: "Battle of Waterloo"
      },
      {
        question: "Which ancient civilization is known for creating democracy?",
        options: ["Egyptians", "Greeks", "Romans", "Chinese"],
        correctAnswer: "Greeks"
      },
      {
        question: "Who was the legendary king of the Greeks who fought in the Trojan War?",
        options: ["Achilles", "Hector", "Julius Caesar", "Napoleon"],
        correctAnswer: "Achilles"
      }
    ]
};

// Start button click event
startBtn.addEventListener('click', function () {
    document.getElementById('start-section').classList.add('hidden', 'card');
    topicSection.classList.remove('hidden');
  });
  
  // Topic selection
  document.getElementById('select-topic-btn').addEventListener('click', function () {
    const selectedTopic = document.querySelector('input[name="topic"]:checked');
    if (selectedTopic) {
      currentTopic = selectedTopic.value;
      questions = quizData[currentTopic];
      startQuiz();
    } else {
      alert('Please select a topic!');
    }
  });
  
  // Random topic selection
  document.getElementById('random-topic-btn').addEventListener('click', function () {
    const topics = Object.keys(quizData);
    currentTopic = topics[Math.floor(Math.random() * topics.length)];
    questions = quizData[currentTopic];
    startQuiz();
  });
  
  // Start quiz function
  function startQuiz() {
    topicSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    loadQuestion();
  }
  
  // Load question
  function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionText.textContent = questionData.question;
    optionsForm.innerHTML = '';
    questionData.options.forEach(option => {
      const optionHTML = `
        <div>
          <input type="radio" name="answer" value="${option}">
          <label>${option}</label>
        </div>
      `;
      optionsForm.innerHTML += optionHTML;
    });
  }
  
  // Submit answer
  document.getElementById('submit-answer-btn').addEventListener('click', function () {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer)   
   {
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;
      if (selectedAnswer.value === correctAnswer) {
        score++;
        showPopup('Congrats! Correct answer.');
      } else {
        showPopup(`Wrong answer! The correct answer is ${correctAnswer}.`);
      }
      answeredQuestions.push({ questionIndex: currentQuestionIndex, correct: selectedAnswer.value === correctAnswer });
    } else {
      alert('Please select an answer!');
    }
  });
  
  // Skip question
  document.getElementById('skip-btn').addEventListener('click', function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  });
  
  // Show result popup
  function showPopup(message) {
    popupMessage.textContent = message;
    resultPopup.classList.add('visible');
  }
  
  // Close popup and continue
  closePopupBtn.addEventListener('click', closePopup);
  continueBtn.addEventListener('click', closePopup);
  
  function closePopup() {
    resultPopup.classList.remove('visible');
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
  
  // End quiz and show score
  function endQuiz() {
    quizSection.classList.add('hidden');
    scoreSection.classList.remove('hidden');
  
    const percentage = (score / questions.length) * 100;
    finalScore.textContent = `You scored ${score}/${questions.length} (${percentage.toFixed(2)}%)`;
    
    // Determine the message based on the score
    let message = '';
    if (percentage >= 60) {
      message = 'Congratulations! You passed the quiz!';
      finalScore.style.color = 'green'; // Set text color for passing
      // Show avatar
      document.getElementById('avatar').src = 'https://github.com/BobchopGaming/NataliaFunQuizAdventure/blob/main/Natalia_Avatar.webp'; // Set the correct path for the avatar
    } else {
      message = 'Try again! You can do better!';
      finalScore.style.color = 'red'; // Set text color for failing
      // Show avatar
      document.getElementById('avatar').src = 'https://github.com/BobchopGaming/NataliaFunQuizAdventure/blob/main/Natalia_Avatar.webp'; // Set the correct path for the avatar
    }
  
    // Update the message element
    const messageElement = document.getElementById('result-message'); // Make sure this ID exists in your HTML
    messageElement.textContent = message; // Set the message based on score
  
    summaryList.innerHTML = answeredQuestions.map((q, index) => {
      return `<li>Question ${index + 1}: ${q.correct ? 'Correct' : 'Wrong'}</li>`;
    }).join('');
  
    // Handle back button click
    document.getElementById("back-home-button").addEventListener("click", function() {
      location.href = location.href;
    });
  
    // Call other functions if needed
    showSpeechBubble();
    typeText();
  }
  

// Event listener for the skip button
document.getElementById('skip-btn').addEventListener('click', function () {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz(); // This will now work if endQuiz is defined
  }
});

  
    // Show the speech bubble
    speechBubble.style.display = "block";
    setTimeout(() => {
      speechBubble.style.display = "none";
    }, 3000);
  
  

  
  // Speech bubble animation
  function showSpeechBubble() {
    speechBubble.style.display = 'block'; // Show the speech bubble
    speechBubble.style.opacity = 1; // Make it visible
    typeText();
  }
  
  function typeText() {
    if (index < message.length) {
      speechText.textContent += message.charAt(index); // Add one character at a time
      index++;
      setTimeout(typeText, 100); // Adjust speed here (in milliseconds)
    } else {
      setTimeout(() => {
        speechBubble.style.opacity = 0; // Fade out after finishing
        setTimeout(() => {
          speechBubble.style.display = 'none'; // Hide the speech bubble
          index = 0; // Reset index for replay
          speechText.textContent = ''; // Clear text
          showSpeechBubble(); // Repeat animation
        }, 1000); // Adjust delay before repeat
      }, 2000); // Adjust delay before fading out
    }
  }
  
  
  // Start the animation when the page loads
  window.onload = showSpeechBubble;

