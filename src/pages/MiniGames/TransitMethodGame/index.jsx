import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// Função para gerar luminosidade randomicamente para os corpos normais
function getRandomLuminosity() {
  // Luminosidade varia entre 80 e 100
  return Math.random() * 10 + 90;
}

function TransitMethodGame() {
  const maximumScore = 2;
  const navigate = useNavigate();

  const [luminosityGroup, setLuminosityGroup] = useState([]);
  const [score, setScore] = useState(0);
  const [correctBody, setCorrectBody] = useState(null);
  const [blinkingLuminosity, setBlinkingLuminosity] = useState(100);
  const [positions, setPositions] = useState([]);
  const [message, setMessage] = useState({ text: '', visible: false });

  const initializeGame = () => {
    const group = [];
    const newPositions = [];
    for (let i = 0; i < 15; i++) {
      group.push(getRandomLuminosity());
      newPositions.push({
        left: Math.random() * 90 + 'vw',
        top: Math.random() * 30 + 'vh',
      });
    }

    const randomBody = Math.floor(Math.random() * 8);
    group[randomBody] = 100;

    setLuminosityGroup(group);
    setCorrectBody(randomBody);
    setPositions(newPositions);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval;
    if (correctBody !== null) {
      interval = setInterval(() => {
        setBlinkingLuminosity((prevLuminosity) =>
          prevLuminosity === 100 ? Math.random() * 5 + 55 : 100
        );
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [correctBody]);

  const showMessage = (text) => {
    setMessage({ text, visible: true });
    setTimeout(() => {
      setMessage({ text: '', visible: false });
      initializeGame();
    }, 2000); // A mensagem desaparece após 2 segundos
  };

  const handleClick = (bodyIndex) => {
    if (bodyIndex === correctBody) {
      setScore(score + 1);
      showMessage('Você acertou! Um possível exoplaneta foi detectado!');
      if (score + 1 >= maximumScore) {
        navigate('/history');
      }
    } else {
      showMessage('Tente novamente. O escolhido não contém um exoplaneta.');
    }
  };

  return (
    <div style={styles.background}>
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
              opacity:
                bodyIndex === correctBody
                  ? blinkingLuminosity / 100
                  : luminosity / 100,
              backgroundImage: 'url(public/MinigameTransito/star_game1.png)',
            }}
          ></div>
        ))}
      </div>
      <p style={{ color: 'white' }}>Score: {`${score}/${maximumScore}`}</p>
      {message.visible && <div style={styles.messageBox}>{message.text}</div>}
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'url(public/MinigameTransito/background_game1.webp)',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  groupContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  body: {
    cursor: 'pointer',
    width: '60px',
    height: '60px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    border: 'none',
  },
  messageBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(16, 12, 73, 0.8)',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    zIndex: 1000,
  },
};

export default TransitMethodGame;
