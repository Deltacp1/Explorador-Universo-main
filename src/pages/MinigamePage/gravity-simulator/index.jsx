'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Slider } from '../../../components/ui/slider';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import {
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Info,
  Trophy,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import { PLANETS, OBJECTS } from './data';
import { Tutorial } from './tutorial';
import styles from './gravity-simulator.module.css';

export default function GravitySimulator() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const [selectedPlanet, setSelectedPlanet] = useState(PLANETS[2]); // Terra como padrão
  const [selectedObject, setSelectedObject] = useState(OBJECTS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [launchAngle, setLaunchAngle] = useState(45);
  const [launchPower, setLaunchPower] = useState(50);
  const [score, setScore] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [targets, setTargets] = useState([]);

  // Estado para objetos em movimento
  const [objects, setObjects] = useState([]);

  // Configurar alvos
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // Criar alvos aleatórios
    const newTargets = [];
    for (let i = 0; i < 3; i++) {
      newTargets.push({
        x: Math.random() * (width * 0.6) + width * 0.3,
        y: Math.random() * (height * 0.5),
        radius: Math.random() * 15 + 20,
        points: Math.floor(Math.random() * 100) + 50,
        hit: false,
      });
    }

    setTargets(newTargets);
  }, [selectedPlanet]);

  // Inicializar canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Desenhar cenário inicial
    drawScene();

    // Limpar ao desmontar
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Atualizar desenho quando mudar planeta ou objeto
  useEffect(() => {
    drawScene();
  }, [selectedPlanet, selectedObject, targets]);

  // Função para desenhar o cenário
  const drawScene = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Limpar canvas
    ctx.clearRect(0, 0, width, height);

    // Desenhar céu/espaço
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Desenhar estrelas
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.7;
      const radius = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Desenhar superfície do planeta
    const surfaceGradient = ctx.createLinearGradient(
      0,
      height * 0.8,
      0,
      height
    );
    surfaceGradient.addColorStop(0, selectedPlanet.color);
    surfaceGradient.addColorStop(1, darkenColor(selectedPlanet.color, 30));
    ctx.fillStyle = surfaceGradient;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.8);

    // Criar superfície ondulada
    for (let x = 0; x <= width; x += 20) {
      const y = height * 0.8 + Math.sin(x / 50) * 10;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Desenhar alvos
    targets.forEach((target) => {
      if (!target.hit) {
        // Desenhar alvo
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
        ctx.fill();
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Desenhar círculos concêntricos
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Desenhar pontuação
        ctx.font = '12px "Silkscreen", monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(`${target.points}`, target.x, target.y + 4);
      }
    });

    // Desenhar objetos em movimento
    objects.forEach((obj) => {
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.fillStyle = obj.color;
      ctx.fill();
    });

    // Desenhar lançador
    if (!isSimulating) {
      const launcherX = 50;
      const launcherY = height * 0.8 - 20;

      // Converter ângulo para radianos
      const angleRad = (launchAngle * Math.PI) / 180;

      // Calcular ponto final da linha de trajetória
      const lineLength = launchPower * 1.5;
      const endX = launcherX + Math.cos(angleRad) * lineLength;
      const endY = launcherY - Math.sin(angleRad) * lineLength;

      // Desenhar linha de trajetória
      ctx.beginPath();
      ctx.moveTo(launcherX, launcherY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Desenhar objeto no lançador
      ctx.beginPath();
      ctx.arc(launcherX, launcherY, selectedObject.radius, 0, Math.PI * 2);
      ctx.fillStyle = selectedObject.color;
      ctx.fill();

      // Desenhar base do lançador
      ctx.beginPath();
      ctx.moveTo(launcherX - 20, height * 0.8);
      ctx.lineTo(launcherX + 20, height * 0.8);
      ctx.lineTo(launcherX + 15, height * 0.8 - 10);
      ctx.lineTo(launcherX - 15, height * 0.8 - 10);
      ctx.closePath();
      ctx.fillStyle = '#555555';
      ctx.fill();
    }
  };

  // Função para escurecer uma cor
  const darkenColor = (color, percent) => {
    const num = Number.parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 0 ? 0 : R) * 0x10000 +
        (G < 0 ? 0 : G) * 0x100 +
        (B < 0 ? 0 : B)
      )
        .toString(16)
        .slice(1)
    );
  };

  // Iniciar simulação
  const startSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);

    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const height = canvas.height;

    // Posição inicial
    const x = 50;
    const y = height * 0.8 - 20;

    // Converter ângulo para radianos
    const angleRad = (launchAngle * Math.PI) / 180;

    // Velocidade inicial baseada no poder de lançamento
    const speed = launchPower / 5;
    const vx = Math.cos(angleRad) * speed;
    const vy = -Math.sin(angleRad) * speed;

    // Adicionar objeto à simulação
    setObjects([
      {
        x,
        y,
        vx,
        vy,
        radius: selectedObject.radius,
        color: selectedObject.color,
        bounciness: selectedObject.bounciness,
        mass: selectedObject.mass,
      },
    ]);

    // Iniciar loop de animação
    animateSimulation();
  };

  // Animar simulação
  const animateSimulation = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const gravity = selectedPlanet.gravity / 10; // Escalar para melhor visualização

    // Atualizar posição e velocidade dos objetos
    setObjects((prevObjects) => {
      const updatedObjects = prevObjects.map((obj) => {
        // Aplicar gravidade
        const newVy = obj.vy + (gravity * obj.mass) / 10;

        // Atualizar posição
        const newX = obj.x + obj.vx;
        const newY = obj.y + newVy;

        // Verificar colisão com o chão
        if (newY + obj.radius > height * 0.8) {
          // Quicar
          return {
            ...obj,
            y: height * 0.8 - obj.radius,
            vy: -newVy * obj.bounciness,
            vx: obj.vx * 0.98, // Atrito
          };
        }

        // Verificar colisão com as paredes
        if (newX - obj.radius < 0 || newX + obj.radius > width) {
          return {
            ...obj,
            x: newX - obj.radius < 0 ? obj.radius : width - obj.radius,
            vx: -obj.vx * obj.bounciness,
          };
        }

        // Verificar colisão com alvos
        let hitTarget = false;
        setTargets((prevTargets) => {
          return prevTargets.map((target) => {
            if (target.hit) return target;

            // Calcular distância entre objeto e alvo
            const dx = newX - target.x;
            const dy = newY - target.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Verificar colisão
            if (distance < obj.radius + target.radius) {
              hitTarget = true;
              // Adicionar pontos
              setScore((prev) => prev + target.points);
              return { ...target, hit: true };
            }

            return target;
          });
        });

        // Retornar objeto atualizado
        return {
          ...obj,
          x: newX,
          y: newY,
          vy: newVy,
        };
      });

      // Remover objetos que saíram da tela ou pararam
      return updatedObjects.filter((obj) => {
        const isMoving = Math.abs(obj.vx) > 0.1 || Math.abs(obj.vy) > 0.1;
        const isOnScreen = obj.y < height + obj.radius;
        return isMoving && isOnScreen;
      });
    });

    // Desenhar cena
    drawScene();

    // Verificar se todos os objetos pararam
    if (objects.length === 0) {
      // Verificar se todos os alvos foram atingidos
      const allTargetsHit = targets.every((target) => target.hit);
      if (allTargetsHit) {
        // Adicionar bônus
        setScore((prev) => prev + 200);

        // Mostrar mensagem de sucesso
        alert(
          'Parabéns! Você atingiu todos os alvos e ganhou 200 pontos de bônus!'
        );

        // Reiniciar simulação
        resetSimulation();
      } else {
        setIsSimulating(false);
      }
      return;
    }

    // Continuar animação
    animationRef.current = requestAnimationFrame(animateSimulation);
  };

  // Reiniciar simulação
  const resetSimulation = () => {
    cancelAnimationFrame(animationRef.current);
    setIsSimulating(false);
    setObjects([]);

    // Resetar alvos
    setTargets((prev) => prev.map((target) => ({ ...target, hit: false })));

    // Desenhar cena
    drawScene();
  };

  // Pausar simulação
  const pauseSimulation = () => {
    cancelAnimationFrame(animationRef.current);
    setIsSimulating(false);
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <Button
            variant="ghost"
            size="icon"
            className={styles.backButton}
            onClick={() => navigate('/minigames-page')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className={styles.title}>Simulador de Gravidade</h1>
        </div>

        <Badge variant="outline" className={styles.scoreBadge}>
          <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
          <span className="text-white">Pontos: {score}</span>
        </Badge>
      </div>

      <div className={styles.content}>
        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} className={styles.canvas} />
        </div>

        <Card className={styles.controlsCard}>
          <CardHeader className="pb-2">
            <CardTitle className={styles.controlsTitle}>Controles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className={styles.controlLabel}>Planeta</label>
              <Select
                value={selectedPlanet.id}
                onValueChange={(value) => {
                  const planet = PLANETS.find((p) => p.id === value);
                  if (planet) setSelectedPlanet(planet);
                }}
                disabled={isSimulating}
              >
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={styles.selectContent}>
                  {PLANETS.map((planet) => (
                    <SelectItem key={planet.id} value={planet.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: planet.color }}
                        />
                        {planet.name} ({planet.gravity} m/s²)
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className={styles.description}>
                {selectedPlanet.description}
              </div>
            </div>

            <div className="space-y-2">
              <label className={styles.controlLabel}>Objeto</label>
              <Select
                value={selectedObject.id}
                onValueChange={(value) => {
                  const object = OBJECTS.find((o) => o.id === value);
                  if (object) setSelectedObject(object);
                }}
                disabled={isSimulating}
              >
                <SelectTrigger className={styles.selectTrigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={styles.selectContent}>
                  {OBJECTS.map((object) => (
                    <SelectItem key={object.id} value={object.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: object.color }}
                        />
                        {object.name} (Massa: {object.mass})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className={styles.controlLabel}>
                  Ângulo: {launchAngle}°
                </label>
              </div>
              <Slider
                value={[launchAngle]}
                min={0}
                max={90}
                step={1}
                onValueChange={(value) => setLaunchAngle(value[0])}
                disabled={isSimulating}
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className={styles.controlLabel}>
                  Potência: {launchPower}%
                </label>
              </div>
              <Slider
                value={[launchPower]}
                min={10}
                max={100}
                step={1}
                onValueChange={(value) => setLaunchPower(value[0])}
                disabled={isSimulating}
                className="py-2"
              />
            </div>

            <div className="flex gap-2">
              {!isSimulating ? (
                <Button
                  className={styles.launchButton}
                  onClick={startSimulation}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Lançar
                </Button>
              ) : (
                <Button
                  className={styles.pauseButton}
                  onClick={pauseSimulation}
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pausar
                </Button>
              )}

              <Button
                variant="outline"
                className={styles.resetButton}
                onClick={resetSimulation}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={styles.helpButton}
                    onClick={() => setShowTutorial(true)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    Como Jogar
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mostrar instruções do jogo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      {/* Tutorial */}
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
    </motion.div>
  );
}
