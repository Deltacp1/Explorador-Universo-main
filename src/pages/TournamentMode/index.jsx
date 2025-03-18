'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Key, ArrowRight } from 'lucide-react';
import StarryBackground from '../../components/StarryBackground';
import SpaceButton from '../../components/SpaceButton';
import FlickeringText from '../../components/FlickeringText';
import { useGame } from '../../context/GameContext';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';
import styles from './styles.module.css';

const TournamentJoin = () => {
  const navigate = useNavigate();
  const {
    setPlayerName,
    setClassId,
    playerName,
    classId,
    setCurrentPlayer,
    setGameStarted,
  } = useGame();

  const [isJoining, setIsJoining] = useState(false);

  const handleJoinClass = (e) => {
    e.preventDefault();

    if (!playerName.trim()) {
      toast.error('Digite seu nome');
      return;
    }

    if (!classId.trim()) {
      toast.error('Digite o ID da aula');
      return;
    }

    setIsJoining(true);

    // Simulate joining a class (in a real app, this would be an API call)
    setTimeout(() => {
      setIsJoining(false);
      setCurrentPlayer({
        id: Date.now().toString(),
        name: playerName,
        score: 0,
        correctAnswers: 0,
        totalAnswers: 0,
      });
      setGameStarted(true);
      toast.success(`Entrou no torneio ${classId} com sucesso!`);
      navigate('/quiz');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <StarryBackground starCount={100} />

      <div className={styles.formWrapper}>
        <FlickeringText
          text="ENTRE NO TORNEIO"
          className={styles.title}
          glowColor="accent"
        />

        <div className={styles.card}>
          <form onSubmit={handleJoinClass} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <UserPlus size={18} className={styles.labelIcon} />
                Jogador
              </label>
              <Input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className={styles.input}
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Key size={18} className={styles.labelIcon} />
                ID do torneio
              </label>
              <Input
                type="text"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className={styles.input}
                placeholder="Coloque o ID do torneio"
                required
              />
              <p className={styles.helperText}>
                Digite o ID forncido pelo seu/sua professor(a)
              </p>
            </div>

            <div className={styles.buttonGroup}>
              <SpaceButton
                type="button"
                variant="secondary"
                onClick={() => navigate('/game-mode')}
              >
                Voltar
              </SpaceButton>

              <SpaceButton
                type="submit"
                variant="accent"
                disabled={isJoining}
                className={styles.joinButton}
              >
                {isJoining ? 'Entrando...' : 'Entrar no torneio'}
                {!isJoining && <ArrowRight size={16} />}
              </SpaceButton>
            </div>
          </form>

          {/* Quick join for testing */}
          <div className={styles.quickJoinSection}>
            <p className={styles.quickJoinText}>
              Para teste: Use o ID SPACE101
            </p>
            <SpaceButton
              variant="default"
              size="sm"
              className={styles.quickFillButton}
              onClick={() => {
                setClassId('SPACE101');
                if (!playerName) setPlayerName('Jogador Teste');
              }}
            >
              Preenchimento Teste
            </SpaceButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentJoin;
