import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistantModal from './components/AIAssistantModal';

import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Faculty from './pages/Faculty';
import Facilities from './pages/Facilities';
import Admissions from './pages/Admissions';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Achievements from './pages/Achievements';
import Downloads from './pages/Downloads';
import CalendarPage from './pages/CalendarPage';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Policies from './pages/Policies';

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar onOpenAi={() => setIsAiOpen(true)} />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home onOpenAi={() => setIsAiOpen(true)} />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies" element={<Policies />} />
          </Routes>
        </main>

        <Footer />

        <AIAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
