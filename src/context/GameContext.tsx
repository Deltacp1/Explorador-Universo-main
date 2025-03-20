import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our quiz game
export type GameMode = 'story' | 'tournament' | null;

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
}

export interface Class {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  createdAt: Date;
}

interface GameContextType {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  classId: string;
  setClassId: (id: string) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player | null) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  gameFinished: boolean;
  setGameFinished: (finished: boolean) => void;
  resetGame: () => void;
  // Admin related state
  classes: Class[];
  setClasses: (classes: Class[]) => void;
  addClass: (newClass: Omit<Class, 'id' | 'createdAt'>) => void;
  updateClass: (classId: string, updatedClass: Partial<Class>) => void;
  deleteClass: (classId: string) => void;
  addQuestionToClass: (classId: string, question: Omit<Question, 'id'>) => void;
  updateQuestion: (
    classId: string,
    questionId: string,
    updatedQuestion: Partial<Question>
  ) => void;
  deleteQuestion: (classId: string, questionId: string) => void;
  getClassById: (classId: string) => Class | undefined;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Sample questions
const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
  },
  {
    id: '2',
    text: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
    correctAnswer: 2,
  },
  {
    id: '3',
    text: 'What is the name of the galaxy that contains our solar system?',
    options: ['Andromeda', 'Milky Way', 'Triangulum', 'Sombrero'],
    correctAnswer: 1,
  },
  {
    id: '4',
    text: 'How many planets are in our solar system?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 1,
  },
  {
    id: '5',
    text: 'Which of these is NOT a moon of Jupiter?',
    options: ['Europa', 'Ganymede', 'Titan', 'Callisto'],
    correctAnswer: 2,
  },
];

// Sample players for the tournament leaderboard
const samplePlayers: Player[] = [
  {
    id: '1',
    name: 'Cosmic Explorer',
    score: 1200,
    correctAnswers: 4,
    totalAnswers: 5,
  },
  {
    id: '2',
    name: 'Star Traveler',
    score: 1050,
    correctAnswers: 3,
    totalAnswers: 5,
  },
  {
    id: '3',
    name: 'Galaxy Ranger',
    score: 900,
    correctAnswers: 3,
    totalAnswers: 5,
  },
  {
    id: '4',
    name: 'Nebula Navigator',
    score: 800,
    correctAnswers: 2,
    totalAnswers: 5,
  },
  {
    id: '5',
    name: 'Comet Chaser',
    score: 700,
    correctAnswers: 2,
    totalAnswers: 5,
  },
];

// Sample classes
const sampleClasses: Class[] = [
  {
    id: 'SPACE101',
    name: 'Introduction to Space',
    description: 'Learn the basics of our solar system',
    questions: sampleQuestions,
    createdAt: new Date(),
  },
];

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [classId, setClassId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>(samplePlayers);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [classes, setClasses] = useState<Class[]>(sampleClasses);

  const resetGame = () => {
    setGameMode(null);
    setClassId('');
    setCurrentQuestionIndex(0);
    setGameStarted(false);
    setGameFinished(false);
    // Keep player name and player data for persistence
  };

  // Admin functions
  const addClass = (newClass: Omit<Class, 'id' | 'createdAt'>) => {
    const id = generateClassId();
    setClasses((prevClasses) => [
      ...prevClasses,
      {
        ...newClass,
        id,
        createdAt: new Date(),
      },
    ]);
    return id;
  };

  const updateClass = (classId: string, updatedClass: Partial<Class>) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === classId ? { ...cls, ...updatedClass } : cls
      )
    );
  };

  const deleteClass = (classId: string) => {
    setClasses((prevClasses) =>
      prevClasses.filter((cls) => cls.id !== classId)
    );
  };

  const addQuestionToClass = (
    classId: string,
    question: Omit<Question, 'id'>
  ) => {
    const questionId = generateId();
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id === classId) {
          return {
            ...cls,
            questions: [...cls.questions, { ...question, id: questionId }],
          };
        }
        return cls;
      })
    );
    return questionId;
  };

  const updateQuestion = (
    classId: string,
    questionId: string,
    updatedQuestion: Partial<Question>
  ) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id === classId) {
          return {
            ...cls,
            questions: cls.questions.map((q) =>
              q.id === questionId ? { ...q, ...updatedQuestion } : q
            ),
          };
        }
        return cls;
      })
    );
  };

  const deleteQuestion = (classId: string, questionId: string) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id === classId) {
          return {
            ...cls,
            questions: cls.questions.filter((q) => q.id !== questionId),
          };
        }
        return cls;
      })
    );
  };

  const getClassById = (classId: string) => {
    return classes.find((cls) => cls.id === classId);
  };

  // Helper to generate unique IDs
  const generateId = () => {
    return Math.random().toString(36).substring(2, 11);
  };

  // Helper to generate a class ID (uppercase letters and numbers)
  const generateClassId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  return (
    <GameContext.Provider
      value={{
        gameMode,
        setGameMode,
        classId,
        setClassId,
        playerName,
        setPlayerName,
        players,
        setPlayers,
        currentPlayer,
        setCurrentPlayer,
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        gameStarted,
        setGameStarted,
        gameFinished,
        setGameFinished,
        resetGame,
        // Admin functions
        classes,
        setClasses,
        addClass,
        updateClass,
        deleteClass,
        addQuestionToClass,
        updateQuestion,
        deleteQuestion,
        getClassById,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
