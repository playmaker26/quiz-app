let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerInterval;
let timerRunOut = 0;
function startQuiz() {
    let header = document.querySelector('.main-header');
    let splashScreen = document.querySelector('.splash-screen');
    let quizScreen = document.querySelector('#quiz');
    let startQuizBtn = document.querySelector('.quiz-btn');


    if(!header || !splashScreen || !quizScreen ||!startQuizBtn) {
        console.error('Error: One or more required elements are missing.');
        return;
    }


    header.classList.remove('hidden');
    splashScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');

if(startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
        header.classList.add('hidden');
        splashScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        quizQuestions();
        quizTimer();
    });
}else {
    console.warn('Start Quiz button not found.');
}

}
startQuiz();

function quizQuestions() {
    let quizScreen = document.querySelector('#quiz');
    let question = questions[currentQuestionIndex];
    quizScreen.innerHTML = `
    <div class= 'timer'> <span class='span-timer'></span></div>
    <form class= 'quiz-form'>
    <label class= 'quiz-question'>${question.question}</label>

    <div class = 'options'>
    ${question.answers.map(answer => `
    <button class="answer-btn" data-correct="${answer.correct}">${answer.text}</button>
   `).join('')}
    </div>

    <div class = 'btn'>
    <button type="button" class="next-btn">Next</button>
    </div>
    </form>
    `;

selectedAnswer();
nextButton();
quizTimer();
}
quizQuestions();


function selectedAnswer() {
let nextBtn = document.querySelector('.next-btn');

nextBtn.disabled = true;
nextBtn.style.backgroundColor = 'grey';
nextBtn.style.color = 'lightgrey';

document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === 'true';
        clearInterval(timerInterval);
        if(isCorrect) {
            selectedBtn.classList.add('correct');
            quizScore(true);
        }else{
            selectedBtn.classList.add('wrong');
        }

        document.querySelectorAll('.answer-btn').forEach(button => {
            button.disabled = true;

            if(button.dataset.correct === 'true') {
                button.classList.add('correct');
            }else {
                button.classList.add('disabled');
            }
        });

        let updatedNextBtn = document.querySelector('.next-btn');
        updatedNextBtn.disabled = false;
        updatedNextBtn.style.backgroundColor = 'var(--accent-color)';
        updatedNextBtn.style.color = 'var(--text-color)';

        nextButton();
    });
});
}

function nextButton() {
    let nextBtn = document.querySelector('.next-btn');

 let newBtn = nextBtn.cloneNode(true);
 nextBtn.replaceWith(newBtn);

 newBtn.addEventListener('click', () => {
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length) {
        quizQuestions();
    }else {
        resultScreen();
    }
 });
}

function resultScreen() {
    let quizScreen = document.querySelector('#quiz');
    let resultSection = document.createElement('section');
    resultSection.classList.add('result-screen');
    let main = document.querySelector('main');

    main.appendChild(resultSection);
    quizScreen.style.display = 'none';

    resultSection.innerHTML = `<article class='result'>
                    <header>
                        <h1>You got ${score} out of 10</h1>
                    </header>
                    <button class="restart-btn">Play Again</button>
                </article>`

    ;

    document.querySelector('.restart-btn').addEventListener('click', () => {
        location.reload();
    });
}


function quizScore (isCorrect) {
if(isCorrect) {
    score++;
}
}
quizScore();

function quizTimer() {
let timer = 60;
let timerSpan = document.querySelector('.span-timer');

if(timerInterval)clearInterval(timerInterval);

    timerInterval = setInterval(() =>  {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        timerSpan.textContent = `${minutes} : ${seconds < 10 ? '0' : ''}  ${seconds}`;
        timer--;

        if(timer < 0) {
            clearInterval(timerInterval);
            timerRunOut++;
            handleTimeOut();
        }
    }, 1000);
}

function handleTimeOut() {
    let nextBtn = document.querySelector('.next-btn');

    document.querySelectorAll('.answer-btn').forEach(button => {
        button.disabled = true;

        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        }else {
            button.classList.add('disabled');
        }
    });

    timerRunOut++;

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < questions.length) {
            quizQuestions();
        }else {
            resultScreen();
        }
    }, 3000);
}


