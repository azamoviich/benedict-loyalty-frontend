import { useState, useEffect } from 'react';
import { webApp } from './telegram';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (webApp?.initDataUnsafe?.user) {
      setUser(webApp.initDataUnsafe.user);
      // fake points for now
      setUser(prev => ({ ...prev, points: 1240 }));
    } else {
      // fallback for testing in browser
      setUser({
        id: 123456789,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser',
        points: 850
      });
    }
    setLoading(false);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="app">
      <Header />
      <main>
        <Profile user={user} />
        <Dashboard user={user} />
      </main>
    </div>
  );
}