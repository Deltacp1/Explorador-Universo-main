'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import {
  Settings,
  Volume2,
  VolumeX,
  Eye,
  Moon,
  Sun,
  Languages,
  HelpCircle,
} from 'lucide-react';
import styles from './settings-menu.module.css';

export default function SettingsMenu({ className }) {
  // Estados para as configurações
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(80);
  const [sfxVolume, setSfxVolume] = useState(70);
  const [colorblindMode, setColorblindMode] = useState('none');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [screenReaderHints, setScreenReaderHints] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('pt-BR');

  // Efeito para aplicar as configurações
  useEffect(() => {
    // Carregar configurações do localStorage
    const savedSettings = localStorage.getItem('universeExplorerSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSoundEnabled(settings.soundEnabled ?? true);
      setMusicVolume(settings.musicVolume ?? 80);
      setSfxVolume(settings.sfxVolume ?? 70);
      setColorblindMode(settings.colorblindMode ?? 'none');
      setHighContrast(settings.highContrast ?? false);
      setLargeText(settings.largeText ?? false);
      setScreenReaderHints(settings.screenReaderHints ?? false);
      setDarkMode(settings.darkMode ?? true);
      setLanguage(settings.language ?? 'pt-BR');
    }

    // Aplicar configurações ao documento
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('large-text', largeText);
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.setAttribute(
      'data-colorblind-mode',
      colorblindMode
    );
    document.documentElement.lang = language;
  }, [darkMode, largeText, highContrast, colorblindMode, language]);

  // Salvar configurações
  const saveSettings = () => {
    const settings = {
      soundEnabled,
      musicVolume,
      sfxVolume,
      colorblindMode,
      highContrast,
      largeText,
      screenReaderHints,
      darkMode,
      language,
    };
    localStorage.setItem('universeExplorerSettings', JSON.stringify(settings));
  };

  // Efeito para salvar configurações quando mudam
  useEffect(() => {
    saveSettings();
  }, [
    soundEnabled,
    musicVolume,
    sfxVolume,
    colorblindMode,
    highContrast,
    largeText,
    screenReaderHints,
    darkMode,
    language,
  ]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${styles.settingsButton} ${className || ''}`}
          aria-label="Configurações"
        >
          <Settings className={styles.settingsIcon} />
        </Button>
      </SheetTrigger>
      <SheetContent className={styles.sheetContent}>
        <SheetHeader>
          <SheetTitle className={styles.sheetTitle}>Configurações</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="sound" className={styles.tabs}>
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="sound" className={styles.soundTab}>
              <Volume2 className={styles.tabIcon} />
              Som
            </TabsTrigger>
            <TabsTrigger
              value="accessibility"
              className={styles.accessibilityTab}
            >
              <Eye className={styles.tabIcon} />
              Acessibilidade
            </TabsTrigger>
            <TabsTrigger value="general" className={styles.generalTab}>
              <HelpCircle className={styles.tabIcon} />
              Geral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sound" className={styles.tabContent}>
            <div className={styles.settingsGroup}>
              <div className={styles.settingRow}>
                <div className={styles.settingLabelWithIcon}>
                  {soundEnabled ? (
                    <Volume2 className={styles.soundEnabledIcon} />
                  ) : (
                    <VolumeX className={styles.soundDisabledIcon} />
                  )}
                  <Label htmlFor="sound-toggle" className={styles.settingLabel}>
                    Som Ativado
                  </Label>
                </div>
                <Switch
                  id="sound-toggle"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                  aria-label="Ativar ou desativar som"
                />
              </div>

              <div className={styles.sliderContainer}>
                <Label htmlFor="music-volume" className={styles.sliderLabel}>
                  Volume da Música: {musicVolume}%
                </Label>
                <Slider
                  id="music-volume"
                  disabled={!soundEnabled}
                  value={[musicVolume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setMusicVolume(value[0])}
                  className={styles.slider}
                  aria-label="Ajustar volume da música"
                />
              </div>

              <div className={styles.sliderContainer}>
                <Label htmlFor="sfx-volume" className={styles.sliderLabel}>
                  Volume dos Efeitos: {sfxVolume}%
                </Label>
                <Slider
                  id="sfx-volume"
                  disabled={!soundEnabled}
                  value={[sfxVolume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setSfxVolume(value[0])}
                  className={styles.slider}
                  aria-label="Ajustar volume dos efeitos sonoros"
                />
              </div>

              <div className={styles.tipText}>
                Dica: Você pode ajustar o volume individualmente para música de
                fundo e efeitos sonoros.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accessibility" className={styles.tabContent}>
            <div className={styles.settingsGroup}>
              <div className={styles.colorblindContainer}>
                <Label
                  htmlFor="colorblind-mode"
                  className={styles.colorblindLabel}
                >
                  Modo Daltonismo
                </Label>
                <div className={styles.colorblindGrid}>
                  <Button
                    variant={colorblindMode === 'none' ? 'default' : 'outline'}
                    className={
                      colorblindMode === 'none'
                        ? styles.colorblindButtonActive
                        : styles.colorblindButton
                    }
                    onClick={() => setColorblindMode('none')}
                    aria-label="Desativar modo daltonismo"
                  >
                    Normal
                  </Button>
                  <Button
                    variant={
                      colorblindMode === 'protanopia' ? 'default' : 'outline'
                    }
                    className={
                      colorblindMode === 'protanopia'
                        ? styles.colorblindButtonActive
                        : styles.colorblindButton
                    }
                    onClick={() => setColorblindMode('protanopia')}
                    aria-label="Ativar modo protanopia (dificuldade com vermelho)"
                  >
                    Protanopia
                  </Button>
                  <Button
                    variant={
                      colorblindMode === 'deuteranopia' ? 'default' : 'outline'
                    }
                    className={
                      colorblindMode === 'deuteranopia'
                        ? styles.colorblindButtonActive
                        : styles.colorblindButton
                    }
                    onClick={() => setColorblindMode('deuteranopia')}
                    aria-label="Ativar modo deuteranopia (dificuldade com verde)"
                  >
                    Deuteranopia
                  </Button>
                  <Button
                    variant={
                      colorblindMode === 'tritanopia' ? 'default' : 'outline'
                    }
                    className={
                      colorblindMode === 'tritanopia'
                        ? styles.colorblindButtonActive
                        : styles.colorblindButton
                    }
                    onClick={() => setColorblindMode('tritanopia')}
                    aria-label="Ativar modo tritanopia (dificuldade com azul)"
                  >
                    Tritanopia
                  </Button>
                </div>
              </div>

              <div className={styles.settingRow}>
                <Label htmlFor="high-contrast" className={styles.settingLabel}>
                  Alto Contraste
                </Label>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                  aria-label="Ativar ou desativar modo de alto contraste"
                />
              </div>

              <div className={styles.settingRow}>
                <Label htmlFor="large-text" className={styles.settingLabel}>
                  Texto Grande
                </Label>
                <Switch
                  id="large-text"
                  checked={largeText}
                  onCheckedChange={setLargeText}
                  aria-label="Ativar ou desativar texto grande"
                />
              </div>

              <div className={styles.settingRow}>
                <Label htmlFor="screen-reader" className={styles.settingLabel}>
                  Dicas para Leitor de Tela
                </Label>
                <Switch
                  id="screen-reader"
                  checked={screenReaderHints}
                  onCheckedChange={setScreenReaderHints}
                  aria-label="Ativar ou desativar dicas para leitor de tela"
                />
              </div>

              <div className={styles.tipText}>
                Dica: O modo daltonismo ajusta as cores para facilitar a
                visualização para pessoas com diferentes tipos de daltonismo.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="general" className={styles.tabContent}>
            <div className={styles.settingsGroup}>
              <div className={styles.settingRow}>
                <div className={styles.settingLabelWithIcon}>
                  {darkMode ? (
                    <Moon className={styles.darkModeIcon} />
                  ) : (
                    <Sun className={styles.lightModeIcon} />
                  )}
                  <Label htmlFor="dark-mode" className={styles.settingLabel}>
                    Modo Escuro
                  </Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  aria-label="Ativar ou desativar modo escuro"
                />
              </div>

              <div className={styles.languageContainer}>
                <Label htmlFor="language" className={styles.languageLabel}>
                  <Languages className={styles.languageIcon} />
                  Idioma
                </Label>
                <div className={styles.languageGrid}>
                  <Button
                    variant={language === 'pt-BR' ? 'default' : 'outline'}
                    className={
                      language === 'pt-BR'
                        ? styles.languageButtonActive
                        : styles.languageButton
                    }
                    onClick={() => setLanguage('pt-BR')}
                    aria-label="Selecionar idioma Português do Brasil"
                  >
                    Português
                  </Button>
                  <Button
                    variant={language === 'en-US' ? 'default' : 'outline'}
                    className={
                      language === 'en-US'
                        ? styles.languageButtonActive
                        : styles.languageButton
                    }
                    onClick={() => setLanguage('en-US')}
                    aria-label="Selecionar idioma Inglês"
                  >
                    English
                  </Button>
                  <Button
                    variant={language === 'es-ES' ? 'default' : 'outline'}
                    className={
                      language === 'es-ES'
                        ? styles.languageButtonActive
                        : styles.languageButton
                    }
                    onClick={() => setLanguage('es-ES')}
                    aria-label="Selecionar idioma Espanhol"
                  >
                    Español
                  </Button>
                  <Button
                    variant={language === 'fr-FR' ? 'default' : 'outline'}
                    className={
                      language === 'fr-FR'
                        ? styles.languageButtonActive
                        : styles.languageButton
                    }
                    onClick={() => setLanguage('fr-FR')}
                    aria-label="Selecionar idioma Francês"
                  >
                    Français
                  </Button>
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <Button
                  variant="outline"
                  className={styles.resetButton}
                  onClick={() => {
                    // Resetar todas as configurações para o padrão
                    setSoundEnabled(true);
                    setMusicVolume(80);
                    setSfxVolume(70);
                    setColorblindMode('none');
                    setHighContrast(false);
                    setLargeText(false);
                    setScreenReaderHints(false);
                    setDarkMode(true);
                    setLanguage('pt-BR');
                  }}
                  aria-label="Restaurar configurações padrão"
                >
                  Restaurar Padrões
                </Button>

                <Button
                  variant="outline"
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar menu de configurações"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

SettingsMenu.propTypes = {
  className: PropTypes.string,
};
