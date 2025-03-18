'use client';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trophy } from 'lucide-react';
import StarryBackground from '../../components/StarryBackground';
import styles from './styles.module.css';
import { useGame } from '../../context/GameContext';

const GameMode = () => {
  const navigate = useNavigate();
  const { setGameMode } = useGame();

  const handleModeSelect = (mode) => {
    setGameMode(mode);

    if (mode === 'story') {
      // Initialize story progress variables just like the original LoginPage did
      localStorage.setItem('prologueIndex', 0);
      localStorage.setItem('chapterIndex', 0);
      localStorage.setItem('storyIndex', 0);

      // Navigate to prologue instead of /story to match original behavior
      navigate('/prologue');
    } else {
      navigate('/tournament-join');
    }
  };

  return (
    <div className={styles.container}>
      <StarryBackground starCount={100} />

      <div className={styles.content}>
        <h1 className={styles.title}>SELECIONE O TIPO DA MISSÃO</h1>

        <div className={styles.grid}>
          {/* Story Mode Card */}
          <div
            className={styles.card}
            onClick={() => handleModeSelect('story')}
          >
            <div
              className={`${styles.iconContainer} ${styles.storyIconContainer}`}
            >
              <ArrowRight className={`${styles.icon} ${styles.storyIcon}`} />
            </div>

            <h3 className={styles.cardTitle}>Modo história</h3>

            <p className={styles.cardDescription}>
              Entre em uma jornada cósmica através de uma aventura narrativa
              interativa.
            </p>

            <button
              className={`${styles.button} ${styles.defaultButton}`}
              onClick={() => handleModeSelect('story')}
            >
              Começar jornada
            </button>
          </div>

          {/* Tournament Mode Card */}
          <div
            className={styles.card}
            onClick={() => handleModeSelect('tournament')}
          >
            <div
              className={`${styles.iconContainer} ${styles.tournamentIconContainer}`}
            >
              <Trophy className={`${styles.icon} ${styles.tournamentIcon}`} />
            </div>

            <h3 className={styles.cardTitle}>Modo Torneio</h3>

            <p className={styles.cardDescription}>
              Teste seus conhecimentos contra seus colegas em uma competição de
              quiz rápida.
            </p>

            <button
              className={`${styles.button} ${styles.accentButton}`}
              onClick={() => handleModeSelect('tournament')}
            >
              Entrar em um torneio
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => navigate('/')}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMode;
