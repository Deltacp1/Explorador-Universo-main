'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, Sparkles, ArrowLeft, Home } from 'lucide-react';
import StarryBackground from '../../components/StarryBackground';
import SpaceButton from '../../components/SpaceButton';
import FlickeringText from '../../components/FlickeringText';
import { useGame } from '../../context/GameContext';
import { toast } from 'sonner';
import styles from './styles.module.css';

const Results = () => {
  const navigate = useNavigate();
  const { currentPlayer, players, questions, gameFinished, resetGame } =
    useGame();

  // Redirect if the game isn't finished
  useEffect(() => {
    if (!gameFinished || !currentPlayer) {
      toast.error('No active session found');
      navigate('/');
    }
  }, [gameFinished, currentPlayer, navigate]);

  if (!currentPlayer) {
    return null;
  }

  // Sort players by score
  const sortedPlayers = [...players, currentPlayer].sort(
    (a, b) => b.score - a.score
  );

  // Find the current player's rank
  const playerRank =
    sortedPlayers.findIndex((p) => p.id === currentPlayer.id) + 1;

  // Calculate current player accuracy
  const accuracy =
    (currentPlayer.correctAnswers / Math.max(1, currentPlayer.totalAnswers)) *
    100;

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy size={24} className={styles.goldBadge} />;
      case 2:
        return <Medal size={20} className={styles.silverBadge} />;
      case 3:
        return <Medal size={20} className={styles.bronzeBadge} />;
      default:
        return <span className={styles.rankNumber}>{rank}</span>;
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    navigate('/game-mode');
  };

  return (
    <div className={styles.container}>
      <StarryBackground starCount={100} />

      <div className={styles.contentWrapper}>
        <FlickeringText
          text="MISSION RESULTS"
          className={styles.title}
          glowColor="accent"
        />

        <div className={styles.resultsCard}>
          <div className={styles.playerInfoSection}>
            <div className={styles.playerNameContainer}>
              <h3 className={styles.playerTitle}>Cosmic Explorer</h3>
              <p className={styles.playerName}>{currentPlayer.name}</p>
            </div>

            <div className={styles.scoreContainer}>
              <p className={styles.scoreLabel}>Final Score</p>
              <p className={styles.scoreValue}>{currentPlayer.score}</p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Rank</p>
              <div className={styles.rankDisplay}>
                <span className={styles.statValue}>{playerRank}</span>
                {playerRank <= 3 && (
                  <Sparkles size={18} className={styles.sparkleIcon} />
                )}
              </div>
            </div>

            <div className={styles.statCard}>
              <p className={styles.statLabel}>Correct Answers</p>
              <p className={styles.statValue}>
                {currentPlayer.correctAnswers}/{questions.length}
              </p>
            </div>

            <div className={styles.statCard}>
              <p className={styles.statLabel}>Accuracy</p>
              <p className={styles.statValue}>{accuracy.toFixed(0)}%</p>
            </div>
          </div>

          <h3 className={styles.leaderboardTitle}>Tournament Leaderboard</h3>

          <div className={styles.tableContainer}>
            <table className={styles.leaderboardTable}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>Rank</th>
                  <th
                    className={`${styles.tableHeaderCell} ${styles.textLeft}`}
                  >
                    Name
                  </th>
                  <th
                    className={`${styles.tableHeaderCell} ${styles.textRight}`}
                  >
                    Score
                  </th>
                  <th
                    className={`${styles.tableHeaderCell} ${styles.textRight}`}
                  >
                    Correct
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {sortedPlayers.slice(0, 5).map((player, index) => (
                  <tr
                    key={player.id}
                    className={
                      player.id === currentPlayer.id
                        ? styles.currentPlayerRow
                        : styles.playerRow
                    }
                  >
                    <td className={styles.tableCell}>
                      <div className={styles.rankCell}>
                        {getRankBadge(index + 1)}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.playerNameCell}>
                        {player.name}
                        {player.id === currentPlayer.id && (
                          <span className={styles.youLabel}>(You)</span>
                        )}
                      </div>
                    </td>
                    <td className={`${styles.tableCell} ${styles.textRight}`}>
                      <div className={styles.scoreCell}>{player.score}</div>
                    </td>
                    <td className={`${styles.tableCell} ${styles.textRight}`}>
                      <div className={styles.scoreCell}>
                        {player.correctAnswers}/{player.totalAnswers}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.buttonContainer}>
            <SpaceButton
              variant="default"
              className={styles.actionButton}
              onClick={handlePlayAgain}
            >
              <ArrowLeft size={16} />
              Play Again
            </SpaceButton>

            <SpaceButton
              variant="secondary"
              className={styles.actionButton}
              onClick={() => navigate('/')}
            >
              <Home size={16} />
              Main Menu
            </SpaceButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
