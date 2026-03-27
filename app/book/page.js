'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { getTrains, updateTrainSeats } from '../../data/trains';
import { getCurrentUser, addBooking } from '../../lib/auth';
import styles from './book.module.css';
import { CreditCard, Smartphone, Building, CheckCircle, Loader2 } from 'lucide-react';

function BookContent() {
  const searchParams = useSearchParams();
  const trainId = searchParams.get('trainId');
  const date = searchParams.get('date');
  const router = useRouter();
  
  const [train, setTrain] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [passengerAge, setPassengerAge] = useState('');
  const [seatType, setSeatType] = useState('Sleeper');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Processing, 4: Success
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = getCurrentUser();
    if(!session) {
      router.push('/login');
      return;
    }
    setUser(session);

    const t = getTrains().find(tr => tr.id === trainId);
    if(t) setTrain(t);
  }, [trainId, router]);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = () => {
    setStep(3);
    setTimeout(() => {
      // Simulate successful booking
      const bookingData = {
        train,
        date,
        passengerName,
        passengerAge,
        seatType,
        paymentMethod,
        total: train.price
      };
      
      const confirmed = addBooking(bookingData);
      updateTrainSeats(train.id, 1);
      setStep(4);
      
      // Delay redirect to see success state
      setTimeout(() => {
        router.push('/my-bookings');
      }, 3000);
    }, 2500);
  };

  if(!train || !user) return <div className="container" style={{padding: '2rem'}}>Loading...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem', maxWidth: '1000px' }}>
      <h1 className={styles.pageTitle}>Train Reservation</h1>
      
      {step === 1 && (
        <div className={styles.bookGrid}>
          <div className={styles.summaryCard}>
             <h3>Journey Summary</h3>
             <div className={styles.detail}><span>Train:</span> <strong>{train.name}</strong></div>
             <div className={styles.detail}><span>Route:</span> <strong>{train.fromCity} - {train.toCity}</strong></div>
             <div className={styles.detail}><span>Date:</span> <strong>{new Date(date).toDateString()}</strong></div>
             <div className={styles.detail}><span>Price:</span> <strong>₹{train.price}</strong></div>
          </div>
          
          <form onSubmit={handleNext} className={styles.paymentCard}>
             <h3>Passenger Details</h3>
             <div className={styles.formGroup}>
               <label>Full Name</label>
               <input type="text" value={passengerName} onChange={e=>setPassengerName(e.target.value)} required placeholder="As per ID proof" />
             </div>
             <div className={styles.formGroup}>
               <label>Age</label>
               <input type="number" min="1" max="100" value={passengerAge} onChange={e=>setPassengerAge(e.target.value)} required placeholder="Years" />
             </div>
             <div className={styles.formGroup}>
               <label>Seat Preference</label>
               <select value={seatType} onChange={e=>setSeatType(e.target.value)}>
                 <option>Sleeper</option>
                 <option>AC 3 Tier</option>
                 <option>AC 2 Tier</option>
                 <option>AC First Class</option>
               </select>
             </div>
             <button type="submit" className={styles.payBtn}>Proceed to Payment</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className={styles.paymentContainer}>
          <div className={styles.paymentOptions}>
            <h3>Choose Payment Method</h3>
            <div className={`${styles.option} ${paymentMethod === 'Card' ? styles.active : ''}`} onClick={()=>setPaymentMethod('Card')}>
              <CreditCard size={24} />
              <div>
                <strong>Credit / Debit Card</strong>
                <p>Visa, Mastercard, RuPay</p>
              </div>
            </div>
            <div className={`${styles.option} ${paymentMethod === 'UPI' ? styles.active : ''}`} onClick={()=>setPaymentMethod('UPI')}>
              <Smartphone size={24} />
              <div>
                <strong>UPI Payment</strong>
                <p>GPay, PhonePe, Paytm</p>
              </div>
            </div>
            <div className={`${styles.option} ${paymentMethod === 'NetBanking' ? styles.active : ''}`} onClick={()=>setPaymentMethod('NetBanking')}>
              <Building size={24} />
              <div>
                <strong>Net Banking</strong>
                <p>All major banks supported</p>
              </div>
            </div>
            <button onClick={handlePayment} className={styles.payBtn}>Pay ₹{train.price} Now</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.processingState}>
          <Loader2 size={64} className={styles.spinner} />
          <h2>Processing Payment...</h2>
          <p>Please do not close this window or press back.</p>
        </div>
      )}

      {step === 4 && (
        <div className={styles.successState}>
          <CheckCircle size={80} color="#16a34a" />
          <h2>Payment Successful!</h2>
          <p>Your ticket for {train.name} has been confirmed.</p>
          <div className={styles.confCard}>
            <p><strong>Passenger:</strong> {passengerName}</p>
            <p><strong>Route:</strong> {train.fromCity} to {train.toCity}</p>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
     <Suspense fallback={<div className="container" style={{padding: '2rem'}}>Loading booking details...</div>}>
       <BookContent />
     </Suspense>
  );
}
