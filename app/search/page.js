'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { searchTrains, getTrains } from '../../data/trains';
import styles from './search.module.css';
import { ArrowRight, Clock, Users, MapPin } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const res = searchTrains(from, to, date);
    setResults(res);
  }, [from, to, date]);

  const router = useRouter();
  
  const handleBook = (train) => {
     router.push(`/book?trainId=${train.id}&date=${date}`);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div className={styles.header}>
        <h1>Search Results</h1>
        <p className={styles.route}>
          {from || 'All Routes'} <ArrowRight size={16} /> {to || 'All Routes'} 
          {date && <span className={styles.date}> | {new Date(date).toDateString()}</span>}
        </p>
      </div>

      <div className={styles.resultsGrid}>
        {results.length === 0 ? (
          <div className={styles.noResults}>
             <h3>No trains found for this route.</h3>
             <p>Try searching different cities (e.g., Delhi to Mumbai) or dates.</p>
          </div>
        ) : (
          results.map(train => (
             <div key={train.id} className={styles.trainCard}>
               <div className={styles.cardHeader}>
                 <h3>{train.name} <span>({train.id})</span></h3>
                 <span className={styles.typeBadge}>{train.type}</span>
               </div>
               
               <div className={styles.journeyInfo}>
                 <div className={styles.timeBlock}>
                   <span className={styles.time}>{train.departure}</span>
                   <span className={styles.city}>{train.fromCity}</span>
                 </div>
                 
                 <div className={styles.durationBlock}>
                   <Clock size={16} />
                   <span>{train.duration}</span>
                   <div className={styles.line}></div>
                 </div>
                 
                 <div className={styles.timeBlock}>
                   <span className={styles.time}>{train.arrival}</span>
                   <span className={styles.city}>{train.toCity}</span>
                 </div>
               </div>

               <div className={styles.statusRow}>
                  <div className={styles.seatInfo}>
                    <Users size={16} />
                    <span className={train.seats > 0 ? styles.seatsAvailable : styles.seatsFull}>
                      {train.seats > 0 ? `${train.seats} Seats Available` : 'Sold Out'}
                    </span>
                  </div>
               </div>

               <div className={styles.cardFooter}>
                 <div className={styles.price}>
                    <span style={{ fontSize: '1.25rem', marginRight: '4px' }}>₹</span>
                    <span>{train.price}</span>
                 </div>
                 <button 
                  className={styles.bookBtn} 
                  onClick={() => handleBook(train)}
                  disabled={train.seats === 0}
                 >
                   {train.seats === 0 ? 'Waitlisted' : 'Book Now'}
                 </button>
               </div>
             </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container" style={{padding: '2rem'}}>Loading results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
