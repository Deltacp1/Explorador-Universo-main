import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import NextButton from '../../components/NextButton';
import BackButton from '../../components/BackButton';
import { story } from '../../utils/story';
import { useNavigate } from 'react-router-dom';

function repeatSecondCharacter(str) {
  if (str.length < 2) {
    return str;
  }
  const secondChar = str[1];
  const newString = str[0] + secondChar + secondChar + str.slice(2);
  return newString;
}

export default function DescriptionPage() {

  const navigate = useNavigate();

  // Estado para o texto sendo "digitado"
  const [displayedText, setDisplayedText] = useState(''); 

  // Estado para o índice da história, inicializando com o valor do localStorage, se existir
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem('prologueIndex');

    localStorage.setItem('storyIndex', 0); 
    localStorage.setItem('chapterIndex', 0); 

    // Converte para número se existir, ou começa do zero
    return savedIndex !== null ? parseInt(savedIndex) : 0;
  });

  const [completedName, setCompletedName] = useState(repeatSecondCharacter(story.prologue[currentIndex]));

  // Atualiza o índice para voltar ao texto anterior
  const handleToBackPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Atualiza o índice para avançar ao próximo texto
  const handleToNextPage = () => {
    if (currentIndex < story.prologue.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate('/history');
    }
  };

  // Efeito que cuida da digitação de cada texto
  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(''); 

    const intervalId = setInterval(() => {
      if (currentIndex < (completedName.length - 1)) {
        setDisplayedText((prev) => prev + completedName[currentIndex]); 
        currentIndex++;
      } else {
        clearInterval(intervalId);  
      }
    }, 50); // Velocidade da digitação em milissegundos

    return () => clearInterval(intervalId);  
  }, [completedName]);

  // Atualiza o texto e salva o progresso no localStorage quando o índice atual é alterado
  useEffect(() => {
    setCompletedName(repeatSecondCharacter(story.prologue[currentIndex]));
    // Salva o índice no localStorage
    localStorage.setItem('prologueIndex', currentIndex);
  }, [currentIndex]);

  return (
    <>
      <div className={styles.App}>
        <div className={styles.background}>
          <div className={styles.contentContainer}>
            <h2 className={styles.name}>{displayedText}</h2>
          </div>
        </div>
      </div>

      {/* 
      <BackButton
        text={'Back'}
        onClick={handleToBackPage}
      /> 
      */}
      <NextButton 
        text={'Next'}
        onClick={handleToNextPage}
      />
    </>
  );
}
