import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BackgroundMusic from './components/BackgroundMusic';

import StoryPage from './pages/StoryPage';
import ChapterPage from './pages/ChapterPage';
import LoginPage from './pages/LoginPage';
import DescriptionPage from './pages/DescriptionPage';
import CreditsPage from './pages/CreditsPage';
import { GameProvider } from './context/GameContext';

import MiniGames from './pages/MiniGames';
import KeplerImages from './pages/KeplerImages';
import GameMode from './pages/GameMode';

function App() {
  return (
    <>
      <GameProvider>
        <Router>
          <BackgroundMusic />

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/history" element={<StoryPage />} />
            <Route path="/chapter" element={<ChapterPage />} />
            <Route path="/prologue" element={<DescriptionPage />} />
            <Route path="/minigame" element={<MiniGames />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="/kepler" element={<KeplerImages />} />
            <Route path="/game-mode" element={<GameMode />} />
          </Routes>
        </Router>
      </GameProvider>
    </>
  );
}

export default App;
