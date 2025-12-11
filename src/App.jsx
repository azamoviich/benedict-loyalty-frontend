import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://your-railway-app.up.railway.app/api'; // ← REPLACE WITH YOUR RAILWAY URL

export default function App() {
  const [content, setContent] = useState('Загрузка...');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        console.log('Telegram WebApp ready');
      } else {
        console.log('Running in browser mode');
      }

      const telegramId = tg?.initDataUnsafe?.user?.id?.toString() || 'browser-user-123';

      axios.post(`${API}/me`, { telegramId })
        .then(res => {
          if (res.data.user) {
            setContent(`Привет, ${res.data.user.name || 'Гость'}! Баланс: ${res.data.user.balance} баллов`);
          } else {
            setContent(
              <div>
                <h2>Регистрация</h2>
                <input placeholder="Телефон" id="phone" style={{display:'block', width:'100%', padding:10, margin:'10px 0'}} />
                <input placeholder="Имя" id="name" style={{display:'block', width:'100%', padding:10, margin:'10px 0'}} />
                <input placeholder="Фамилия" id="surname" style={{display:'block', width:'100%', padding:10, margin:'10px 0'}} />
                <input type="date" id="birthdate" style={{display:'block', width:'100%', padding:10, margin:'10px 0'}} />
                <button onClick={() => {
                  const phone = document.getElementById('phone').value;
                  const name = document.getElementById('name').value;
                  const surname = document.getElementById('surname').value;
                  const birthdate = document.getElementById('birthdate').value;
                  axios.post(`${API}/register`, { telegramId, phone, name, surname, birthdate })
                    .then(() => setContent(`Привет, ${name}! Регистрация завершена.`))
                    .catch(err => setError(err.message));
                }} style={{padding:10, background:'#D4AF37', border:'none', borderRadius:8}}>
                  Зарегистрироваться
                </button>
              </div>
            );
          }
        })
        .catch(err => {
          console.error('API error:', err);
          setError('Не удалось подключиться к серверу. Проверь Railway URL.');
        });
    } catch (err) {
      console.error('Fatal error:', err);
      setError('Критическая ошибка: ' + err.message);
    }
  }, []);

  if (error) return <div style={{padding:20, color:'red', textAlign:'center'}}>{error}</div>;

  return <div style={{padding:20, textAlign:'center'}}>{typeof content === 'string' ? content : content}</div>;
}