import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import NextButton from '../../components/NextButton';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';

import bg0 from '../../assets/StoryPage/bg/bg1.png';
import bg1 from '../../assets/StoryPage/bg/bg3.jpg';
import bg2 from '../../assets/StoryPage/bg/bg9.png';
import bg3 from '../../assets/StoryPage/bg/bg13.png';
import bg4 from '../../assets/StoryPage/bg/bg21.png';

function repeatSecondCharacter(str) {
  if (str.length < 2) {
    return str;
  }
  const secondChar = str[1];
  const newString = str[0] + secondChar + secondChar + str.slice(2);
  return newString;
}

export default function ChapterPage({ name }) {

  const location = useLocation();
  const { chapterName, chapterIndex } = location.state || {};

  const [displayedName, setDisplayedName] = useState('');  
  const [completedName, setCompletedName] = useState(
    repeatSecondCharacter(chapterName)
  );
  const [backgroundImage, setBackgroundImage] = useState(bg0);

  const navigate = useNavigate();

  const handleToStoryPage = () => {
    navigate('/history');
  }

  useEffect(() => {
    if(chapterIndex == 0) {
      setBackgroundImage(bg0);

    } else if (chapterIndex == 1) {
      setBackgroundImage(bg1);
      
    } else if (chapterIndex == 2) {
      setBackgroundImage(bg2);

    } else if (chapterIndex == 3) {
      setBackgroundImage(bg3);

    } else if (chapterIndex == 4) {
      setBackgroundImage(bg4);

    } else {
      setBackgroundImage(bg0);
    }
  }, [chapterIndex])

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < (completedName.length - 1)) {
        setDisplayedName((prev) => prev + completedName[currentIndex]); 
        currentIndex++;
      } else {
        clearInterval(intervalId);  
      }
    }, 100); // Velocidade da digitação em milissegundos

    return () => clearInterval(intervalId);  
  }, [completedName]);

  return (
    <>
      <div className={styles.App}>
        <div 
          className={styles.background} 
          style={{
            // Definindo a imagem de fundo aqui
            backgroundImage: `url(${
              backgroundImage
            })`, 
            // Fazendo com que a imagem cubra todo o div
            backgroundSize: 'cover', 
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className={styles.contentContainer}>
            <h2 className={styles.name}>{displayedName}</h2>
          </div>
        </div>
      </div>

      {/* 
      <BackButton
        text={'Back'}
        onClick={handleToStoryPage}
      />
      */}
      <NextButton 
        text={'Next'}
        onClick={handleToStoryPage}
      />
    </>
  );
}
