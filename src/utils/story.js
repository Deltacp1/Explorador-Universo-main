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
  title: "The Destiny Beyond the Stars: The Mission that Changed Everything.",
  prologue: [
    `     The year is 2147. Earth is going through difficult times. Natural resources are almost depleted, and humanity needs to find a new home to survive.`,
    `     The last hope comes with the discovery of exoplanets, worlds orbiting distant stars that could be habitable. You are part of the crew of the Stella Explorer spaceship, led by the brave Captain Aurora.`,
    `     Your mission: to find a new home for humanity among the stars...`
  ],
  chapters: [
    {
      chapter: 0,
      chapterName: "    Chapter 1: The Great Decision",
      conversations: [
        {
          title: "Departure",
          description: `You are in the command room of the ship, gazing at Earth for the last time. Captain Aurora calls the crew for a meeting. "Earth is in danger. We need to find a habitable planet, and fast!"`,
          backgroundImage: bg2,
          characterImage: character1,
        },
        {
          title: "Departure",
          description: `Dr. Orion, the chief scientist, suggests exploring a distant star system with the potential to find Earth-like planets.`,
          backgroundImage: bg2,
          characterImage: character2,
        },
        {
          title: "Departure",
          description: `Get ready for an incredible journey where you will uncover the secrets of exoplanets.`,
          backgroundImage: bg2_1,
          characterImage: character3,
        },
      ],
    },
    {
      chapter: 1,
      chapterName: "    Chapter 2: The First Planet",
      conversations: [
        {
          title: "What are Exoplanets",
          description: `Exoplanets are like the planets we know, such as Earth, Mars, and Jupiter. But the difference is that they orbit other stars.`,
          backgroundImage: bg4,
          characterImage: character3,
        },
        {
          title: "What are Exoplanets",
          description: `Each exoplanet is unique! They can be huge, like Jupiter, or small, like Earth. They are classified based on their composition, size, and even whether they might support life.`,
          backgroundImage: bg4,
          characterImage: character3,
        },
        {
          title: "The Transit Method",
          description: `You arrive at the first star system. The sensors begin to detect variations in the brightness of the star ahead.`,
          backgroundImage: bg5_1,
          characterImage: character3,
        },
        {
          title: "The Transit Method",
          description: `Dr. Orion : "When a planet passes in front of a star, it blocks part of the light. This is called a transit. We can discover planets this way."`,
          backgroundImage: bg5,
          characterImage: character2,
        },
        {
          title: "Characteristics of Exoplanets",
          description: `You observe the brightness graph and confirm: a gas giant has been discovered. But, unfortunately, this planet is not habitable. Captain Aurora smiles, "It's not what we're looking for yet, but we're on the right track!"`,
          backgroundImage: bg7,
          characterImage: character1,
          minigame: 0,
        },
        {
          title: "Characteristics of Exoplanets",
          description: `"We should name our discovery, but how do exoplanets get their names?" Captain Aurora asks.`,
          backgroundImage: bg7,
          characterImage: character1,
        },
        {
          title: "Naming",
          description: `Exoplanets are named based on their stars and the order in which they were discovered, using letters in alphabetical order according to their distance from the star: b, c, d, e, f, g, and h.`,
          backgroundImage: bg8,
          characterImage: character2,
        },
        {
          title: "Naming",
          description: `For example, 'Kepler-22b' is a planet discovered by the Kepler telescope and is the second planet found around the star 'Kepler-22'.`,
          backgroundImage: bg8,
          characterImage: character2,
        },
      ]
    },
    {
      chapter: 2,
      chapterName: "    Chapter 3: A Mysterious Signal",
      conversations: [
        {
          title: "The Doppler Effect",
          description: `In the next system, something strange happens. The light of the star oscillates between red and blue. Dr. Orion quickly identifies, "It's the Doppler effect! Something is pulling on this star, probably a massive planet.`,
          backgroundImage: bg10_2,
          characterImage: character2,
        },
        {
          title: "Gravitational Microlensing",
          description: `Then something incredible happens. A distant star shines brighter than usual.`,
          backgroundImage: bg10_1,
          characterImage: character3,
        },
        {
          title: "Gravitational Microlensing",
          description: `Dr. Orion quickly identifies: "It's a gravitational microlensing! This means there's something massive, probably an exoplanet, between us and that star."`,
          backgroundImage: bg10_2,
          characterImage: character2,
        },
        {
          title: "Discoveries",
          description: `You monitor the signals, and after careful observation, you discover a new planet. This time, it's a planet with a dense atmosphere and signs of water. Captain Aurora becomes excited: "This might be the place we are looking for!" But there's still much to investigate.`,
          backgroundImage: bg11,
          characterImage: character1,
        },
        {
          title: "Discoveries",
          description: `Not all discovered exoplanets have been confirmed. Some are called 'candidates' until we have more data about them.`,
          backgroundImage: bg11,
          characterImage: character3,
        },
        {
          title: "Visit the 'Eyes on Exoplanets'",
          description: `EXPLORE THE EXOPLANETS AND THE CANDIDATES IN NASA'S APPLICATION`,
          link: 'https://eyes.nasa.gov/apps/exo/',
          backgroundImage: bg12,
          characterImage: character3,
        },
      ]
    },
    {
      chapter: 3,
      chapterName: "    Chapter 4: Exploring New Worlds",
      conversations: [
        {
          title: "Landing on the Exoplanet",
          description: `After months of traveling, the ship finally lands on a promising exoplanet. The air is breathable, and the surface seems stable. Let's explore some impressive exoplanets that scientists have already discovered.`,
          backgroundImage: bg14,
          characterImage: character3,
        },
        {
          title: "Types of Exoplanets",
          description: `Some exoplanets may be water- or ice-dominated, while others consist mainly of iron or carbon. We've discovered lava worlds with molten seas, puffy planets as light as Styrofoam, and dense cores of planets still orbiting their stars.`,
          backgroundImage: bg14,
          characterImage: character3,
        },
        {
          title: "Types of Exoplanets",
          description: `Gas giants, like Jupiter and Saturn, are massive planets mostly made of gas. Some, called Hot Jupiters, orbit so close to their stars that they become scorching hot!`,
          backgroundImage: bg15,
          characterImage: character3,
        },
        {
          title: "Types of Exoplanets",
          description: `Then we have Neptunian planets, similar to Neptune and Uranus in our Solar System. They have atmospheres of hydrogen and helium and rocky cores. We even find mini-Neptunes, smaller but just as interesting.`,
          backgroundImage: bg16,
          characterImage: character3,
        },
        {
          title: "Types of Exoplanets",
          description: `Super-Earths are larger than Earth but smaller than Neptune. Some may have atmospheres and could even be habitable!`,
          backgroundImage: bg17,
          characterImage: character3,
        },
        {
          title: "Types of Exoplanets",
          description: `Terrestrial planets are Earth-sized or smaller, made of rock and minerals. Some might even have water or signs of life!`,
          backgroundImage: bg18,
          characterImage: character3,
        },
        {
          title: "Types of Exoplanets",
          description: `The closest known exoplanet to Earth, Proxima Centauri b, is still about 4 light-years away`,
          backgroundImage: bg19,
          characterImage: character3,
        },
        {
          title: "Types of Exoplanets",
          description: `The Exoplanets now have been successfully identified!`,
          backgroundImage: bg19,
          characterImage: character3,
          minigame: 1,
        },
      ]
    },
    {
      chapter: 4,
      chapterName: "    Chapter 5: A new hope",
      conversations: [
        {
          title: "The end of the journey",
          description: `Now you know the secrets of exoplanets! These mysterious worlds are scattered across the galaxy, waiting to be explored. Each one is unique, from gas giants to rocky, Earth-like planets. Who knows? One of them might even harbor life!`,
          backgroundImage: bg22,
          characterImage: character3,
        },
        {
          title: "The end of the journey",
          description: `Scientists are discovering new exoplanets every day. And with each discovery, we get closer to answering one of the biggest questions: Are we alone in the universe? The future of exploration is bright, and maybe one day, you'll be the one to help find a new world.`,
          backgroundImage: bg22,
          characterImage: character2,
        },
        {
          title: "The end of the journey",
          description: `The crew of the Stella Explorer left a message for future generations: "Continue the journey. The stars still have secrets to reveal, and humanity will always find new horizons."`,
          backgroundImage: bg22,
          characterImage: character1,
        },
        {
          title: "The adventure never ends.",
          description: ``,
          backgroundImage: bg22,
          characterImage: character1,
        },
      ]
    },
  ],
  credits: {
    team: 'T.A.R.D.I.S',
    slogan: 'The adventure never ends...'
  }
};
