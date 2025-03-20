// Dados dos planetas
export const PLANETS = [
  {
    id: 'mercury',
    name: 'Mercúrio',
    color: '#A9A9A9',
    size: 0.38, // Tamanho relativo (Terra = 1)
    distance: 0.39, // Distância relativa ao Sol (UA)
    orbitSpeed: 4.74, // Velocidade orbital relativa (Terra = 1)
    rotationSpeed: 0.017, // Velocidade de rotação relativa (Terra = 1)
    tilt: 0.03, // Inclinação do eixo em radianos
    description: 'O menor planeta do Sistema Solar e o mais próximo do Sol.',
  },
  {
    id: 'venus',
    name: 'Vênus',
    color: '#E6B87C',
    size: 0.95,
    distance: 0.72,
    orbitSpeed: 3.5,
    rotationSpeed: 0.004, // Rotação retrógrada
    tilt: 3.1, // Quase 180 graus (rotação retrógrada)
    description:
      'Semelhante à Terra em tamanho e massa, mas com uma atmosfera densa e tóxica.',
  },
  {
    id: 'earth',
    name: 'Terra',
    color: '#4B92DB',
    size: 1,
    distance: 1,
    orbitSpeed: 1,
    rotationSpeed: 1,
    tilt: 0.41, // 23.5 graus
    description: 'Nosso planeta natal, o único conhecido a abrigar vida.',
  },
  {
    id: 'mars',
    name: 'Marte',
    color: '#E27B58',
    size: 0.53,
    distance: 1.52,
    orbitSpeed: 0.8,
    rotationSpeed: 0.97,
    tilt: 0.44, // 25 graus
    description:
      "O 'Planeta Vermelho', com uma fina atmosfera e calotas polares.",
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    color: '#E0A96D',
    size: 11.2,
    distance: 5.2,
    orbitSpeed: 0.43,
    rotationSpeed: 2.4,
    tilt: 0.05, // 3 graus
    description:
      'O maior planeta do Sistema Solar, um gigante gasoso com muitas luas.',
  },
  {
    id: 'saturn',
    name: 'Saturno',
    color: '#F4D03F',
    size: 9.45,
    distance: 9.58,
    orbitSpeed: 0.32,
    rotationSpeed: 2.3,
    tilt: 0.47, // 27 graus
    description:
      'Famoso por seus anéis, é o segundo maior planeta do Sistema Solar.',
  },
  {
    id: 'uranus',
    name: 'Urano',
    color: '#A3E4D7',
    size: 4.0,
    distance: 19.2,
    orbitSpeed: 0.23,
    rotationSpeed: 1.4,
    tilt: 1.71, // 98 graus (rotação lateral)
    description:
      "Um gigante de gelo com uma inclinação extrema, fazendo-o 'rolar' em sua órbita.",
  },
  {
    id: 'neptune',
    name: 'Netuno',
    color: '#5DADE2',
    size: 3.88,
    distance: 30.05,
    orbitSpeed: 0.18,
    rotationSpeed: 1.5,
    tilt: 0.51, // 29 graus
    description:
      'O planeta mais distante, com ventos extremamente fortes e uma cor azul vibrante.',
  },
];
