import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bot, ShieldCheck, GraduationCap } from 'lucide-react';

export default function Navbar({ onOpenAi }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
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
      background: 'rgba(10, 15, 29, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '75px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <GraduationCap size={26} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', display: 'block', lineHeight: 1.1 }}>
              Bright Horizon
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              Public School
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="desktop-menu">
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    borderBottom: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                    paddingBottom: '4px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* AI Assistant button */}
          <button
            onClick={onOpenAi}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Bot size={18} />
            AI Assistant
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'none'
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{
          background: 'var(--bg-surface)',
          padding: '20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  color: location.pathname === link.path ? 'var(--accent-cyan)' : 'var(--text-main)',
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
              className="btn btn-primary"
              style={{ marginTop: '10px', justifyContent: 'center' }}
            >
              <Bot size={18} />
              AI School Assistant
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
