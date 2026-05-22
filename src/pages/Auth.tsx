import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type AuthMode = 'login' | 'register';

function Auth() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = mode === 'register';
  const from = location.state?.from || '/';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const url =
      isRegister ?
        'https://car-auction-backend-b0ba.onrender.com/api/auth/register'
      : 'https://car-auction-backend-b0ba.onrender.com/api/auth/login';

    const body = isRegister ? { name, phone, password } : { phone, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Помилка авторизації');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('authChanged'));

      if (data.user.role === 'admin') {
        localStorage.setItem('adminAuth', 'true');
        navigate('/admin');
      } else {
        navigate(from);
      }
    } catch {
      setError('Сервер не відповідає');
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-[#151515] border border-white/10 p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          {isRegister ? t('auth.register') : t('auth.login')}
        </h1>

        <p className="text-gray-400 mb-6">
          {isRegister ? t('auth.createAccount') : t('auth.signIn')}
        </p>

        <div className="flex rounded-xl bg-[#0b0b0b] border border-white/10 p-1 mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`w-1/2 rounded-lg py-2 transition ${
              mode === 'login' ?
                'bg-orange-500 text-black font-semibold'
              : 'text-gray-400'
            }`}
          >
            {t('auth.login')}
          </button>

          <button
            type="button"
            onClick={() => setMode('register')}
            className={`w-1/2 rounded-lg py-2 transition ${
              mode === 'register' ?
                'bg-orange-500 text-black font-semibold'
              : 'text-gray-400'
            }`}
          >
            {t('auth.register')}
          </button>
        </div>

        <div className="grid gap-4">
          {isRegister && (
            <input
              type="text"
              placeholder={t('auth.name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-[#0b0b0b] border border-white/10 px-4 py-3 text-white outline-none focus:border-orange-500"
            />
          )}

          <input
            type="tel"
            placeholder={t('auth.phone')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl bg-[#0b0b0b] border border-white/10 px-4 py-3 text-white outline-none focus:border-orange-500"
          />

          <input
            type="password"
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-[#0b0b0b] border border-white/10 px-4 py-3 text-white outline-none focus:border-orange-500"
          />
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-black hover:bg-orange-400 transition"
        >
          {isRegister ? t('auth.register') : t('auth.login')}
        </button>
      </form>
    </section>
  );
}

export default Auth;
