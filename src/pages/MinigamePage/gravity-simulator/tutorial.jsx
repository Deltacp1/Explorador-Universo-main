import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Trophy, EarthIcon as PlanetIcon } from 'lucide-react';
import styles from './gravity-simulator.module.css';

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
          <CardTitle className={styles.tutorialTitle}>Como Jogar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={styles.tutorialItem}>
            <PlanetIcon className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <p className={styles.tutorialItemTitle}>Escolha um Planeta</p>
              <p className={styles.tutorialItemDescription}>
                Cada planeta tem uma gravidade diferente que afeta a trajetória
                dos objetos.
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
            </svg>
            <div>
              <p className={styles.tutorialItemTitle}>Selecione um Objeto</p>
              <p className={styles.tutorialItemDescription}>
                Objetos diferentes têm massas e elasticidades diferentes.
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
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <div>
              <p className={styles.tutorialItemTitle}>
                Ajuste o Ângulo e a Potência
              </p>
              <p className={styles.tutorialItemDescription}>
                Use os controles deslizantes para definir o ângulo e a força do
                lançamento.
              </p>
            </div>
          </div>

          <div className={styles.tutorialItem}>
            <Trophy className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <p className={styles.tutorialItemTitle}>Acerte os Alvos</p>
              <p className={styles.tutorialItemDescription}>
                Tente acertar todos os alvos dourados para ganhar pontos e um
                bônus especial.
              </p>
            </div>
          </div>

          <div className={styles.tutorialTip}>
            Dica: Experimente diferentes planetas para ver como a gravidade
            afeta a trajetória dos objetos!
          </div>
        </CardContent>
        <CardFooter>
          <Button className={styles.tutorialButton} onClick={onClose}>
            Entendi!
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
