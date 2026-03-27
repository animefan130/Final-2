'use client';
import Link from 'next/link';
import { Train, User, Menu, LogOut } from 'lucide-react';
import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = getCurrentUser();
    if(session) setUser(session);

    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };
    window.addEventListener('authChange', handleStorageChange);
    return () => window.removeEventListener('authChange', handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
    window.dispatchEvent(new Event('authChange'));
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Train size={32} />
          <span>FastTrack</span>
        </Link>
        <div className={styles.desktopMenu}>
          <Link href="/search" className={styles.link}>Search Trains</Link>
          <Link href="/my-bookings" className={styles.link}>My Bookings</Link>
          
          {user ? (
            <div className={styles.userSection}>
              <span className={styles.userName}>Hi, {user.name}</span>
              <button onClick={handleLogout} className={styles.btnLogout}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link href="/login" className={styles.btnOutline}>Login</Link>
              <Link href="/signup" className={styles.btnPrimary}>Sign Up</Link>
            </div>
          )}
        </div>
        <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>
      </div>
      {isOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/search" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Search Trains</Link>
          <Link href="/my-bookings" className={styles.mobileLink} onClick={() => setIsOpen(false)}>My Bookings</Link>
          {user ? (
             <button onClick={() => { handleLogout(); setIsOpen(false); }} className={styles.mobileLink} style={{ textAlign: 'left' }}>
                Logout ({user.name})
             </button>
          ) : (
             <>
               <Link href="/login" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Login</Link>
               <Link href="/signup" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Sign Up</Link>
             </>
          )}
        </div>
      )}
    </nav>
  );
}
