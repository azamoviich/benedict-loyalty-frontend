import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'benedict-loyalty-backend.railway.internal'; // ← замени на свой

export default function App() {
  const [step, setStep] = useState('loading'); // loading → register → main
  const [user, setUser] = useState(null);

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const telegramId = tg.initDataUnsafe?.user?.id?.toString();
    if (!telegramId) {
      setStep('error');
      return;
    }

    // Проверяем, есть ли уже пользователь
    axios.post(`${API}/me`, { telegramId })
      .then(res => {
        if (res.data.user) {
          setUser(res.data.user);
          setStep('main');
        } else {
          setStep('register');
        }
      })
      .catch(() => setStep('register'));
  }, []);

  const handleRegister = async () => {
    const tg = window.Telegram.WebApp;
    const telegramId = tg.initDataUnsafe.user.id.toString();

    const res = await axios.post(`${API}/register`, {
      telegramId,
      phone,
      name,
      surname,
      birthdate: birthdate || null
    });

    setUser(res.data.user);
    setStep('main');
  };

  if (step === 'loading') return <div style={{padding:50, textAlign:'center'}}>Загрузка...</div>;
  if (step === 'error') return <div style={{padding:50, textAlign:'center', color:'red'}}>Ошибка Telegram</div>;

  if (step === 'register') return (
    <div style={{padding: '30px 20px', maxWidth: 400, margin: '0 auto'}}>
      <h2 style={{textAlign:'center', marginBottom:30}}>Регистрация</h2>

      <input type="tel" placeholder="+7 (999) 999-99-99" value={phone}
        onChange={e => setPhone(e.target.value)}
        style={{width:'100%', padding:14, marginBottom:16, borderRadius:12, border:'1px solid #ccc'}} />

      <input placeholder="Имя" value={name} onChange={e=>setName(e.target.value)}
        style={{width:'100%', padding:14, marginBottom:16, borderRadius:12, border:'1px solid #ccc'}} />

      <input placeholder="Фамилия" value={surname} onChange={e=>setSurname(e.target.value)}
        style={{width:'100%', padding:14, marginBottom:16, borderRadius:12, border:'1px solid #ccc'}} />

      <input type="date" value={birthdate} onChange={e=>setBirthdate(e.target.value)}
        style={{width:'100%', padding:14, marginBottom:30, borderRadius:12, border:'1px solid #ccc'}} />

      <button onClick={handleRegister}
        style={{width:'100%', padding:16, background:'#D4AF37', color:'black', border:'none', borderRadius:12, fontSize:18, fontWeight:'bold'}}>
        Завершить регистрацию
      </button>
    </div>
  );

  // Главный экран после регистрации
  return (
    <div style={{padding: '40px 20px', textAlign:'center'}}>
      <h1>Добро пожаловать!</h1>
      <h2>{user.name} {user.surname}</h2>
      <p style={{fontSize:20, margin:'30px 0'}}>Ваш баланс: <strong>{user.balance} баллов</strong></p>
      <p>Скоро здесь будет красивый дизайн из Figma</p>
    </div>
  );
}