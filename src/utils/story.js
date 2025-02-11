import bg0 from '../assets/StoryPage/bg/bg0.png';
import bg1 from '../assets/StoryPage/bg/bg1.png';
import bg2 from '../assets/StoryPage/bg/bg2.png';
import bg2_1 from '../assets/StoryPage/bg/bg2-1.png';
import bg3 from '../assets/StoryPage/bg/bg3.jpg';
import bg4 from '../assets/StoryPage/bg/bg4.png';
import bg5 from '../assets/StoryPage/bg/bg5.png';
import bg5_1 from '../assets/StoryPage/bg/bg5-1.png';
import bg6 from '../assets/StoryPage/bg/bg6.png';
import bg7 from '../assets/StoryPage/bg/bg7.png';
import bg8 from '../assets/StoryPage/bg/bg8.png';
import bg9 from '../assets/StoryPage/bg/bg9.png';
import bg10_1 from '../assets/StoryPage/bg/bg10-1.png';
import bg10_2 from '../assets/StoryPage/bg/bg10-2.png';
import bg11 from '../assets/StoryPage/bg/bg11.png';
import bg12 from '../assets/StoryPage/bg/bg12.png';
import bg13 from '../assets/StoryPage/bg/bg13.png';
import bg14 from '../assets/StoryPage/bg/bg14.png';
import bg15 from '../assets/StoryPage/bg/bg15.png';
import bg16 from '../assets/StoryPage/bg/bg16.png';
import bg17 from '../assets/StoryPage/bg/bg17.png';
import bg18 from '../assets/StoryPage/bg/bg18.png';
import bg19 from '../assets/StoryPage/bg/bg19.png';
import bg20 from '../assets/StoryPage/bg/bg20.png';
import bg21 from '../assets/StoryPage/bg/bg21.png';
import bg22 from '../assets/StoryPage/bg/bg22.png';

import character1 from '../assets/StoryPage/character1.png';
import character2 from '../assets/StoryPage/character2.png';
import character3 from '../assets/StoryPage/character3.png';

export const story = {
  title: "O destino além das estrelas: A missão que mudou tudo.",
  prologue: [
    `     O ano é 2147. A Terra está passando por momentos difíceis. Os recursos naturais estão quase esgotados e a humanidade precisa encontrar um novo lar para sobreviver.`,
    `     A última esperança vem com a descoberta de exoplanetas, mundos orbitando estrelas distantes que poderiam ser habitáveis. Você faz parte da tripulação da nave Stella Explorer, liderada pelo corajoso Capitão Aurora.`,
    `     Sua missão: encontrar um novo lar para a humanidade entre as estrelas...`
  ],
  chapters: [
    {
      chapter: 0,
      chapterName: "     Capítulo 1: A grande decisão",
      conversations: [
        {
          title: "Partida",
          description: `Você está na sala de comando da nave, olhando para a Terra pela última vez. A capitã Aurora convoca a tripulação para uma reunião. "A Terra está em perigo. Precisamos encontrar um planeta habitável e rápido!"`,
          backgroundImage: bg2,
          characterImage: character1,
        },
        {
          title: "Partida",
          description: `Dr. Orion, a cientista lider da tripulação, explica: "A nave Stella Explorer tem um sensor que detecta exoplanetas orbitando estrelas distantes. Se voce conseguir encontrar um, podemos encontrar um novo lar para a humanidade.`,
          backgroundImage: bg2,
          characterImage: character2,
        },
        {
          title: "Partida",
          description: `Prepare-se para uma jornada incrível onde você descobrirá os segredos dos exoplanetas.`,
          backgroundImage: bg2_1,
          characterImage: character3,
        },
      ],
    },
    {
      chapter: 1,
      chapterName: "    Capítulo 2: O primeiro planeta",
      conversations: [
        {
          title: "O que são Exoplanetas",
          description: `Os exoplanetas são como os planetas que conhecemos, como Terra, Marte e Júpiter. Mas a diferença é que orbitam outras estrelas.`,
          backgroundImage: bg4,
          characterImage: character3,
        },
        {
          title: "O que são Exoplanetas",
          description: `Cada exoplaneta é único! Eles podem ser enormes, como Júpiter, ou pequenos, como a Terra. Eles são classificados com base em sua composição, tamanho e até mesmo se podem sustentar vida.`,
          backgroundImage: bg4,
          characterImage: character3,
        },
        {
          title: "O Metodo Transiente",
          description: `Você chega ao primeiro sistema estelar. Os sensores começam a detectar variações no brilho da estrela à frente.`,
          backgroundImage: bg5_1,
          characterImage: character3,
        },
        {
          title: "O Metodo Transiente",
          description: `Dr. Orion: "Quando um planeta passa na frente de uma estrela, ele bloqueia parte da luz. Isso é chamado de trânsito. Podemos descobrir planetas desta forma."`,
          backgroundImage: bg5,
          characterImage: character2,
        },
        {
          title: "Características dos Exoplanetas",
          description: `Você observa o gráfico de brilho e confirma: um gigante gasoso foi descoberto. Mas, infelizmente, este planeta não é habitável. Capitão Aurora sorri: “Ainda não é o que procuramos, mas estamos no caminho certo!”`,
          backgroundImage: bg7,
          characterImage: character1,
          minigame: 0,
        },
        {
          title: "Características dos Exoplanetas",
          description: `"Devíamos nomear a nossa descoberta, mas como é que os exoplanetas recebem os seus nomes?", pergunta a capitã Aurora. `,
          backgroundImage: bg7,
          characterImage: character1,
        },
        {
          title: "Nomeação",
          description: `Os exoplanetas são nomeados com base em suas estrelas e na ordem em que foram descobertos, usando letras em ordem alfabética de acordo com sua distância da estrela: b, c, d, e, f, g e h.`,
          backgroundImage: bg8,
          characterImage: character2,
        },
        {
          title: "Nomeação",
          description: `Por exemplo, 'Kepler-22b' é um planeta descoberto pelo telescópio Kepler e é o segundo planeta encontrado em torno da estrela 'Kepler-22'.`,
          backgroundImage: bg8,
          characterImage: character2,
        },
      ]
    },
    {
      chapter: 2,
      chapterName: "    Chapter 3: Um sinal misterioso",
      conversations: [
        {
          title: "O Efeito Doppler",
          description: `No próximo sistema, algo estranho acontece. A luz da estrela oscila entre o vermelho e o azul. Orion identifica rapidamente: "É o efeito Doppler! Algo está puxando esta estrela, provavelmente um planeta massivo."`,
          backgroundImage: bg10_2,
          characterImage: character2,
        },
        {
          title: "Microlente Gravitacional",
          description: `Então algo incrível acontece. Uma estrela distante brilha mais forte que o normal.`,
          backgroundImage: bg10_1,
          characterImage: character3,
        },
        {
          title: "Microlente Gravitacional",
          description: `Orion identifica rapidamente: "É uma microlente gravitacional! Isto significa que há algo massivo, provavelmente um exoplaneta, entre nós e aquela estrela."`,
          backgroundImage: bg10_2,
          characterImage: character2,
        },
        {
          title: "Descobertas",
          description: `Você monitora os sinais e, após observação cuidadosa, descobre um novo planeta. Desta vez, é um planeta com atmosfera densa e sinais de água. Capitão Aurora fica entusiasmado: “Este pode ser o lugar que procuramos!” Mas ainda há muito para investigar.`,
          backgroundImage: bg11,
          characterImage: character1,
        },
        {
          title: "Descobertas",
          description: `Nem todos os exoplanetas descobertos foram confirmados. Alguns são chamados de “candidatos” até que tenhamos mais dados sobre eles.`,
          backgroundImage: bg11,
          characterImage: character3,
        },
        {
          title: "Visite o 'Olhos nos Exoplanetas'",
          description: `EXPLORE OS EXOPLANETAS E OS CANDIDATOS NA APLICAÇÃO DA NASA`,
          link: 'https://eyes.nasa.gov/apps/exo/',
          backgroundImage: bg12,
          characterImage: character3,
        },
      ]
    },
    {
      chapter: 3,
      chapterName: "    Chapter 4: Explorando Novos Mundos",
      conversations: [
        {
          title: "Pousando no Exoplaneta.",
          description: `Após meses de viagem, a nave finalmente pousa em um exoplaneta promissor. O ar é respirável, e a superfície parece estável. Vamos explorar alguns exoplanetas impressionantes que os cientistas já descobriram.`,
          backgroundImage: bg14,
          characterImage: character3,
        },
        {
          title: "Tipos de Exoplanetas",
          description: `Alguns exoplanetas podem ser dominados por água ou gelo, enquanto outros consistem principalmente de ferro ou carbono. Descobrimos mundos de lava com mares derretidos, planetas inchados leves como isopor e núcleos densos de planetas que ainda orbitam suas estrelas.`,
          backgroundImage: bg14,
          characterImage: character3,
        },
        {
          title: "Tipos de Exoplanetas",
          description: `Gigantes gasosos, como Júpiter e Saturno, são planetas massivos feitos principalmente de gás. Alguns, chamados de Júpiteres Quentes, orbitam tão perto de suas estrelas que se tornam extremamente quentes!`,
          backgroundImage: bg15,
          characterImage: character3,
        },
        {
          title: "Tipos de Exoplanetas",
          description: `Depois, temos os planetas netunianos, semelhantes a Netuno e Urano no nosso Sistema Solar. Eles possuem atmosferas de hidrogênio e hélio e núcleos rochosos. Até encontramos mini-Netunos, menores, mas igualmente interessantes.`,
          backgroundImage: bg16,
          characterImage: character3,
        },
        {
          title: "Tipos de Exoplanetas",
          description: `Super-Terras são maiores que a Terra, mas menores que Netuno. Algumas podem ter atmosferas e até serem habitáveis!`,
          backgroundImage: bg17,
          characterImage: character3,
        },
        {
          title: "Tipos de Exoplanetas",
          description: `Planetas terrestres são do tamanho da Terra ou menores, feitos de rochas e minerais. Alguns podem até ter água ou sinais de vida!`,
          backgroundImage: bg18,
          characterImage: character3,
        },
        {
          title: "Tipos de Exoplanetas",
          description: `O exoplaneta conhecido mais próximo da Terra, Proxima Centauri b, ainda está a cerca de 4 anos-luz de distância.`,
          backgroundImage: bg19,
          characterImage: character3,
        },
        {
          title: "Tipos de Exoplanetas",
          description: `Os Exoplanetas foram identificados com sucesso agora!`,
          backgroundImage: bg19,
          characterImage: character3,
          minigame: 1,
        },
      ]
    },
    {
      chapter: 4,
      chapterName: "    Chapter 5: A nova esperança",
      conversations: [
        {
          title: "O Fim da Jornada",
          description: `Agora você conhece os segredos dos exoplanetas! Esses mundos misteriosos estão espalhados pela galáxia, esperando para serem explorados. Cada um é único, desde gigantes gasosos até planetas rochosos semelhantes à Terra. Quem sabe? Um deles pode até abrigar vida!`,
          backgroundImage: bg22,
          characterImage: character3,
        },
        {
          title: "O Fim da Jornada",
          description: `Cientistas estão descobrindo novos exoplanetas todos os dias. E, a cada descoberta, ficamos mais perto de responder a uma das maiores perguntas: Estamos sozinhos no universo? O futuro da exploração é promissor, e talvez um dia você seja quem ajudará a encontrar um novo mundo.`,
          backgroundImage: bg22,
          characterImage: character2,
        },
        {
          title: "O Fim da Jornada",
          description: `A tripulação da Stella Explorer deixou uma mensagem para as gerações futuras: 'Continuem a jornada. As estrelas ainda têm segredos a revelar, e a humanidade sempre encontrará novos horizontes.'`,
          backgroundImage: bg22,
          characterImage: character1,
        },
        {
          title: "A aventura nunca tem fim.",
          description: ``,
          backgroundImage: bg22,
          characterImage: character1,
        },
      ]
    },
  ],
  credits: {
    team: 'EXPLORADOR DO UNIVERSO',
    slogan: 'A aventura nunca tem fim...'
  }
};
