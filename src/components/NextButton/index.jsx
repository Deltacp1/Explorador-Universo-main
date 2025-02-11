
import styles from './styles.module.css';

export default function NextButton({ text, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={styles.button}
    >
      <p>{text}</p>
    </button>
  );
}

