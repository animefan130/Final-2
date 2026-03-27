'use client';
import styles from './Hero.module.css';
import { useState } from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if(from && to && date) {
      router.push(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Book Your Next Journey</h1>
        <p>Fast, secure, and reliable train reservations across the network.</p>
        
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.formGroup}>
            <label><MapPin size={18} /> From</label>
            <input type="text" placeholder="Departure City" value={from} onChange={e=>setFrom(e.target.value)} required />
          </div>
          
          <div className={styles.formGroup}>
            <label><MapPin size={18} /> To</label>
            <input type="text" placeholder="Arrival City" value={to} onChange={e=>setTo(e.target.value)} required />
          </div>
          
          <div className={styles.formGroup}>
            <label><Calendar size={18} /> Date</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} required />
          </div>
          
          <button type="submit" className={styles.searchBtn}>
            <Search size={20} />
            Search Trains
          </button>
        </form>
      </div>
    </section>
  );
}
