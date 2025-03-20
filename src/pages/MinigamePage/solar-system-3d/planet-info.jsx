'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '../../../components/ui/card';
import styles from './solar-system-3d.module.css';

export function PlanetInfo({ planet }) {
  return (
    <motion.div
      className={styles.planetInfo}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <Card className={styles.planetInfoCard}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div
              className={styles.planetInfoColor}
              style={{ backgroundColor: planet.color }}
            />
            <CardTitle className={styles.planetInfoTitle}>
              {planet.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <p className={styles.planetInfoDescription}>{planet.description}</p>

          <div className={styles.planetInfoGrid}>
            <div>
              <span className={styles.planetInfoLabel}>
                Tamanho (Terra = 1):
              </span>
              <p className={styles.planetInfoValue}>{planet.size}</p>
            </div>
            <div>
              <span className={styles.planetInfoLabel}>Distância (UA):</span>
              <p className={styles.planetInfoValue}>{planet.distance}</p>
            </div>
            <div>
              <span className={styles.planetInfoLabel}>
                Velocidade Orbital:
              </span>
              <p className={styles.planetInfoValue}>{planet.orbitSpeed}x</p>
            </div>
            <div>
              <span className={styles.planetInfoLabel}>
                Velocidade Rotação:
              </span>
              <p className={styles.planetInfoValue}>{planet.rotationSpeed}x</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
