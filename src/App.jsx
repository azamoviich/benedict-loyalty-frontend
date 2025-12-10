import { useState, useEffect } from 'react';
import { webApp } from './telegram';
import HomeTab from './components/tabs/HomeTab';
import RewardsTab from './components/tabs/RewardsTab';
import Profile from './components/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log('Telegram WebApp object:', webApp);

      if (webApp?.initDataUnsafe?.user) {
        console.log('Real Telegram user:', webApp.initDataUnsafe.user);
        setUser({ ...webApp.initDataUnsafe.user, points: 1240 });
      } else {
        // Running in browser or cached bad state
        console.warn('No Telegram user – using fallback');
        setUser({ first_name: 'Guest', last_name: '', points: 1240 });
      }

      webApp?.expand();
      webApp?.ready();
    } catch (err) {
      console.error('WebApp crashed:', err);
      setError(err.message);
      // Fallback data so app never stays white
      setUser({ first_name: 'Error Mode', points: 999 });
    }
  }, []);

  if (error) {
    return <div style={{padding:50, textAlign:'center', color:'red'}}>Error: {error}</div>;
  }

  return (
    <div className="app" style={{minHeight: '100vh', paddingBottom: '80px'}}>
      <div className="header">
        <h1>Benedict</h1>
      </div>

      {activeTab === 'home' && <HomeTab user={user} />}
      {activeTab === 'rewards' && <RewardsTab />}
      {activeTab === 'profile' && <Profile user={user} />}

      <div className="tabs">
        <div className={`tab ${activeTab==='home'?'active':''}`} onClick={()=>setActiveTab('home')}>
          Home
        </div>
        <div className={`tab ${activeTab==='rewards'?'active':''}`} onClick={()=>setActiveTab('rewards')}>
          Rewards
        </div>
        <div className={`tab ${activeTab==='profile'?'active':''}`} onClick={()=>setActiveTab('profile')}>
          Profile
        </div>
      </div>
    </div>
  );
}