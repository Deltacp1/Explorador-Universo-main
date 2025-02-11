
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// Função para gerar luminosidade randomicamente para os corpos normais
function getRandomLuminosity() {
  // Luminosidade varia entre 80 e 100
  return Math.random() * 10 + 90;
}

function TransitMethodGame() {

  const maximumScore = 5;
  const navigate = useNavigate();

  const [luminosityGroup, setLuminosityGroup] = useState([]);
  // Pontuação do jogador
  const [score, setScore] = useState(0);
  // Índice do corpo correto (contém o exoplaneta)
  const [correctBody, setCorrectBody] = useState(null);
  // Luminosidade que pisca do exoplaneta
  const [blinkingLuminosity, setBlinkingLuminosity] = useState(100); 
  // Posições randomizadas das estrelas
  const [positions, setPositions] = useState([]); 

  // Função que inicializa o jogo
  const initializeGame = () => {
    const group = [];
    const newPositions = [];
    for (let i = 0; i < 15; i++) {
      group.push(getRandomLuminosity());
      newPositions.push({
        // Posição horizontal aleatória (máximo de 90vw)
        left: Math.random() * 90 + 'vw',
        // Posição vertical aleatória na parte de cima da tela (máximo de 30vh) 
        top: Math.random() * 30 + 'vh', 
      });
    }

    // Definimos um corpo aleatório que terá o efeito de trânsito (exoplaneta piscando)
    const randomBody = Math.floor(Math.random() * 8);
    // Definimos inicialmente a luminosidade do exoplaneta (máxima, antes de piscar)
    group[randomBody] = 100;
    
    setLuminosityGroup(group);
    setCorrectBody(randomBody); // Salvamos qual corpo tem o exoplaneta
    setPositions(newPositions); // Salvamos as posições aleatórias
  };

  // Inicializamos o jogo ao carregar o componente
  useEffect(() => {
    initializeGame();
  }, []);

  // Função para simular o "piscar" do exoplaneta com periodicidade
  useEffect(() => {
    let interval;
    if (correctBody !== null) {
      interval = setInterval(() => {
        // Alterna a luminosidade do corpo exoplaneta entre 100 e 75-80 (simulando o trânsito)
        setBlinkingLuminosity(prevLuminosity => 
          prevLuminosity === 100 ? Math.random() * 5 + 55 : 100
        );
      }, 1000); // Pisca a cada 1 segundo
    }

    return () => clearInterval(interval);
  }, [correctBody]);

  const handleClick = (bodyIndex) => {
    // Verificamos se o jogador clicou no corpo correto
    if (bodyIndex === correctBody) {
      setScore(score + 1);
      alert("You got it right! A possible exoplanet has been detected!");
      if((score + 1) >= maximumScore) {
        navigate('/history');
      }
    } else {
      alert("Try again. This one doesn't contain an exoplanet.");
    }

    // Reinicializamos o jogo após cada tentativa
    initializeGame();
  };

  return (
    <div style={styles.background}>
      {/* Renderizando o grupo de 8 corpos */}
      <div style={styles.groupContainer}>
        {luminosityGroup.map((luminosity, bodyIndex) => (
          <div
            key={bodyIndex}
            onClick={() => handleClick(bodyIndex)}
            style={{
              ...styles.body,
              position: 'absolute',
              left: positions[bodyIndex]?.left,
              top: positions[bodyIndex]?.top,
              opacity: bodyIndex === correctBody ? blinkingLuminosity / 100 : luminosity / 100,
              // Substitua com o caminho da sua imagem de estrela
              backgroundImage: 'url(src/assets/MinigameTransito/star_game1.png)', 
            }}
          ></div>
        ))}
      </div>
      <p style={{ color: 'white' }}>Score: {`${score}/${maximumScore}`}</p>
    </div>
  );
}


const styles = {
  background: {
    // Imagem de fundo
    backgroundImage: 'url(src/assets/MinigameTransito/background_game1.webp)',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // Necessário para que os corpos sejam posicionados de forma absoluta
    position: 'relative',
  },
  groupContainer: {
    position: 'relative',
    width: '100%',
    // O container cobre toda a tela
    height: '100%',
  },
  body: {
    cursor: 'pointer',
    width: '60px',
    height: '60px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    // Removendo borda
    border: 'none',
  },
};

export default TransitMethodGame;