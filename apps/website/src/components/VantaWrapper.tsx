'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIAssistantModal from './AIAssistantModal';
import VantaBirdsBg from './VantaBirdsBg';

export default function VantaWrapper({ children }: { children: React.ReactNode }) {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <VantaBirdsBg />
      <Navbar onOpenAi={() => setIsAiOpen(true)} />

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <Footer />
      <AIAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}
