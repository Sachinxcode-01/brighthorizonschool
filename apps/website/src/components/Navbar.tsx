'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bot, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onOpenAi: () => void;
}

export default function Navbar({ onOpenAi }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Events & News', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(13, 17, 23, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '75px'
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ff4df0, #c91cff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 0 15px #ff4df0'
          }}>
            <GraduationCap size={26} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', display: 'block', lineHeight: 1.1, textShadow: '0 0 10px #ff4df0' }}>
              Bright Horizon
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              Public School
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="hidden lg:flex">
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--accent-pink)' : 'var(--text-muted)',
                    borderBottom: isActive ? '2px solid var(--accent-pink)' : '2px solid transparent',
                    paddingBottom: '4px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <button
            onClick={onOpenAi}
            className="btn-glow"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Bot size={18} />
            AI Assistant
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          className="block lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          background: 'var(--bg-surface)',
          padding: '20px',
          borderBottom: '1px solid var(--border-color)'
        }} className="block lg:hidden">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  color: pathname === link.path ? 'var(--accent-pink)' : 'var(--text-main)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  padding: '6px 0'
                }}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => { setIsOpen(false); onOpenAi(); }}
              className="btn-glow"
              style={{ marginTop: '10px', justifyContent: 'center' }}
            >
              <Bot size={18} />
              AI School Assistant
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
