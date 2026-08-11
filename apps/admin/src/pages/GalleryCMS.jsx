import React, { useEffect, useState } from 'react';
import { Image, Plus } from 'lucide-react';
import { adminApi } from '../services/api';

export default function GalleryCMS() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    adminApi.resource('gallery').getAll().then(res => res.success && setGallery(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Photo & Video Gallery CMS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Upload campus photos, manage albums, and reorder public gallery items.</p>
      </div>

      <div className="grid-admin-2">
        {gallery.map(alb => (
          <div key={alb.id} className="admin-card">
            <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '8px' }}>{alb.title}</h3>
            <span className="badge-status badge-active" style={{ marginBottom: '12px' }}>{alb.category}</span>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginTop: '12px' }}>
              {alb.images?.map(img => (
                <img key={img.id} src={img.url} alt={img.caption} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
