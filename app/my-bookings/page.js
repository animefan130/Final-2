'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserBookings, cancelBooking, getCurrentUser } from '../../lib/auth';
import styles from './bookings.module.css';
import { Train, Calendar, Ticket, XCircle, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = getCurrentUser();
    if (!session) {
      router.push('/login');
      return;
    }
    setUser(session);
    setBookings(getUserBookings());
  }, [router]);

  const handleCancel = (pnr) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(pnr);
      setBookings(getUserBookings());
    }
  };

  if (!user) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--primary)', fontWeight: 800 }}>
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <Ticket size={64} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No bookings found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You haven't booked any train tickets yet.</p>
          <Link href="/search" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>
            Start Searching
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {bookings.map((booking) => (
            <div key={booking.pnr} style={{ 
              background: 'var(--surface)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '2rem', 
              boxShadow: 'var(--shadow-sm)', 
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Train color="var(--primary)" size={18} />
                   <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{booking.train.name} </span>
                   <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(#{booking.train.id})</span>
                 </div>
                 <div style={{ background: booking.status === 'Confirmed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: booking.status === 'Confirmed' ? '#16a34a' : '#ef4444', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>
                   {booking.status.toUpperCase()}
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PNR NUMBER</span>
                    <span style={{ fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px' }}>{booking.pnr}</span>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>JOURNEY DATE</span>
                    <span style={{ fontWeight: 700 }}>{new Date(booking.date).toDateString()}</span>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PASSENGER</span>
                    <span style={{ fontWeight: 700 }}>{booking.passengerName}</span>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ROUTE</span>
                    <span style={{ fontWeight: 700 }}>{booking.train.fromCity} ➔ {booking.train.toCity}</span>
                 </div>
              </div>

              {booking.status === 'Confirmed' && (
                <button 
                  onClick={() => handleCancel(booking.pnr)}
                  style={{ alignSelf: 'flex-start', color: '#ef4444', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <XCircle size={16} /> Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
