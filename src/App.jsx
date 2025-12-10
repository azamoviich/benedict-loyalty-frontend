import { useState, useEffect } from 'react';
import { webApp } from './telegram';
import HomeTab from './components/tabs/HomeTab';
import RewardsTab from './components/tabs/RewardsTab';
import Profile from './components/Profile';          // ← this one matches your folder

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (webApp?.initDataUnsafe?.user) {
      setUser({ ...webApp.initDataUnsafe.user, points: 1240 });
    } else {
      // fallback when testing in browser
      setUser({ first_name: "Guest", points: 1240 });
    }
    webApp?.expand();
  }, []);

  if (!user) return <div style={{padding:50, textAlign:'center'}}>Loading…</div>;

  return (
    <div className="app">
      <div className="header">
        <h1>Benedict</h1>
      </div>

      {activeTab === 'home' && <HomeTab user={user} />}
      {activeTab === 'rewards' && <RewardsTab />}
      {activeTab === 'profile' && <Profile user={user} />}

      <div className="tabs">
        <div className={`tab ${activeTab==='home'?'active':''}`} onClick={()=>setActiveTab('home')}>Home</div>
        <div className={`tab ${activeTab==='rewards'?'active':''}`} onClick={()=>setActiveTab('rewards')}>Rewards</div>
        <div className={`tab ${activeTab==='profile'?'active':''}`} onClick={()=>setActiveTab('profile')}>Profile</div>
      </div>
    </div>
  );
}