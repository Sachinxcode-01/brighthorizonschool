import React, { useEffect, useState } from 'react';
import { Image, PlayCircle } from 'lucide-react';
import { publicApi } from '../services/api';

export default function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    publicApi.getGallery().then(res => res.success && setAlbums(res.data));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Campus Life in Pictures</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Photo & Video Gallery</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Moments of sports victories, cultural festivals, science exhibitions, and classroom learning.
          </p>
        </div>

        {albums.map(alb => (
          <div key={alb.id} style={{ marginBottom: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '6px' }}>{alb.category}</span>
                <h2 style={{ fontSize: '1.6rem' }}>{alb.title}</h2>
              </div>
              <span style={{ color: 'var(--text-subtle)', fontSize: '0.9rem' }}>Event Date: {alb.eventDate}</span>
            </div>

            <div className="grid-3">
              {alb.images.map(img => (
                <div
                  key={img.id}
                  className="glass-card"
                  onClick={() => setSelectedImage(img)}
                  style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '14px' }}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    style={{
                      width: '100%',
                      height: '240px',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  <div style={{ padding: '14px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {img.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: '12px', marginBottom: '16px' }}
              />
              <p style={{ color: 'white', fontSize: '1.1rem' }}>{selectedImage.caption}</p>
              <div style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', marginTop: '8px' }}>Click anywhere to close</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
