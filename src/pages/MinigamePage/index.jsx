'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Gamepad2,
  Rocket,
  Atom,
  SpaceIcon as Planet,
  Telescope,
  ChevronLeft,
  Trophy,
  Clock,
  Star,
  CuboidIcon as Cube,
} from 'lucide-react';
import { motion } from 'framer-motion';
import SettingsMenu from '../../components/settings-menu';
import styles from './minigames-page.module.css';

// Dados dos minigames
const MINIGAMES = [
  {
    id: 'gravity-simulator',
    title: 'Simulador de Gravidade',
    description:
      'Experimente como a gravidade funciona em diferentes planetas lançando objetos e observando suas trajetórias.',
    difficulty: 'Médio',
    category: 'Física',
    timeToPlay: '5-10 min',
    image: '/MinigamePage/gravity-simulator.png',
    unlocked: true,
    bestScore: 850,
    stars: 2,
    type: '2D',
  },
  {
    id: 'planet-puzzle',
    title: 'Quebra-Cabeça Planetário',
    description:
      'Organize os planetas do Sistema Solar na ordem correta e aprenda sobre suas características.',
    difficulty: 'Fácil',
    category: 'Astronomia',
    timeToPlay: '3-5 min',
    image: '/MinigamePage/planet-puzzle.png',
    unlocked: true,
    bestScore: 1200,
    stars: 3,
    type: '2D',
  },
  {
    id: 'asteroid-defense',
    title: 'Defesa de Asteroides',
    description:
      'Proteja a Terra de uma chuva de asteroides usando seus conhecimentos de física para calcular trajetórias.',
    difficulty: 'Difícil',
    category: 'Física Espacial',
    timeToPlay: '5-8 min',
    image: '/MinigamePage/asteroid-defense.png',
    unlocked: true,
    bestScore: 720,
    stars: 2,
    type: '2D',
  },
  {
    id: '3d-solar-system',
    title: 'Sistema Solar 3D',
    description:
      'Explore um modelo interativo do Sistema Solar em 3D, aprendendo sobre os planetas e suas órbitas.',
    difficulty: 'Médio',
    category: 'Astronomia',
    timeToPlay: '5-15 min',
    image: '/MinigamePage/solar-system-3d.png',
    unlocked: true,
    bestScore: 0,
    stars: 0,
    type: '3D',
  },
  {
    id: 'constellation-connect',
    title: 'Conecte as Constelações',
    description:
      'Trace as linhas para formar constelações famosas e aprenda sobre as histórias por trás delas.',
    difficulty: 'Médio',
    category: 'Astronomia',
    timeToPlay: '4-6 min',
    image: '/MinigamePage/constellation-connect.png',
    unlocked: true,
    bestScore: 950,
    stars: 3,
    type: '2D',
  },
  {
    id: 'rocket-builder',
    title: 'Construtor de Foguetes',
    description:
      'Projete e lance seu próprio foguete em 3D, aprendendo sobre propulsão e aerodinâmica.',
    difficulty: 'Difícil',
    category: 'Engenharia Espacial',
    timeToPlay: '8-12 min',
    image: '/MinigamePage/rocket-builder.png',
    unlocked: false,
    bestScore: 0,
    stars: 0,
    type: '3D',
  },
];

export default function MinigamesPage() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleSelectGame = (gameId) => {
    const game = MINIGAMES.find((g) => g.id === gameId);
    if (game && game.unlocked) {
      setSelectedGame(gameId);
      setTimeout(() => {
        navigate(`/minigames-page/${gameId}`);
      }, 500);
    }
  };

  // Filtrar minigames
  const filteredGames = MINIGAMES.filter((game) => {
    if (filter === 'all') return true;
    return game.type === filter;
  });

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.backgroundContainer}>
        <div className={styles.starsBackground}></div>
        {/* Partículas flutuantes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.floatingParticle}
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <Button
              variant="ghost"
              size="icon"
              className={styles.backButton}
              onClick={() => navigate('/game-mode')}
            >
              <ChevronLeft className={styles.backIcon} />
            </Button>
            <h1 className={styles.pageTitle}>
              <Gamepad2 className={styles.titleIcon} />
              Minigames
            </h1>
          </div>

          <div className={styles.statsContainer}>
            <Badge variant="outline" className={styles.pointsBadge}>
              <Trophy className={styles.trophyIcon} />
              <span>Pontos: 3720</span>
            </Badge>

            <SettingsMenu />
          </div>
        </div>

        {/* Filtros */}
        <div className={styles.filtersContainer}>
          <div className={styles.filtersWrapper}>
            <Button
              variant="ghost"
              className={`${styles.filterButton} ${
                filter === 'all' ? styles.filterButtonActive : ''
              }`}
              onClick={() => setFilter('all')}
            >
              Todos
            </Button>
            <Button
              variant="ghost"
              className={`${styles.filterButton} ${
                filter === '2D' ? styles.filterButton2DActive : ''
              }`}
              onClick={() => setFilter('2D')}
            >
              <span className={styles.filterButtonContent}>
                <Gamepad2 className={styles.filterIcon} />
                2D
              </span>
            </Button>
            <Button
              variant="ghost"
              className={`${styles.filterButton} ${
                filter === '3D' ? styles.filterButton3DActive : ''
              }`}
              onClick={() => setFilter('3D')}
            >
              <span className={styles.filterButtonContent}>
                <Cube className={styles.filterIcon} />
                3D
              </span>
            </Button>
          </div>
        </div>

        <div className={styles.gamesGrid}>
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`${styles.gameCard} ${
                    game.unlocked
                      ? styles.gameCardUnlocked
                      : styles.gameCardLocked
                  }`}
                  onClick={() => handleSelectGame(game.id)}
                >
                  <div className={styles.gameImageContainer}>
                    <div className={styles.imageGradient} />
                    <div className={styles.imageWrapper}>
                      <img
                        src={
                          game.image || '/placeholder.svg?height=200&width=400'
                        }
                        alt={game.title}
                        className={styles.gameImage}
                      />
                    </div>

                    {!game.unlocked && (
                      <div className={styles.lockedOverlay}>
                        <div className={styles.lockIconContainer}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={styles.lockIcon}
                          >
                            <rect
                              width="18"
                              height="11"
                              x="3"
                              y="11"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                      </div>
                    )}

                    <div className={styles.starsContainer}>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < game.stars
                              ? styles.starActive
                              : styles.starInactive
                          }
                        />
                      ))}
                    </div>

                    <div className={styles.gameTypeBadgeContainer}>
                      <Badge className={styles.gameTypeBadge}>
                        {game.type}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className={styles.cardHeader}>
                    <div className={styles.badgesContainer}>
                      <Badge
                        className={`${styles.categoryBadge} ${
                          game.category === 'Física'
                            ? styles.physicsBadge
                            : game.category === 'Astronomia'
                            ? styles.astronomyBadge
                            : styles.engineeringBadge
                        }`}
                      >
                        {game.category === 'Física' && (
                          <Atom className={styles.badgeIcon} />
                        )}
                        {game.category === 'Astronomia' && (
                          <Telescope className={styles.badgeIcon} />
                        )}
                        {game.category === 'Física Espacial' && (
                          <Planet className={styles.badgeIcon} />
                        )}
                        {game.category === 'Engenharia Espacial' && (
                          <Rocket className={styles.badgeIcon} />
                        )}
                        {game.category}
                      </Badge>
                      <Badge
                        className={`${styles.difficultyBadge} ${
                          game.difficulty === 'Fácil'
                            ? styles.easyBadge
                            : game.difficulty === 'Médio'
                            ? styles.mediumBadge
                            : styles.hardBadge
                        }`}
                      >
                        {game.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className={styles.gameTitle}>
                      {game.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className={styles.cardContent}>
                    <p className={styles.gameDescription}>{game.description}</p>
                  </CardContent>

                  <CardFooter className={styles.cardFooter}>
                    <div className={styles.timeToPlay}>
                      <Clock className={styles.timeIcon} />
                      {game.timeToPlay}
                    </div>

                    {game.bestScore > 0 && (
                      <div className={styles.bestScore}>
                        <Trophy className={styles.scoreIcon} />
                        Melhor: {game.bestScore}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className={styles.noGamesFound}>
              <p>Nenhum minigame encontrado com o filtro atual.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
