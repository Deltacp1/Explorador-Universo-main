// Dados dos planetas
export const PLANETS = [
  {
    id: 'mercury',
    name: 'Mercúrio',
    gravity: 3.7, // m/s²
    color: '#A9A9A9',
    description: 'O menor planeta do Sistema Solar e o mais próximo do Sol.',
  },
  {
    id: 'venus',
    name: 'Vênus',
    gravity: 8.87,
    color: '#E6B87C',
    description:
      'Semelhante à Terra em tamanho e massa, mas com uma atmosfera densa e tóxica.',
  },
  {
    id: 'earth',
    name: 'Terra',
    gravity: 9.81,
    color: '#4B92DB',
    description: 'Nosso planeta natal, o único conhecido a abrigar vida.',
  },
  {
    id: 'moon',
    name: 'Lua',
    gravity: 1.62,
    color: '#D0D0D0',
    description:
      'O único satélite natural da Terra e o corpo celeste mais próximo de nós.',
  },
  {
    id: 'mars',
    name: 'Marte',
    gravity: 3.71,
    color: '#E27B58',
    description:
      "O 'Planeta Vermelho', com uma fina atmosfera e calotas polares.",
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    gravity: 24.79,
    color: '#E0A96D',
    description:
      'O maior planeta do Sistema Solar, um gigante gasoso com muitas luas.',
  },
];

// Tipos de objetos para lançamento
export const OBJECTS = [
  {
    id: 'ball',
    name: 'Bola',
    mass: 1,
    radius: 15,
    color: '#FFFFFF',
    bounciness: 0.8,
  },
  {
    id: 'rock',
    name: 'Rocha',
    mass: 2.5,
    radius: 20,
    color: '#A0522D',
    bounciness: 0.4,
  },
  {
    id: 'feather',
    name: 'Pena',
    mass: 0.1,
    radius: 12,
    color: '#F5F5DC',
    bounciness: 0.9,
  },
  {
    id: 'metal',
    name: 'Metal',
    mass: 5,
    radius: 18,
    color: '#C0C0C0',
    bounciness: 0.3,
  },
];
