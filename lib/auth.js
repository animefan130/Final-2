// Root lib/auth.js

export const signup = (name, email, password) => {
  if (typeof window === 'undefined') return;
  const users = JSON.parse(localStorage.getItem('users_db') || '[]');
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }
  const newUser = { id: Date.now().toString(), name, email, password, bookings: [] };
  localStorage.setItem('users_db', JSON.stringify([...users, newUser]));
  return newUser;
};

export const login = (email, password) => {
  if (typeof window === 'undefined') return;
  const users = JSON.parse(localStorage.getItem('users_db') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  localStorage.setItem('auth_session', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
  return user;
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_session');
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem('auth_session');
  return session ? JSON.parse(session) : null;
};

// Bookings
export const addBooking = (bookingData) => {
  if (typeof window === 'undefined') return;
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Please login to book tickets');

  const pnr = Math.random().toString(36).substring(2, 10).toUpperCase();
  const booking = { ...bookingData, pnr, userId: currentUser.id, status: 'Confirmed' };

  const allBookings = JSON.parse(localStorage.getItem('bookings_db') || '[]');
  localStorage.setItem('bookings_db', JSON.stringify([...allBookings, booking]));

  return booking;
};

export const getUserBookings = () => {
  if (typeof window === 'undefined') return [];
  const currentUser = getCurrentUser();
  if (!currentUser) return [];
  const allBookings = JSON.parse(localStorage.getItem('bookings_db') || '[]');
  return allBookings.filter(b => b.userId === currentUser.id);
};

export const cancelBooking = (pnr) => {
  const allBookings = JSON.parse(localStorage.getItem('bookings_db') || '[]');
  const updated = allBookings.map(b => b.pnr === pnr ? { ...b, status: 'Cancelled' } : b);
  localStorage.setItem('bookings_db', JSON.stringify(updated));
  return updated;
};
