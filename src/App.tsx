import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Logbook } from './pages/Logbook';
import { Profile } from './pages/Profile';
import { VoiceChat } from './pages/VoiceChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logbook" element={<Logbook />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/voice-chat" element={<VoiceChat />} />
      </Routes>
    </Router>
  );
}

export default App;