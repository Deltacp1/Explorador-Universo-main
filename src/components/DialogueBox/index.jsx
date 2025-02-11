
import { useEffect } from 'react';
import styles from './styles.module.css';

export default function DialogueBox({ title, text, link }) {

  const handleRedirect = () => {
    window.location.href = "https://eyes.nasa.gov/apps/exo/";
  };

  return (
    <div className={styles['dialogue-box']}>
      <p 
        style={{ fontWeight: 'bold' }}
        className={styles.title}
      >
        {title}
      </p>
      <p className={styles.description}>{text}</p>
      {
        link && 
        <a 
          target="_blank"
          href={link} 
          onClick={() => handleRedirect}
          className={styles.link}
        >
          Click here
        </a>
      }
    </div>
  );
}

