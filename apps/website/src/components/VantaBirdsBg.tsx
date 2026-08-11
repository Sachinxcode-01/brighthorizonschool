'use client';

import React, { useEffect, useRef } from 'react';

export default function VantaBirdsBg() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any = null;

    const loadScripts = async () => {
      if (typeof window === 'undefined') return;

      // Dynamically load Three.js & Vanta if needed or init
      try {
        const THREE = await import('three');
        (window as any).THREE = THREE;

        // Load Vanta Birds script if not already present
        if (!(window as any).VANTA) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
          script.async = true;
          script.onload = () => initVanta();
          document.body.appendChild(script);
        } else {
          initVanta();
        }
      } catch (err) {
        console.warn('Vanta Birds load fallback:', err);
      }
    };

    const initVanta = () => {
      if (vantaRef.current && (window as any).VANTA) {
        vantaEffect = (window as any).VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x0d1117,
          color1: 0xff4df0,
          color2: 0xc91cff,
          birdSize: 1.2,
          speedLimit: 3.0,
          separation: 50.00
        });
      }
    };

    loadScripts();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
