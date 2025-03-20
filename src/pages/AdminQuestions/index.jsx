'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import StarryBackground from '../../components/StarryBackground';
import SpaceButton from '../../components/SpaceButton';
import FlickeringText from '../../components/FlickeringText';
import { useGame } from '../../context/GameContext';
import styles from './styles.module.css';

const AdminQuestions = () => {
  const navigate = useNavigate();
  const { classes } = useGame();
  const [expandedClass, setExpandedClass] = useState(null);

  const toggleExpand = (classId) => {
    setExpandedClass(expandedClass === classId ? null : classId);
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
              onClick={() => navigate('/admin')}
              className={styles.backButton}
            >
              <ArrowLeft size={16} />
            </SpaceButton>
            <FlickeringText
              text="MANAGE QUESTIONS"
              className={styles.title}
              glowColor="accent"
            />
          </div>
        </div>

        {classes.length === 0 ? (
          <div className={styles.emptyState}>
            <BookOpen size={32} className={styles.emptyStateIcon} />
            <h3 className={styles.emptyStateTitle}>No Classes Available</h3>
            <p className={styles.emptyStateText}>
              Create a class first before adding questions to it.
            </p>
            <SpaceButton
              variant="accent"
              onClick={() => navigate('/admin/classes')}
              className={styles.createClassButton}
            >
              Create Class
            </SpaceButton>
          </div>
        ) : (
          <div className={styles.classGrid}>
            {classes.map((cls) => (
              <div key={cls.id} className={styles.classCard}>
                <div
                  className={styles.classHeader}
                  onClick={() => toggleExpand(cls.id)}
                >
                  <div className={styles.classInfo}>
                    {expandedClass === cls.id ? (
                      <ChevronDown size={20} className={styles.chevronIcon} />
                    ) : (
                      <ChevronRight size={20} className={styles.chevronIcon} />
                    )}
                    <h3 className={styles.className}>{cls.name}</h3>
                    <span className={styles.questionCount}>
                      ({cls.questions.length} questions)
                    </span>
                  </div>

                  <SpaceButton
                    variant="accent"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/classes/${cls.id}/questions`);
                    }}
                  >
                    Manage Questions
                  </SpaceButton>
                </div>

                {expandedClass === cls.id && (
                  <div className={styles.expandedContent}>
                    {cls.questions.length === 0 ? (
                      <p className={styles.noQuestionsText}>
                        No questions added yet
                      </p>
                    ) : (
                      <ul className={styles.questionsList}>
                        {cls.questions.map((question, index) => (
                          <li key={question.id} className={styles.questionItem}>
                            <span className={styles.questionNumber}>
                              Q{index + 1}:
                            </span>{' '}
                            {question.text}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className={styles.viewAllContainer}>
                      <SpaceButton
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/classes/${cls.id}/questions`);
                        }}
                      >
                        View All Questions
                      </SpaceButton>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQuestions;
