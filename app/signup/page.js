'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/login.module.css'; // Reuse login styles
import Link from 'next/link';
import { Train, AlertCircle, User, Mail, Lock } from 'lucide-react';
import { signup } from '../../lib/auth';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    try {
      signup(name, email, password);
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Train size={42} color="var(--primary)" />
          <h1>Create Account</h1>
          <p>Join FastTrack and book tickets easily</p>
        </div>
        
        {error && (
          <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} required placeholder="John Doe" />
          </div>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" minLength="6" />
          </div>
          <button type="submit" className={styles.submitBtn}>Sign Up</button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
