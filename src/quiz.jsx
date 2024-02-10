import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom'; // useParams for passing

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button components



import './quiz.css';

const QuizApp = () => {
  const { categoryId } = useParams(); // category ID from the URL parameters getting

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetch(`https://opentdb.com/api_count.php?category=${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestionCount(data.category_question_count.total_question_count);
      })
      .catch((error) => console.error(error));

    // Fetch questions 
    fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
        // format the fetched questions
        const formattedQuestions = data.results.map((question) => ({
          questionText: question.question,
          options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
          correctAnswer: question.correct_answer,
        }));

        setQuestions(formattedQuestions);
      })
      .catch((error) => console.error(error));
  }, [categoryId]);


  const handleOptionSelect = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isOptionCorrect = option === currentQuestion.correctAnswer;

    setSelectedOption(option);
    setIsCorrect(isOptionCorrect);

    if (isOptionCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    } else {
      setIncorrectAnswersCount(incorrectAnswersCount + 1);
    }

    setTimer(
      setTimeout(() => {
        handleNextQuestion();
      }, 1000) //  (5 seconds)
    );
  };

  const handleNextQuestion = () => {
    clearTimeout(timer);

    // Move to the next question
    setSelectedOption(null);
    setIsCorrect(null);
   

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizEnded(true);
     
      
      // End of the quiz
      // "Quiz completed" message here
    }
  };
  useEffect(() => {
  

    if (quizEnded === true) {
      // End of the quiz
      // Show the modal when the last question is answered
      setShowModal(true);
    }
  }, [quizEnded]);

  const handleCloseModal = () => {
    setShowModal(false);
    window.location = '/'; 
  };
  // useEffect(() => {
  //   // Display alert when the quiz has ended and correct answers count has changed
  //   if (quizEnded) {
  //     window.setTimeout(() => {
  //       window.alert('Correct answers = ' + correctAnswersCount);
  //       window.location = '/';
  //     }, 5000);
  //   }
  // }, [quizEnded, correctAnswersCount]);

  if (questions.length === 0) {
    return <div id='load'>
      <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='main'>

      <div className="quiz-container">
        <div>
          <div className='circle-1'></div>
          <div className='circle-2'></div>
          <div className='circle-3'></div>
        </div>

        <h1 className="quiz-title">Quiz App</h1>
        <div className='quiz-app'>
          <div className="question-card">
            <div id='con' >
            <div   className="row">
              <div className="col-12">
                <div className="question-number-circle">
                  <h2 className="question-number">
                    {currentQuestionIndex + 1}
                  </h2>
                </div>
              </div>
              <div className="col-12">
                <h2 className="question-number">
                  <div id='bar'>
                
                   <div className="progress-bar bg-success" role="progressbar" style={{ width: `${(correctAnswersCount / questions.length) * 50}%` }}> 
                     {correctAnswersCount}  </div>
                  
                 
                  
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${(incorrectAnswersCount / questions.length) * 50}%` }}>
                   {incorrectAnswersCount} 
                  </div>
                
                </div>
                  <span className="score">
                    Question : {currentQuestionIndex + 1}/{questions.length}
                  </span>
                </h2>
                

                <div className="question-text">
                  {currentQuestion.questionText}
                </div>
               
              </div>
            </div>
            </div>

            <div className="options">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== null}
                  className={`option-button ${selectedOption === option ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                >
                  {selectedOption === option && (
                    <span className="icon">
                      {isCorrect ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                    </span>
                  )}
                  {option}
                </button>
              ))}
            </div>
            {selectedOption !== null && (
                  <div className="feedback">
                    {isCorrect ? <p>Correct!</p> : <p>Wrong. The correct answer is {currentQuestion.correctAnswer}.</p>}
                  </div>
                )}
          </div>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Total Questions : {questions.length}</p>
          <p>Correct Answers : {correctAnswersCount}</p>
          <p>Incorrect answers : {incorrectAnswersCount}</p>
          {/* You can add more details or customize the content here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" id='done' onClick={handleCloseModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>


  );
};

export default QuizApp;