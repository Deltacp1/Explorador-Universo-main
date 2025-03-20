'use client';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash, Check, X } from 'lucide-react';
import StarryBackground from '../../components/StarryBackground';
import SpaceButton from '../../components/SpaceButton';
import FlickeringText from '../../components/FlickeringText';
import { useGame } from '../../context/GameContext';
import { toast } from 'sonner';
import QuestionForm from '../../components/admin/QuestionForm';
import styles from './styles.module.css';

const ClassQuestions = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const { getClassById, deleteQuestion } = useGame();
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);

  const currentClass = getClassById(classId || '');

  useEffect(() => {
    if (!currentClass) {
      toast.error('Class not found');
      navigate('/admin/classes');
    }
  }, [currentClass, navigate]);

  if (!currentClass) {
    return null;
  }

  const handleDeleteQuestion = (questionId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this question? This cannot be undone.'
      )
    ) {
      deleteQuestion(classId, questionId);
      toast.success('Question deleted');
    }
  };

  return (
    <div className={styles.container}>
      <StarryBackground starCount={70} />

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <SpaceButton
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/questions')}
              className={styles.backButton}
            >
              <ArrowLeft size={16} />
            </SpaceButton>
            <div>
              <p className={styles.classNameLabel}>
                Class: {currentClass.name}
              </p>
              <FlickeringText
                text="MANAGE QUESTIONS"
                className={styles.title}
                glowColor="accent"
              />
            </div>
          </div>

          <SpaceButton
            variant="accent"
            onClick={() => {
              setEditingQuestion(null);
              setIsCreatingQuestion(true);
            }}
            className={styles.newQuestionButton}
          >
            <Plus size={16} />
            New Question
          </SpaceButton>
        </div>

        {isCreatingQuestion || editingQuestion ? (
          <QuestionForm
            classId={classId}
            initialQuestion={editingQuestion}
            onCancel={() => {
              setIsCreatingQuestion(false);
              setEditingQuestion(null);
            }}
          />
        ) : (
          <>
            {currentClass.questions.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.questionMark}>?</div>
                <h3 className={styles.emptyStateTitle}>
                  No Questions Added Yet
                </h3>
                <p className={styles.emptyStateText}>
                  Add your first question to this class.
                </p>
                <SpaceButton
                  variant="accent"
                  onClick={() => setIsCreatingQuestion(true)}
                  className={styles.addFirstButton}
                >
                  <Plus size={16} />
                  Add First Question
                </SpaceButton>
              </div>
            ) : (
              <div className={styles.questionGrid}>
                {currentClass.questions.map((question, index) => (
                  <div key={question.id} className={styles.questionCard}>
                    <div className={styles.questionHeader}>
                      <h3 className={styles.questionText}>
                        <span className={styles.questionNumber}>
                          Q{index + 1}
                        </span>
                        {question.text}
                      </h3>

                      <div className={styles.questionActions}>
                        <SpaceButton
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingQuestion(question)}
                          className={styles.actionButton}
                        >
                          <Edit size={14} />
                          Edit
                        </SpaceButton>
                        <SpaceButton
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className={styles.actionButton}
                        >
                          <Trash size={14} />
                          Delete
                        </SpaceButton>
                      </div>
                    </div>

                    <div className={styles.optionsGrid}>
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={
                            optionIndex === question.correctAnswer
                              ? styles.correctOption
                              : styles.option
                          }
                        >
                          {optionIndex === question.correctAnswer ? (
                            <Check size={16} className={styles.correctIcon} />
                          ) : (
                            <X size={16} className={styles.incorrectIcon} />
                          )}
                          <span>{option}</span>
                          {optionIndex === question.correctAnswer && (
                            <span className={styles.correctLabel}>Correct</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClassQuestions;
