import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '/MinigameTrivia/background_gameTrivia.webp';

const quizData = [
  {
    question:
      'O efeito Doppler é um fenômeno relacionado à mudança na frequência de uma onda devido ao movimento relativo entre a fonte e o observador.',
    correctAnswer: 'Verdadeiro',
    options: ['Verdadeiro', 'Falso'],
  },
  {
    question:
      'Um exoplaneta é um planeta que orbita uma estrela de fora do nosso sistema solar.',
    correctAnswer: 'Verdadeiro',
    options: ['Verdadeiro', 'Falso'],
  },
  {
    question:
      'O exoplaneta mais próximo da Terra está a 4.24 anos-luz de distância.',
    correctAnswer: 'Verdadeiro',
    options: ['Verdadeiro', 'Falso'],
  },
  {
    question: 'Todos os exoplanetas descobertos até agora são habitáveis.',
    correctAnswer: 'Falso',
    options: ['Verdadeiro', 'Falso'],
  },
];

// Componente principal do mini-jogo de trivia
function TriviaMethodGame() {
  const navigate = useNavigate();

  // Índice da pergunta atual
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Pontuação do jogador
  const [score, setScore] = useState(0);
  // Verifica se o jogador já respondeu a pergunta
  const [answered, setAnswered] = useState(false);
  // Opção escolhida pelo jogador
  const [selectedOption, setSelectedOption] = useState('');

  // Função chamada quando o jogador seleciona uma resposta
  const handleOptionClick = (option) => {
    // Impede que a pergunta seja respondida mais de uma vez
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);

    // Verifica se a resposta está correta
    if (option === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      alert('Muito bem!! Você Acertou!!');
    } else {
      alert('Não foi dessa vez!');
    }
  };

  // Função para passar para a próxima pergunta
  const handleNextQuestion = () => {
    setSelectedOption('');
    setAnswered(false);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Fim de Jogo! Sua pontuação final é: ${score}/${quizData.length}`);
      navigate('/history');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.questionContainer}>
          <h2 style={{ color: 'white' }}>
            Question {currentQuestionIndex + 1} of {quizData.length}
          </h2>
          <p style={{ color: 'white', fontSize: '1.2rem' }}>
            {quizData[currentQuestionIndex].question}
          </p>
        </div>

        {/* Opções de resposta */}
        <div style={styles.optionsContainer}>
          {quizData[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              style={{
                ...styles.optionButton,
                backgroundColor: selectedOption === option ? '#ccc' : '#fff',
              }}
              onClick={() => handleOptionClick(option)}
            >
              <p>{option}</p>
            </button>
          ))}
        </div>

        {/* Botão para avançar para a próxima pergunta */}
        {answered && (
          <button style={styles.nextButton} onClick={handleNextQuestion}>
            <p>Próxima</p>
          </button>
        )}

        {/* Exibição da pontuação */}
        <p style={{ color: 'white', marginTop: '20px' }}>Score: {score}</p>
      </div>
    </div>
  );
}

const styles = {
  background: {
    // Substitua pelo caminho correto do fundo
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: '20px',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  optionButton: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    color: '#000',
  },
  nextButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default TriviaMethodGame;
