import { useEffect, useRef } from 'react';

import music from '../../assets/music/background.mp3';

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        // Tenta tocar o áudio
        audioRef.current.play().catch(() => {
          // Se falhar, aguarda a interação do usuário
          window.addEventListener('click', playAfterInteraction);
          window.addEventListener('keydown', playAfterInteraction);
        });
      }
    };

    const playAfterInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play();
        // Remove os listeners após a primeira interação
        window.removeEventListener('click', playAfterInteraction);
        window.removeEventListener('keydown', playAfterInteraction);
      }
    };

    // Tenta tocar o áudio ao carregar a página
    playAudio();

    return () => {
      // Limpa os event listeners ao desmontar o componente
      window.removeEventListener('click', playAfterInteraction);
      window.removeEventListener('keydown', playAfterInteraction);
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
