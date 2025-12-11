import { useState, useEffect } from 'react';
import axios from 'axios';
import { QrCode, User, Home, Gift, ShoppingBag, Info } from 'lucide-react';

const API_URL = 'https://benedict-loyalty-backend.vercel.app/api'; // ← твой бэкенд

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'check' | 'register' | 'main'>('check');

  // Регистрация
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

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

    const res = await axios.post(`${API_URL}/register`, {
      telegramId,
      phone,
      name,
      surname
    });

    setUser(res.data.user);
    setStep('main');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
        <div className="text-xl text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (step === 'register') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Регистрация</h1>
          
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-white text-lg"
            />
            <input
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-white text-lg"
            />
            <input
              placeholder="Фамилия (необязательно)"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-white text-lg"
            />
          </div>

          <button
            onClick={register}
            className="w-full mt-8 bg-[#D4AF37] text-black font-bold py-4 rounded-2xl text-xl hover:bg-[#c49b2e] transition"
          >
            Продолжить
          </button>
        </div>
      </div>
    );
  }

  // Главный экран — 100% твой Figma
  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-6 text-center">
        <div className="text-4xl font-bold text-[#D4AF37] mb-2">BENEDICT</div>
        <p className="text-lg text-gray-700">Добро пожаловать, {user.name}!</p>
      </div>

      {/* Points Card */}
      <div className="mx-4 mt-6">
        <div className="bg-gradient-to-br from-[#8B6F47] to-[#6B5535] text-white rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-[#D4AF37] text-black px-4 py-1 rounded-full text-sm font-bold">
            {user.tier || 'Gold'}
          </div>
          
          <p className="text-lg opacity-90">Ваш баланс</p>
          <p className="text-6xl font-bold my-3">{user.points?.toLocaleString() || 1250}</p>
          <p className="text-lg opacity-90 mb-6">баллов</p>

          <div className="bg-white/20 rounded-full h-3 mb-4">
            <div className="bg-[#D4AF37] h-full rounded-full w-[71%]" />
          </div>
          <p className="text-sm opacity-80">До следующего уровня: {user.nextTierPoints || 500} баллов</p>

          <div className="flex justify-around mt-6 text-sm">
            <div>
              <p>Этот месяц</p>
              <p className="font-bold">+1 250 000 UZS</p>
            </div>
            <div>
              <p>Всего потрачено</p>
              <p className="font-bold">28 500 000 UZS</p>
            </div>
          </div>

          <button className="mt-8 bg-white/20 backdrop-blur px-8 py-4 rounded-2xl font-bold text-lg w-full">
            Показать мой QR-код
          </button>
        </div>
      </div>

      {/* Loyalty Levels */}
      <div className="mx-4 mt-8">
        <h3 className="text-xl font-bold mb-4 px-2">Уровни лояльности</h3>
        <div className="space-y-3">
          <div className="bg-gray-100 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="font-bold">SILVER</p>
              <p className="text-sm text-gray-600">Начальный уровень</p>
            </div>
            <p className="text-gray-600">1% кэшбэк</p>
          </div>
          
          <div className="bg-orange-50 border-2 border-[#D4AF37] rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="font-bold text-orange-700">GOLD • Текущий</p>
              <p className="text-sm">10M+ UZS</p>
            </div>
            <p className="font-bold text-orange-700">2% кэшбэк</p>
          </div>
          
          <div className="bg-gray-100 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="font-bold">VIP</p>
              <p className="text-sm text-gray-600">20M+ UZS</p>
            </div>
            <p className="text-gray-600">2.5% кэшбэк</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-[#D4AF37]">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Главная</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Gift className="w-6 h-6" />
            <span className="text-xs mt-1">Награды</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs mt-1">Заказы</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Info className="w-6 h-6" />
            <span className="text-xs mt-1">О нас</span>
          </button>
         </div>
      </div>
    </div>
  );
}