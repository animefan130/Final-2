'use client';
import { getTrains } from '@/data/trains';
import { useEffect, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function TrainsList() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Switch to relative path to bypass complex folder name resolution issues
    const { getSavedTrains } = require('../data/trains');
    setTrains(getSavedTrains().slice(0, 3));
  }, []);

  if (trains.length === 0) return null;

  return (
    <section className="container" style={{ padding: '0 1rem 4rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem', color: 'var(--primary)' }}>
        Recommended Trains
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {trains.map(train => (
          <div key={train.id} style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{train.name}</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>#{train.id}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308' }}>
                <Star size={16} fill="currentColor" />
                <span style={{ fontWeight: 600 }}>4.8</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 600 }}>{train.fromCity}</span>
              <ArrowRight size={16} />
              <span style={{ fontWeight: 600 }}>{train.toCity}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.25rem' }}>
                ₹{train.price}
              </div>
              <Link 
                href={`/search?from=${train.fromCity}&to=${train.toCity}`}
                style={{ 
                  backgroundColor: 'var(--primary)', 
                  color: 'white', 
                  padding: '0.5rem 1rem', 
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
