let quizLogic = function () {
    const questions = [
        {
            question: 'In Friends, what is the name of Ross’s second wife?',
            answers: [
                {text: 'Carol', correct: false},
                {text: 'Emily', correct: true},
                {text: 'Janice', correct: false},
                {text: 'Susan', correct: false}
            ]
        },
    
        {
            question: 'What is the real name of Breaking Bad’s Heisenberg?',
            answers: [
                {text: 'Jesse Pinkman', correct: false},
                {text: 'Walter White', correct: true},
                {text: 'Saul Goodman', correct: false},
                {text: 'Hank Schrader', correct: false}
            ]
        },
    
        {
            question: 'In Stranger Things, what is Eleven’s favorite food?',
            answers: [
                {text: 'Reese’s Pieces', correct: false},
                {text: 'Eggo Waffles', correct: true},
                {text: 'Twinkies', correct: false},
                {text: 'Doritos', correct: false}
            ]
        },
    
        {
            question: 'Which TV show follows the lives of Jay, Gloria, Claire, and Phil?',
            answers: [
                {text: 'Full House', correct: false},
                {text: 'How I Met Your Mother', correct: false},
                {text: 'Modern Family', correct: true},
                {text: 'The Big Bang Theory', correct: false}
            ]
        },
    
        {
            question: 'Which movie features the song “Hakuna Matata”?',
            answers: [
                {text: 'Aladdin', correct: false},
                {text: 'The Lion King', correct: true},
                {text: 'Tarzan', correct: false},
                {text: 'Finding Nemo', correct: false}
            ]
        },
    
        {
            question: 'Which actor played Jack Dawson in Titanic?',
            answers: [
                {text: 'Brad Pitt', correct: false},
                {text: 'Johnny Depp', correct: false},
                {text: 'Leonardo DiCaprio', correct: true},
                {text: 'Tom Cruise', correct: false}
            ]
        },
    
        {
            question: 'In The Matrix, what color pill does Neo take?',
            answers: [
                {text: 'Red', correct: true},
                {text: 'Blue', correct: false},
                {text: 'Green', correct: false},
                {text: 'Yellow', correct: false}
            ]
        },
    
        {
            question: 'Who directed Inception (2010)?',
            answers: [
                {text: 'Quentin Tarantino', correct: false},
                {text: 'Steven Spielberg', correct: false},
                {text: 'Christopher Nolan', correct: true},
                {text: 'Martin Scorsese', correct: false}
            ]
        }
    ]
    let section = document.querySelector('#quiz');
    let form = document.createElement('form');

    
    section.appendChild(form);
    
    form.innerHTML = `
    <label id= 'quiz-question'></label>

    <div class= 'options'>
    <button></button>
    </div>

    <div class= 'btn'>
    <button type="button" class="next-btn">Next</button>
    </div>
    `
    let currentQuestionIndex = 0;
    let score = 0;
    let nextQuestionButton = document.querySelector('.next-btn');
    let updateQuestion = function() {
        let questionLabel = document.querySelector('#quiz-question');
        let optionDiv = document.querySelector('.options');        

        let currentQuestion = questions[currentQuestionIndex];

        questionLabel.textContent = currentQuestion.question;
        optionDiv.innerHTML = '';
        nextQuestionButton.disabled = true;

        currentQuestion.answers.forEach(answer => {
            let button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('option-btn');

            button.addEventListener('click', () => {
                document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

                if(answer.correct) {
                    button.classList.add('correct');
                    score++;
                }else {
                    button.classList.add('wrong');

                    document.querySelectorAll('.option-btn').forEach(btn => {
                        if(currentQuestion.answers.find(a => a.text === btn.textContent).correct) {
                            btn.classList.add('correct');
                        }
                    });
                }
                nextQuestionButton.disabled = false;
            });
            optionDiv.appendChild(button);
        });

       
    }
    updateQuestion(); 
    nextQuestionButton.addEventListener('click', () => {
        if(currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            updateQuestion();
        }else {
            form.style.display = 'none';

            section.innerHTML = `
                            <article class='message'>
                <header>
                    <h1>You got ${score} out of ${questions.length}</h1>
                </header>
            </article>
            `;
        }
    });   
    }

let startQuiz = function() {
    let splashScreen = document.querySelector('.splash-screen');
    let quizScreen = document.querySelector('#quiz');
    let startQuizButton = document.querySelector('.start-quiz');
    let logo = document.querySelector('.logo');
    let timer = document.querySelector('.timer');

    window.addEventListener('load', () => {
        timer.classList.add('hidden');
      
        quizScreen.classList.add('hidden');
        
        splashScreen.classList.remove('hidden');
        
        logo.classList.remove('hidden');
        
    });
    
startQuizButton.addEventListener('click', () => {
    timer.classList.remove('hidden');
    
    quizScreen.classList.remove('hidden');
   
    splashScreen.classList.add('hidden');
    
    logo.classList.add('hidden');
    quizLogic();
});
}
startQuiz();

