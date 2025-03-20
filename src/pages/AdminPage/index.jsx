'use client';
import { useNavigate } from 'react-router-dom';
import { Clipboard, Users, BookOpen, ArrowLeft } from 'lucide-react';
import StarryBackground from '../../components/StarryBackground';
import SpaceButton from '../../components/SpaceButton';
import FlickeringText from '../../components/FlickeringText';
import { useGame } from '../../context/GameContext';
import styles from './styles.module.css';

const Admin = () => {
  const navigate = useNavigate();
  const { classes } = useGame();

  return (
    <div className={styles.container}>
      <StarryBackground starCount={70} />

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <FlickeringText
            text="TEACHER DASHBOARD"
            className={styles.title}
            glowColor="accent"
          />

          <SpaceButton
            variant="secondary"
            size="sm"
            onClick={() => navigate('/')}
            className={styles.backButton}
          >
            <ArrowLeft size={16} />
            Back to Home
          </SpaceButton>
        </div>

        <div className={styles.cardGrid}>
          <div
            className={styles.menuCard}
            onClick={() => navigate('/admin/classes')}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconContainer}>
                <Users size={24} className={styles.icon} />
              </div>
              <h2 className={styles.cardTitle}>Manage Classes</h2>
            </div>
            <p className={styles.cardDescription}>
              Create and manage your classes, and generate codes for students to
              join.
            </p>
            <div className={styles.cardFooter}>
              <span>{classes.length} Classes Available</span>
              <span>→</span>
            </div>
          </div>

          <div
            className={styles.menuCard}
            onClick={() => navigate('/admin/questions')}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconContainer}>
                <BookOpen size={24} className={styles.icon} />
              </div>
              <h2 className={styles.cardTitle}>Manage Questions</h2>
            </div>
            <p className={styles.cardDescription}>
              Create, edit, and organize questions for your space quiz
              tournaments.
            </p>
            <div className={styles.cardFooter}>
              <span>Create Custom Questions</span>
              <span>→</span>
            </div>
          </div>
        </div>

        <div className={styles.referenceSection}>
          <h3 className={styles.referenceTitle}>
            <Clipboard size={20} className={styles.icon} />
            Quick Reference
          </h3>

          <div className={styles.referenceGrid}>
            <div className={styles.referenceCard}>
              <h4 className={styles.referenceSubtitle}>How to Use</h4>
              <ol className={styles.orderedList}>
                <li>Create a class for your students</li>
                <li>Add questions to your class</li>
                <li>Share the class code with students</li>
                <li>Students join using the code</li>
                <li>Monitor their progress</li>
              </ol>
            </div>

            <div className={styles.referenceCard}>
              <h4 className={styles.referenceSubtitle}>Scoring System</h4>
              <ul className={styles.bulletList}>
                <li>Correct answers: +100 base points</li>
                <li>Time bonus: +50 for quick answers</li>
                <li>Wrong answers: 0 points</li>
                <li>Final score based on accuracy and speed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
