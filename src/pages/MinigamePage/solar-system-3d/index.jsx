'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Slider } from '../../../components/ui/slider';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import {
  ChevronLeft,
  Info,
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { motion } from 'framer-motion';
import SettingsMenu from '../../../components/settings-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import { PLANETS } from './data';
import { PlanetInfo } from './planet-info';
import { Tutorial } from './tutorial';
import styles from './solar-system-3d.module.css';

export default function SolarSystem3D() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isSimulating, setIsSimulating] = useState(true);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewAngle, setViewAngle] = useState(0);

  // Referências para Three.js
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planetsRef = useRef({});
  const animationRef = useRef(0);

  // Inicializar Three.js
  useEffect(() => {
    // Importar Three.js dinamicamente
    const initThree = async () => {
      const THREE = await import('three');
      const { OrbitControls } = await import(
        'three/examples/jsm/controls/OrbitControls'
      );

      if (!canvasRef.current) return;

      // Configurar cena
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Configurar câmera
      const camera = new THREE.PerspectiveCamera(
        75,
        canvasRef.current.clientWidth / canvasRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 30;
      cameraRef.current = camera;

      // Configurar renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight
      );
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      // Adicionar controles de órbita
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 0.5;

      // Adicionar luz ambiente
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      // Adicionar luz direcional (sol)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 0, 0);
      scene.add(directionalLight);

      // Criar sol
      const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 1,
      });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      scene.add(sun);

      // Adicionar brilho ao sol
      const sunLight = new THREE.PointLight(0xffffff, 1.5, 100);
      sun.add(sunLight);

      // Criar planetas
      planetsRef.current = {};

      PLANETS.forEach((planet) => {
        // Criar grupo para o planeta (para órbita)
        const planetGroup = new THREE.Group();
        scene.add(planetGroup);

        // Criar órbita
        const orbitGeometry = new THREE.RingGeometry(
          planet.distance * 10,
          planet.distance * 10 + 0.05,
          64
        );
        const orbitMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          opacity: 0.2,
          transparent: true,
          side: THREE.DoubleSide,
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        orbit.visible = showOrbits;
        scene.add(orbit);

        // Criar planeta
        const planetGeometry = new THREE.SphereGeometry(
          planet.size * 0.4,
          32,
          32
        );
        const planetMaterial = new THREE.MeshStandardMaterial({
          color: planet.color,
          roughness: 0.7,
          metalness: 0.1,
        });
        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

        // Posicionar planeta na órbita
        planetMesh.position.x = planet.distance * 10;
        planetGroup.add(planetMesh);

        // Adicionar inclinação ao planeta
        planetMesh.rotation.x = planet.tilt;

        // Criar rótulo do planeta
        const planetLabel = document.createElement('div');
        planetLabel.className =
          'absolute px-2 py-1 bg-slate-900/80 text-white text-xs rounded pointer-events-none transform -translate-x-1/2 -translate-y-1/2 opacity-80';
        planetLabel.textContent = planet.name;
        planetLabel.style.display = showLabels ? 'block' : 'none';

        // Armazenar referências
        planetsRef.current[planet.id] = {
          group: planetGroup,
          mesh: planetMesh,
          orbit,
          label: planetLabel,
          data: planet,
        };
      });

      // Função de animação
      const animate = () => {
        if (!isSimulating) {
          animationRef.current = requestAnimationFrame(animate);
          renderer.render(scene, camera);
          controls.update();
          return;
        }

        // Atualizar posição e rotação dos planetas
        Object.values(planetsRef.current).forEach((planetObj) => {
          const planet = planetObj.data;
          const group = planetObj.group;
          const mesh = planetObj.mesh;

          // Rotação do planeta em torno do sol
          group.rotation.y += planet.orbitSpeed * 0.001 * timeScale;

          // Rotação do planeta em torno do próprio eixo
          mesh.rotation.y += planet.rotationSpeed * 0.01 * timeScale;
        });

        // Atualizar controles
        controls.update();

        // Renderizar cena
        renderer.render(scene, camera);

        // Continuar animação
        animationRef.current = requestAnimationFrame(animate);
      };

      // Iniciar animação
      animate();

      // Ajustar zoom inicial
      updateZoom();

      // Limpar ao desmontar
      return () => {
        cancelAnimationFrame(animationRef.current);
        renderer.dispose();

        // Limpar geometrias e materiais
        Object.values(planetsRef.current).forEach((planetObj) => {
          planetObj.mesh.geometry.dispose();
          planetObj.mesh.material.dispose();
          planetObj.orbit.geometry.dispose();
          planetObj.orbit.material.dispose();
        });
      };
    };

    initThree();
  }, []);

  // Atualizar visibilidade das órbitas
  useEffect(() => {
    if (!planetsRef.current) return;

    Object.values(planetsRef.current).forEach((planetObj) => {
      planetObj.orbit.visible = showOrbits;
    });
  }, [showOrbits]);

  // Atualizar visibilidade dos rótulos
  useEffect(() => {
    if (!planetsRef.current) return;

    Object.values(planetsRef.current).forEach((planetObj) => {
      if (planetObj.label) {
        planetObj.label.style.display = showLabels ? 'block' : 'none';
      }
    });
  }, [showLabels]);

  // Atualizar auto-rotação
  useEffect(() => {
    if (!cameraRef.current) return;

    // Atualizar controles
    if (cameraRef.current.userData.controls) {
      cameraRef.current.userData.controls.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Atualizar zoom
  const updateZoom = () => {
    if (!cameraRef.current) return;

    // Mapear zoomLevel (0-100) para distância da câmera (50-5)
    const distance = 50 - (zoomLevel / 100) * 45;

    // Atualizar posição da câmera
    cameraRef.current.position.z = distance;
  };

  useEffect(() => {
    updateZoom();
  }, [zoomLevel]);

  // Selecionar planeta
  const selectPlanet = (planetId) => {
    const planet = PLANETS.find((p) => p.id === planetId);
    setSelectedPlanet(planet);
  };

  // Resetar visualização
  const resetView = () => {
    if (!cameraRef.current) return;

    // Resetar posição da câmera
    cameraRef.current.position.set(0, 0, 30);
    cameraRef.current.lookAt(0, 0, 0);

    // Resetar zoom
    setZoomLevel(50);

    // Resetar seleção
    setSelectedPlanet(null);
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
          <h1 className={styles.title}>Sistema Solar 3D</h1>
        </div>

        <SettingsMenu className="z-50" />
      </div>

      <div className={styles.content}>
        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} className={styles.canvas} />

          {/* Controles de zoom */}
          <div className={styles.zoomControls}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={styles.controlButton}
                    onClick={() => setZoomLevel(Math.min(zoomLevel + 10, 100))}
                  >
                    <ZoomIn className="h-5 w-5 text-cyan-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Aumentar Zoom</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={styles.controlButton}
                    onClick={() => setZoomLevel(Math.max(zoomLevel - 10, 0))}
                  >
                    <ZoomOut className="h-5 w-5 text-cyan-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Diminuir Zoom</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Controles de simulação */}
          <div className={styles.simulationControls}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={styles.controlButton}
                    onClick={() => setIsSimulating(!isSimulating)}
                  >
                    {isSimulating ? (
                      <Pause className="h-5 w-5 text-cyan-400" />
                    ) : (
                      <Play className="h-5 w-5 text-cyan-400" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSimulating ? 'Pausar' : 'Continuar'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={styles.controlButton}
                    onClick={resetView}
                  >
                    <RotateCcw className="h-5 w-5 text-cyan-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Resetar Visualização</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Card className={styles.controlsCard}>
          <CardHeader className="pb-2">
            <CardTitle className={styles.controlsTitle}>Controles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className={styles.controlLabel}>
                  Velocidade: {timeScale}x
                </Label>
              </div>
              <Slider
                value={[timeScale]}
                min={0.1}
                max={5}
                step={0.1}
                onValueChange={(value) => setTimeScale(value[0])}
                className="py-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-orbits" className={styles.switchLabel}>
                Mostrar Órbitas
              </Label>
              <Switch
                id="show-orbits"
                checked={showOrbits}
                onCheckedChange={setShowOrbits}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-labels" className={styles.switchLabel}>
                Mostrar Nomes
              </Label>
              <Switch
                id="show-labels"
                checked={showLabels}
                onCheckedChange={setShowLabels}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-rotate" className={styles.switchLabel}>
                Rotação Automática
              </Label>
              <Switch
                id="auto-rotate"
                checked={autoRotate}
                onCheckedChange={setAutoRotate}
              />
            </div>

            <div className="space-y-2">
              <Label className={styles.controlLabel}>Planetas</Label>
              <div className={styles.planetGrid}>
                {PLANETS.map((planet) => (
                  <Button
                    key={planet.id}
                    variant={
                      selectedPlanet?.id === planet.id ? 'default' : 'outline'
                    }
                    className={`${styles.planetButton} ${
                      selectedPlanet?.id === planet.id
                        ? styles.planetButtonActive
                        : ''
                    }`}
                    onClick={() => selectPlanet(planet.id)}
                  >
                    <div
                      className={styles.planetColor}
                      style={{ backgroundColor: planet.color }}
                    />
                    {planet.name}
                  </Button>
                ))}
              </div>
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
                    Como Usar
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mostrar instruções</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      {/* Informações do planeta selecionado */}
      {selectedPlanet && <PlanetInfo planet={selectedPlanet} />}

      {/* Tutorial */}
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
    </motion.div>
  );
}
