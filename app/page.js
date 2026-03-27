'use client';
import Hero from "../components/Hero";
import TrainsList from "../components/TrainsList";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <TrainsList />
      
      <section className="container" style={{ padding: '0 1rem 4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem', color: 'var(--primary)' }}>
          Popular Destinations
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem',
          justifyContent: 'center'
        }}>
          {[
            { name: 'Mumbai', desc: 'The City of Dreams', count: '450+ Trains', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=60&w=400' },
            { name: 'New Delhi', desc: 'Historic Capital', count: '600+ Trains', img: 'https://images.unsplash.com/photo-1587474260584-1f20d42b6245?q=60&w=400' },
            { name: 'Bengaluru', desc: 'Garden City', count: '300+ Trains', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=60&w=400' },
            { name: 'Lucknow', desc: 'City of Nawabs', count: '200+ Trains', img: 'https://plus.unsplash.com/premium_photo-1697730430283-7e4456c78375?q=60&w=400' },
            { name: 'Pune', desc: 'Oxford of East', count: '180+ Trains', img: 'https://images.unsplash.com/photo-1614716194506-ef3694ae131a?q=60&w=400' },
            { name: 'Kanpur', desc: 'Leather City', count: '150+ Trains', img: 'https://images.unsplash.com/photo-1625751950109-394d683833d0?q=60&w=400' }
          ].map((dest, i) => (
             <div key={i} style={{ 
                height: '240px', 
                backgroundColor: '#1e293b', 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 50%, transparent 100%), url('${dest.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 1
             }}
             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
             >
               <div style={{ position: 'relative', zIndex: 10 }}>
                 <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                   {dest.name}
                 </h3>
                 <p style={{ margin: '0.25rem 0', opacity: 0.95, fontSize: '0.95rem', color: '#f8fafc', fontWeight: 500 }}>
                   {dest.desc}
                 </p>
                 <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#fbbf24' }}></span>
                    {dest.count}
                 </div>
               </div>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}
