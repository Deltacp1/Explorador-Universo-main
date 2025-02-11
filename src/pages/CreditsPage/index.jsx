import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

import BackButton from '../../components/BackButton';
import NextButton from '../../components/NextButton';

import { story } from '../../utils/story';

export default function CreditsPage() {
  const [scrollPosition, setScrollPosition] = useState(100);
  const navigate = useNavigate();

  // Função que vai retornar para o menu inicial
  const handleToMainMenu = () => {
    navigate('/');
  };

  // Animação de rolagem dos créditos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setScrollPosition((prevPosition) => prevPosition - 1);
    }, 20); // Velocidade da rolagem

    // Limpa o intervalo ao desmontar
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={styles.creditsContainer}>
        <div
          className={styles.creditsContent}
          style={{ transform: `translateY(${scrollPosition}%)` }}
        >
          <h1 className={styles.teamName}>{story.credits.team}</h1>
          <p className={styles.slogan}>
            {story.credits.slogan}
          </p>
        </div>
      </div>

      <NextButton
        text={'Voltar ao Menu Inicial'}
        onClick={handleToMainMenu}
      />
    </>
  );
}
