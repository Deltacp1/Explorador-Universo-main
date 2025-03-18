'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Clock } from 'lucide-react';
import StarryBackground from '../../components/StarryBackground';
import { useGame } from '../../context/GameContext';
import { toast } from 'sonner';
import { Progress } from '../../components/ui/progress';
import styles from './styles.module.css';

const Quiz = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    currentPlayer,
    setCurrentPlayer,
    setGameFinished,
    gameMode,
  } = useGame();

  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scoreGained, setScoreGained] = useState(0);

  // Redirect if no player or questions
  useEffect(() => {
    if (!currentPlayer || questions.length === 0) {
      toast.error('Session not found');
      navigate('/');
    }
  }, [currentPlayer, questions, navigate]);

  // Timer countdown
  useEffect(() => {
    if (showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showResult]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleTimeout = () => {
    if (!showResult) {
      setShowResult(true);
      setIsCorrect(false);
      setScoreGained(0);

      // Update player stats
      if (currentPlayer) {
        setCurrentPlayer({
          ...currentPlayer,
          totalAnswers: currentPlayer.totalAnswers + 1,
        });
      }

      setTimeout(handleNextQuestion, 2000);
    }
  };

  const handleSelectOption = (optionIndex) => {
    if (showResult) return;

    setSelectedOption(optionIndex);
    setShowResult(true);

    const correct = optionIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    // Calculate score based on time left
    const baseScore = 100;
    const timeBonus = timeLeft * 5;
    const totalScore = correct ? baseScore + timeBonus : 0;
    setScoreGained(totalScore);

    // Update player stats
    if (currentPlayer) {
      setCurrentPlayer({
        ...currentPlayer,
        score: currentPlayer.score + totalScore,
        correctAnswers: correct
          ? currentPlayer.correctAnswers + 1
          : currentPlayer.correctAnswers,
        totalAnswers: currentPlayer.totalAnswers + 1,
      });
    }

    if (correct) {
      toast.success('Correct answer!');
    } else {
      toast.error('Incorrect answer');
    }

    setTimeout(handleNextQuestion, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimeLeft(20);
    } else {
      // Quiz finished
      setGameFinished(true);
      navigate('/results');
    }
  };

  if (!currentQuestion) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <StarryBackground starCount={100} />

      <div className={styles.quizWrapper}>
        {/* Quiz header */}
        <div className={styles.quizHeader}>
          <div className={styles.questionCounter}>
            <p className={styles.counterText}>
              Question {currentQuestionIndex + 1}/{questions.length}
            </p>
          </div>

          <div className={styles.timerDisplay}>
            <Clock size={16} className={styles.timerIcon} />
            <p className={styles.timerText}>{timeLeft}s</p>
          </div>
        </div>

        {/* Timer */}
        <div className={styles.timerBar}>
          <Progress
            value={(timeLeft / 20) * 100}
            className={styles.progressBar}
          />
        </div>

        {/* Question */}
        <div className={styles.questionCard}>
          <h2 className={styles.questionText}>{currentQuestion.text}</h2>
        </div>

        {/* Options */}
        <div className={styles.optionsGrid}>
          {currentQuestion.options.map((option, index) => {
            let optionClass = styles.optionCard;

            if (showResult) {
              if (selectedOption === index) {
                optionClass = isCorrect
                  ? styles.optionCardCorrect
                  : styles.optionCardIncorrect;
              } else if (index === currentQuestion.correctAnswer) {
                optionClass = styles.optionCardCorrect;
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={showResult}
                className={optionClass}
              >
                <div className={styles.optionContent}>
                  <div className={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={styles.optionText}>{option}</span>

                  {showResult && index === currentQuestion.correctAnswer && (
                    <Check size={20} className={styles.correctIcon} />
                  )}

                  {showResult && selectedOption === index && !isCorrect && (
                    <X size={20} className={styles.incorrectIcon} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Score feedback */}
        {showResult && (
          <div className={styles.feedbackContainer}>
            {isCorrect ? (
              <>
                <p className={styles.scoreGained}>+ {scoreGained} points</p>
                <p className={styles.feedbackText}>
                  Great job!{' '}
                  {timeLeft > 15
                    ? 'Lightning fast!'
                    : timeLeft > 10
                    ? 'Nice timing!'
                    : ''}
                </p>
              </>
            ) : (
              <p className={styles.correctAnswerText}>
                The correct answer was{' '}
                {String.fromCharCode(65 + currentQuestion.correctAnswer)}
              </p>
            )}
          </div>
        )}

        {/* Controls or status */}
        <div className={styles.controlsContainer}>
          {showResult ? (
            <p className={styles.nextQuestionText}>
              Next question in a moment...
            </p>
          ) : (
            <p className={styles.selectAnswerText}>Select your answer</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
