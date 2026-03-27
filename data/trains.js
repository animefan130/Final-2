// Root data/trains.js

export const initialTrains = [
  { 
    id: '12001', 
    name: 'Shatabdi Express', 
    fromCity: 'Delhi', 
    toCity: 'Mumbai', 
    departure: '06:00', 
    arrival: '22:00', 
    duration: '16h', 
    price: 2500, 
    type: 'AC First Class',
    seats: 45
  },
  { 
    id: '12951', 
    name: 'Rajdhani Express', 
    fromCity: 'Delhi', 
    toCity: 'Mumbai', 
    departure: '16:30', 
    arrival: '08:35', 
    duration: '16h 5m', 
    price: 3000, 
    type: 'AC First Class',
    seats: 12 
  },
  { 
    id: '12229', 
    name: 'Lucknow Mail', 
    fromCity: 'Delhi', 
    toCity: 'Lucknow', 
    departure: '22:00', 
    arrival: '06:50', 
    duration: '8h 50m', 
    price: 1200, 
    type: 'AC 2 Tier',
    seats: 60
  },
  { 
    id: '12004', 
    name: 'Swarna Shatabdi', 
    fromCity: 'Delhi', 
    toCity: 'Kanpur', 
    departure: '06:10', 
    arrival: '11:05', 
    duration: '4h 55m', 
    price: 1100, 
    type: 'AC Chair Car',
    seats: 30
  },
  { 
    id: '12925', 
    name: 'Paschim Express', 
    fromCity: 'Mumbai', 
    toCity: 'Delhi', 
    departure: '11:25', 
    arrival: '10:40', 
    duration: '23h 15m', 
    price: 1800, 
    type: 'Sleeper',
    seats: 120
  },
  { 
    id: '22221', 
    name: 'Vande Bharat', 
    fromCity: 'Mumbai', 
    toCity: 'Pune', 
    departure: '06:00', 
    arrival: '09:00', 
    duration: '3h', 
    price: 900, 
    type: 'Executive Chair Car',
    seats: 80
  },
  { 
    id: '12627', 
    name: 'Karnataka Express', 
    fromCity: 'Bangalore', 
    toCity: 'Delhi', 
    departure: '19:20', 
    arrival: '09:00', 
    duration: '37h 40m', 
    price: 2100, 
    type: 'AC 3 Tier',
    seats: 50
  },
];

export const getTrains = () => {
  // Always return initialTrains for both SSR and the VERY INITIAL client mount to avoid hydration mismatch.
  return initialTrains;
};

// Client-only getter for persistence
export const getSavedTrains = () => {
  if (typeof window === 'undefined') return initialTrains;
  const saved = localStorage.getItem('trains_db');
  if (saved) return JSON.parse(saved);
// PERSISTENCE UTILS FOR ADMIN
export const addTrain = (train) => {
  const trains = getSavedTrains();
  const updated = [...trains, train];
  localStorage.setItem('trains_db', JSON.stringify(updated));
  return updated;
};

export const deleteTrain = (id) => {
  const trains = getSavedTrains();
  const updated = trains.filter(t => t.id !== id);
  localStorage.setItem('trains_db', JSON.stringify(updated));
  return updated;
};

export const updateTrainSeats = (id, count) => {
  const trains = getSavedTrains();
  const updated = trains.map(t => t.id === id ? { ...t, seats: Math.max(0, t.seats - count) } : t);
  localStorage.setItem('trains_db', JSON.stringify(updated));
  return updated;
};

export const searchTrains = (from, to, date) => {
  const allTrains = getTrains();
  if(!from || !to) return allTrains;
  return allTrains.filter(t => 
    t.fromCity.toLowerCase() === from.toLowerCase() && 
    t.toCity.toLowerCase() === to.toLowerCase()
  );
};
