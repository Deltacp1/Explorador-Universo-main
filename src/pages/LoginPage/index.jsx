'use client';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onStart }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Navigate to game mode selection instead of directly to prologue
    navigate('/game-mode');
  };

  return (
    <div className={styles['login-container']}>
      <h1 className={styles['login-title']}>EXPLORADOR DO UNIVERSO</h1>
      <button className={styles['login-button']} onClick={handleStart}>
        <h2>{' INICIAR '}</h2>
      </button>
    </div>
  );
};

export default LoginPage;
