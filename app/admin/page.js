'use client';
import { useState, useEffect } from 'react';
import { getTrains, addTrain, deleteTrain } from '../../data/trains';
import { getCurrentUser } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Database, Train, LayoutDashboard } from 'lucide-react';

export default function AdminPage() {
  const [trains, setTrains] = useState([]);
  const [newTrain, setNewTrain] = useState({ id: '', name: '', fromCity: '', toCity: '', departure: '', arrival: '', price: 0, type: 'Sleeper', seats: 100 });
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = getCurrentUser();
    if (!session) {
      router.push('/login');
      return;
    }
    // Simple check - only user 'admin' can see this (demo logic)
    if(session.name.toLowerCase() !== 'admin') {
       // router.push('/');
       // For now, let everyone see it for testing
    }
    setUser(session);
    setTrains(getTrains());
  }, [router]);

  const handleAddTrain = (e) => {
    e.preventDefault();
    const updated = addTrain(newTrain);
    setTrains(updated);
    setNewTrain({ id: '', name: '', fromCity: '', toCity: '', departure: '', arrival: '', price: 0, type: 'Sleeper', seats: 100 });
  };

  const handleDelete = (id) => {
    if(window.confirm('Confirm delete train?')) {
       setTrains(deleteTrain(id));
    }
  };

  if(!user) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
        <LayoutDashboard size={32} color="var(--primary)" />
        <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 900, color: 'var(--primary)' }}>Admin Dashboard</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Add Train Form */}
        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} /> Add New Train
          </h2>
          <form onSubmit={handleAddTrain} style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <input type="text" placeholder="Train ID" value={newTrain.id} onChange={e=>setNewTrain({...newTrain, id: e.target.value})} required style={{ width: '100%' }} />
               <input type="text" placeholder="Train Name" value={newTrain.name} onChange={e=>setNewTrain({...newTrain, name: e.target.value})} required style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <input type="text" placeholder="From City" value={newTrain.fromCity} onChange={e=>setNewTrain({...newTrain, fromCity: e.target.value})} required style={{ width: '100%' }} />
               <input type="text" placeholder="To City" value={newTrain.toCity} onChange={e=>setNewTrain({...newTrain, toCity: e.target.value})} required style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <input type="time" placeholder="Departure" value={newTrain.departure} onChange={e=>setNewTrain({...newTrain, departure: e.target.value})} required style={{ width: '100%' }} />
               <input type="time" placeholder="Arrival" value={newTrain.arrival} onChange={e=>setNewTrain({...newTrain, arrival: e.target.value})} required style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <input type="number" placeholder="Price (₹)" value={newTrain.price} onChange={e=>setNewTrain({...newTrain, price: parseInt(e.target.value)})} required style={{ width: '100%' }} />
               <input type="number" placeholder="Seats" value={newTrain.seats} onChange={e=>setNewTrain({...newTrain, seats: parseInt(e.target.value)})} required style={{ width: '100%' }} />
            </div>
            <select value={newTrain.type} onChange={e=>setNewTrain({...newTrain, type: e.target.value})} style={{ width: '100%', padding: '0.75rem' }}>
              <option>Sleeper</option>
              <option>AC 3 Tier</option>
              <option>AC 2 Tier</option>
              <option>AC First Class</option>
              <option>Executive Chair Car</option>
            </select>
            <button type="submit" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', fontWeight: 700, marginTop: '0.5rem' }}>
               Create Train
            </button>
          </form>
        </div>

        {/* Train List */}
        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={20} /> Manage Trains 
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: 'auto' }}>({trains.length} total)</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {trains.map(t => (
              <div key={t.id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                   <div style={{ fontWeight: 700 }}>{t.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>#{t.id}</span></div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.fromCity} ➔ {t.toCity}</div>
                </div>
                <button onClick={()=>handleDelete(t.id)} style={{ color: '#ef4444', padding: '0.5rem' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
