import { useState, useEffect } from 'react';
import HomeTab from './components/tabs/HomeTab';
import RewardsTab from './components/tabs/RewardsTab';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user] = useState({ first_name: 'Guest', points: 1240 });

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#D4AF37' }}>Benedict</h1>

      {activeTab === 'home' && <HomeTab user={user} />}
      {activeTab === 'rewards' && <RewardsTab />}
      {activeTab === 'profile' && <Profile user={user} />}

      <div style={{ position: 'fixed', bottom: 20, left: 20, right: 20, display: 'flex', background: '#f0f0f0', borderRadius: 16, padding: 8 }}>
        <button onClick={() => setActiveTab('home')} style={{ flex: 1, padding: 16, background: activeTab==='home' ? '#D4AF37' : 'transparent', borderRadius: 12, fontWeight: 'bold' }}>Home</button>
        <button onClick={() => setActiveTab('rewards')} style={{ flex: 1, padding: 16, background: activeTab==='rewards' ? '#D4AF37' : 'transparent', borderRadius: 12, fontWeight: 'bold' }}>Rewards</button>
        <button onClick={() => setActiveTab('profile')} style={{ flex: 1, padding: 16, background: activeTab==='profile' ? '#D4AF37' : 'transparent', borderRadius: 12, fontWeight: 'bold' }}>Profile</button>
      </div>
    </div>
  );
}

export default App;