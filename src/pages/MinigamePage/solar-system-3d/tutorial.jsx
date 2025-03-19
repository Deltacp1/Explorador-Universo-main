'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { SunIcon } from 'lucide-react';
import styles from './solar-system-3d.module.css';

export function Tutorial({ onClose }) {
  return (
    <motion.div
      className={styles.tutorialOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className={styles.tutorialCard}>
        <CardHeader>
          <CardTitle className={styles.tutorialTitle}>
            Sistema Solar 3D
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={styles.tutorialItem}>
            <SunIcon className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <p className={styles.tutorialItemTitle}>
                Explore o Sistema Solar
              </p>
              <p className={styles.tutorialItemDescription}>
                Visualize os planetas em órbita ao redor do Sol em um modelo 3D
                interativo.
              </p>
            </div>
          </div>

          <div className={styles.tutorialItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cyan-400 flex-shrink-0 mt-1"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
            <div>
              <p className={styles.tutorialItemTitle}>Controles de Navegação</p>
              <p className={styles.tutorialItemDescription}>
                Arraste para girar a visualização. Use o scroll para zoom.
                Clique em um planeta para ver detalhes.
              </p>
            </div>
          </div>

          <div className={styles.tutorialItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cyan-400 flex-shrink-0 mt-1"
            >
              <path d="M12 2v8"></path>
              <path d="m4.93 10.93 1.41 1.41"></path>
              <path d="M2 18h2"></path>
              <path d="M20 18h2"></path>
              <path d="m19.07 10.93-1.41 1.41"></path>
              <path d="M22 22H2"></path>
              <path d="m8 22 4-10 4 10"></path>
            </svg>
            <div>
              <p className={styles.tutorialItemTitle}>Ajuste a Simulação</p>
              <p className={styles.tutorialItemDescription}>
                Controle a velocidade, mostre ou oculte órbitas e rótulos, e
                selecione planetas específicos para visualizar.
              </p>
            </div>
          </div>

          <div className={styles.tutorialTip}>
            Dica: Experimente diferentes velocidades para ver como os planetas
            se movem em suas órbitas. Os planetas mais próximos do Sol orbitam
            mais rapidamente!
          </div>
        </CardContent>
        <CardFooter>
          <Button className={styles.tutorialButton} onClick={onClose}>
            Começar Exploração
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
