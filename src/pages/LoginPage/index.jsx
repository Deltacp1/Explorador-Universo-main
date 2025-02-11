import React from 'react';
import styles from './styles.module.css';

import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onStart }) => {

  const navigate = useNavigate();

  const handleToStoryPage = () => {
    localStorage.setItem('prologueIndex', 0); 
    localStorage.setItem('chapterIndex', 0); 
    localStorage.setItem('storyIndex', 0);

    navigate('/prologue');
  }

  return (
    <div className={styles['login-container']}>
      <h1 className={styles['login-title']}>T.A.R.D.I.S</h1>
      <button className={styles['login-button']} onClick={handleToStoryPage}>
        <h2>{"PRESS START"}</h2>
      </button>
    </div>
  );
};

export default LoginPage;