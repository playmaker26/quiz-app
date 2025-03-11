let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerInterval;

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

    let nextBtn = document.querySelector('.next-btn');

    nextBtn.disabled = true;
    nextBtn.style.backgroundColor = 'grey';
    nextBtn.style.color = 'lightgrey';

    quizTimer();
document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === 'true';
       clearInterval(timerInterval);
        if(isCorrect) {
            selectedBtn.classList.add('correct');
            quizScore(true)
        }else {
            selectedBtn.classList.add('wrong');
        }


        document.querySelectorAll('.answer-btn').forEach(button => {
            if(button.dataset.correct === 'true') {
                button.classList.add('correct')
            }else if (button !== selectedBtn) {
               button.classList.add('disabled')
            }
            button.disabled = true;
        });
                    nextBtn.disabled = false;
            nextBtn.style.backgroundColor = 'var(--accent-color)';
            nextBtn.style.color = 'var(--text-color)';
    });
});

}
quizQuestions();


function nextButton() {
    let nextBtn = document.querySelector('.next-btn');
    let quizScreen = document.querySelector('#quiz');
    let resultSection = document.createElement('section');
    resultSection.classList.add('result-screen');
    let main = document.querySelector('main');
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length) {
        quizQuestions();
        nextButton();
        quizTimer();
    }else {
        quizScreen.style.display = 'none';
      
        if(!document.querySelector('.result-screen')) {
            main.appendChild(resultSection);
        }

        resultSection.innerHTML = `
        <article class= 'result'>
        <header>
        <h1>You got ${score} out of 10</h1>
        </header>
    
        <button class="restart-btn">Play Again</button>
        </article>
        `;

        document.querySelector('.restart-btn').addEventListener('click', () => {
            location.reload();
        });

        nextBtn.disabled = true;
    }
});


}
nextButton();

function quizScore (isCorrect) {
if(isCorrect) {
    score++;
}
}
quizScore();

function quizTimer() {
let timer = 60;
let timerElement = document.querySelector('.span-timer');

if(!timerElement)return;

timerElement.innerText = timer;

timerInterval = setInterval(function() {
    timer--;
   

    if(timer >= 0) {
        timerElement.innerText = timer;
    }

    if(timer === 0) {
        clearInterval(timerInterval);
        markQuestionAsWrong();
        revealAnswerAndNext();
    }
}, 1000);
}

function revealAnswerAndNext(){
document.querySelectorAll('.answer-btn').forEach(button => {
    if(button.dataset.correct === 'true') {
        button.classList.add('correct');
    }else {
        button.classList.add('disabled');
    }
    button.disabled = true;
});

setTimeout(() => {
   currentQuestionIndex++;

   if(currentQuestionIndex < questions.length) {
    quizQuestions();
   }else {
    nextButton();
   }
}, 3000);
}

function markQuestionAsWrong() {
    document.querySelectorAll('.answer-btn').forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        }else {
            button.classList.add('wrong');
        }
        button.disabled = true;
    });
}