const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Which superhero is blinded by radioactive components and nicknamed the “Man without fear”?',
    answers: [
      { text: 'Green Lanter', correct: false },
      { text: 'Daredevil', correct: true },
      { text: 'Wolverine', correct: false},
      { text: 'The Hulk', correct: false },
    ]
  },
  {
    question: 'Which newspaper does Spiderman,Peter Parker, work for?',
    answers: [
      { text: 'The Daily Planet', correct: false },
      { text: 'The Daily World', correct: false },
      { text: 'The Daily Spread', correct: false },
      { text: 'The Daily Bugle', correct: true }
    ]
  },
  {
    question: 'Debuting in 1965, which superhero is also known as Goliath and Ronin?',
    answers: [
      { text: 'Hawkeye', correct: true },
      { text: 'The Beast', correct: false },
      { text: 'Batman', correct: false },
      { text: 'Iron Man', correct: false }
    ]
  },
  {
    question: 'Elektra made her debut in which Marvel comic?',
    answers: [
      { text: 'Captain America', correct: false },
      { text: 'Green Lanter', correct: false },
      { text: 'Daredevil', correct: true },
      { text: 'Punisher', correct: false },
    ]
  }
];
