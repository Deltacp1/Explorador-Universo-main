import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import TransitMethodGame from '../MiniGames/TransitMethodGame';
import TriviaMethodGame from './TriviaMethodGame';

import styles from './styles.module.css';

export default function MiniGames() {
  const location = useLocation();
  const [currentMinigame, setCurrentMinigame] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    // Atualiza o estado quando o minigame mudar na URL
    if (location.state && location.state.minigame !== undefined) {
      setCurrentMinigame(location.state.minigame);
    }
  }, [location]);

  return (
    <>
      {currentMinigame === 0 && <TransitMethodGame />}
      {currentMinigame === 1 && <TriviaMethodGame />}
      {
        currentMinigame == undefined && 
        <>
          <p>Nenhum minigame disponível</p>
          <button onClick={() => navigate('/history')}>
            Ok
          </button>
        </>
      }
    </>
  );
}
