import styles from './styles.module.css';
import DialogueBox from '../../components/DialogueBox';
import NextButton from '../../components/NextButton';
import { story } from '../../utils/story';
import { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';

import { useNavigate } from 'react-router-dom';


export default function StoryPage() {
  // Carrega o índice da história do localStorage (ou usa 0 se não houver)
  const savedIndex = localStorage.getItem('storyIndex') 
    ? parseInt(localStorage.getItem('storyIndex')) 
    : 0;
  const [storyIndex, setStoryIndex] = useState(savedIndex);

  // Carrega o índice do capítulo do localStorage (ou usa 0 se não houver)
  const savedChapter = localStorage.getItem('chapterIndex') 
    ? parseInt(localStorage.getItem('chapterIndex')) 
    : 0;
  const [storyChapter, setStoryChapter] = useState(savedChapter);

  const navigate = useNavigate();

  const [link, setLink] = useState(undefined);

  const changeStoryIndex = (newIndex) => {
    setStoryIndex(newIndex);
    const minigame = story.chapters[storyChapter].conversations[newIndex].minigame;
    const link = story.chapters[storyChapter].conversations[newIndex].link;

    if(minigame != undefined) {
      console.log("minigame:", minigame);
      navigate('/minigame', {
        state: {
          minigame: minigame
        }
      });
    }

    if(link != undefined) {
      setLink(link);
    }

    // Salva o progresso no localStorage
    localStorage.setItem('storyIndex', newIndex);
  }

  // Função para atualizar o índice e salvar no localStorage
  const changeBackStoryIndex = () => {
    let newIndex = storyIndex - 1;

    if (newIndex >= 0) {
      changeStoryIndex(newIndex);
    } else {
      let newChapter = storyChapter - 1;
      newIndex = story.chapters[storyChapter - 1].conversations.length - 1;

      if(newChapter >= 0) {
        changeStoryIndex(newIndex);

        setStoryChapter(newChapter);
        localStorage.setItem('chapterIndex', newChapter);
        
        navigate('/chapter', {
          state: {
            chapterName: story.chapters[newChapter].chapterName,
            chapterIndex: newChapter,
          }
        });
      }
    }
  };

  // Função para atualizar o índice e salvar no localStorage
  const changeNextStoryIndex = () => {

    let newIndex = storyIndex + 1;
    if (newIndex < story.chapters[storyChapter].conversations.length) {
      changeStoryIndex(newIndex);

    } else {
      newIndex = 0;
      let newChapter = storyChapter + 1;

      if(newChapter < story.chapters.length) {
        changeStoryIndex(newIndex);

        setStoryChapter(newChapter);
        localStorage.setItem('chapterIndex', newChapter); 

        navigate('/chapter', {
          state: {
            chapterName: story.chapters[newChapter].chapterName,
            chapterIndex: newChapter,
          }
        });
      } else {
        navigate('/credits')
      }
    }
  };

  // Função para carregar o progresso ao iniciar a página
  useEffect(() => {
    const storedIndex = localStorage.getItem('storyIndex');
    const storedChapter = localStorage.getItem('chapterIndex');
    if (storedIndex) {
      setStoryIndex(parseInt(storedIndex));
    }
    if (storedChapter) {
      setStoryChapter(parseInt(storedChapter));
    }
  }, []);

  useEffect(() => {
    const characterImg = document.querySelector(`.${styles.characterImg}`);
    characterImg.classList.remove(styles.loaded);
    characterImg.classList.add(styles.exiting);
    
    setTimeout(() => {
      characterImg.classList.remove(styles.exiting);
      characterImg.classList.add(styles.loaded);
    }, 100);
  }, [storyIndex]);

  useEffect(() => {
    const backgroundDiv = document.querySelector(`.${styles.background}`);
    backgroundDiv.classList.remove(styles.loaded);
    backgroundDiv.classList.add(styles.exiting);
    
    setTimeout(() => {
      backgroundDiv.classList.remove(styles.exiting);
      backgroundDiv.classList.add(styles.loaded);
    }, 100);
  }, [storyIndex]);


  return (
    <div className={styles.App}>
      <div 
        className={styles.background} 
        style={{ 
          // Define a imagem de fundo dinamicamente
          backgroundImage: `url(
            ${story.chapters[storyChapter].conversations[storyIndex].backgroundImage}
          )`, 
          backgroundSize: 'cover',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',

          position: 'relative',
          bottom: 40,
        }}
      >
        <div className={styles.character}>
          <img 
            // Define a imagem do personagem dinamicamente
            src={story.chapters[storyChapter].conversations[storyIndex].characterImage}
            alt="Character" 
            className={styles.characterImg}
          />
        </div>
        
        <DialogueBox 
          title={story.chapters[storyChapter].conversations[storyIndex].title}
          text={story.chapters[storyChapter].conversations[storyIndex].description}
          link={link}
        />
      </div>

      {/* 
      <BackButton 
        text={'Back'}
        onClick={changeBackStoryIndex}
      /> 
      */}
      <NextButton 
        text={'Next'}
        onClick={changeNextStoryIndex}
      />
    </div>
  );
}
