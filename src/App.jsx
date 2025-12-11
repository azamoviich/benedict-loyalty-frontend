import { useState, useEffect } from 'react';
import axios from 'axios';
import { QrCode, Home, Gift, ShoppingBag, Info } from 'lucide-react';

const API_URL = 'https://benedict-loyalty-backend.vercel.app/api'; // ← твой бэкенд

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState('check');

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready(); tg.expand();

    const telegramId = tg.initDataUnsafe?.user?.id?.toString();
    if (!telegramId) return;

    axios.post(`${API_URL}/me`, { telegramId })
      .then(res => {
        if (res.data.user) {
          setUser(res.data.user);
          setStep('main');
        } else {
          setStep('register');
        }
      })
      .catch(() => setStep('register'))
      .finally(() => setLoading(false));
  }, []);

  const register = async () => {
    const tg = window.Telegram.WebApp;
    const telegramId = tg.initDataUnsafe.user.id.toString();
    const res = await axios.post(`${API_URL}/register`, { telegramId, phone, name, surname });
    setUser(res.data.user);
    setStep('main');
  };

  if (loading) return <div style={{padding: 'center', minHeight: '100vh' }}>Загрузка...</div>;

  if (step === 'register') return (
    <div style={{padding: '40px 20px', textAlign: 'center', background: '#fafafa', minHeight: '100vh'}}>
      <h1 style={{fontSize: '32px', marginBottom: '40px'}}>Регистрация</h1>
      <input placeholder="+998 90 123 45 67" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%', padding:'16px', marginBottom:'16px', borderRadius:'16px', border:'1px solid #ccc'}} />
      <input placeholder="Имя" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%', padding:'16px', marginBottom:'16px', borderRadius:'16px', border:'1px solid #ccc'}} />
      <input placeholder="Фамилия" value={surname} onChange={e=>setSurname(e.target.value)} style={{width:'100%', padding:'16px', marginBottom:'40px', borderRadius:'16px', border:'1px solid #ccc'}} />
      <button onClick={register} style={{width:'100%', padding:'18px', background:'#D4AF37', color:'black', border:'none', borderRadius:'16px', fontSize:'20px', fontWeight:'bold'}}>
        Продолжить
      </button>
    </div>
  );

  return (
    <div style={{background:'#fafafa', minHeight:'100vh', paddingBottom:'100px'}}>
      <div style={{background:'white', padding:'30px', textAlign:'center'}}>
        <h1 style={{fontSize:'48px', color:'#D4AF37', fontWeight:'bold'}}>BENEDICT</h1>
        <p style={{fontSize:'20px', marginTop:'10px'}}>Добро пожаловать, {user.name}!</p>
      </div>

      <div style={{padding:'20px'}}>
        <div style={{background:'linear-gradient(135deg, #8B6F47, #6B5535)', color:'white', padding:'40px', borderRadius:'32px', textAlign:'center'}}>
          <div style={{position:'absolute', top:'20px', right:'20px', background:'#D4AF37', color:'black', padding:'8px 20px', borderRadius:'30px', fontWeight:'bold'}}>
            Gold
          </div>
          <p>Ваш баланс</p>
          <p style={{fontSize:'72px', fontWeight:'bold', margin:'20px 0'}}>{user.points || 1250}</p>
          <p>баллов</p>
          <button style={{marginTop:'30px', background:'rgba(255,255,255,0.3)', padding:'16px', width:'100%', borderRadius:'20px', fontSize:'18px', fontWeight:'bold'}}>
            Показать мой QR-код
          </button>
        </div>

        <h3 style={{margin:'40px 0 20px', fontSize:'24px'}}>Уровни лояльности</h3>
        <div style={{background:'#fff3e0', border:'2px solid #D4AF37', padding:'20px', borderRadius:'20px', textAlign:'center', fontWeight:'bold', color:'#d97706'}}>
          GOLD • Текущий уровень • 2% кэшбэк
        </div>
      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'white', padding:'15px 0', borderTop:'1px solid #eee'}}>
        <div style={{display:'flex', justifyContent:'space-around'}}>
          <button style={{color:'#D4AF37'}}><Home size={28} /></button>
          <button style={{color:'#888'}}><Gift size={28} /></button>
          <button style={{color:'#888'}}><ShoppingBag size={28} /></button>
          <button style={{color:'#888'}}><Info size={28} /></button>
        </div>
      </div>
    </div>
  );
}