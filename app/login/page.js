'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import Link from 'next/link';
import { Train, AlertCircle } from 'lucide-react';
import { login } from '../../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    try {
      login(email, password);
      window.dispatchEvent(new Event('authChange'));
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Train size={42} color="var(--primary)" />
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        
        {error && (
          <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className={styles.submitBtn}>Sign In</button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Don't have an account? <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create one</Link>
        </div>
      </div>
    </div>
  );
}
