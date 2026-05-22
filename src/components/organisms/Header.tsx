import LanguageSwitcher from '../molecules/LanguageSwitcher';
import { barItems, type User } from '../../Types';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  openedMenu: boolean;
}

export default function Header({ openedMenu }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const loadUser = () => {
      fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include',
      })
        .then((res) => {
          if (!res.ok) {
            setUser(null);
            return null;
          }

          return res.json();
        })
        .then((data) => {
          if (data?.user) {
            setUser(data.user);
          }
        })
        .catch(() => {
          setUser(null);
        });
    };

    loadUser();

    window.addEventListener('authChanged', loadUser);

    return () => {
      window.removeEventListener('authChanged', loadUser);
    };
  }, []);

  const logout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    localStorage.removeItem('user');
    localStorage.removeItem('adminAuth');

    setUser(null);
    window.dispatchEvent(new Event('authChanged'));

    navigate('/auth');
  };

  return (
    <header
      className={`fixed top-0 ${openedMenu ? 'left-60' : 'left-20'} right-0 z-50 bg-black text-white py-3 px-6 flex items-center justify-between transition-all duration-300 h-16`}
    >
      <div>
        <Link to="/">
          <img
            src="/images/logo/logoDark.png"
            alt="logo"
            className="h-10"
          />
        </Link>
      </div>

      {/* <ThemeSwitcher /> */}

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          {barItems.map(({ src, alt, url }) => {
            return (
              <a
                key={alt}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 cursor-pointer opacity-60 hover:opacity-100 transition"
              >
                <img
                  src={`/images/header/${src}.png`}
                  alt={alt}
                />
              </a>
            );
          })}
        </div>

        <button className="cursor-pointer bg-yellow-400 text-black font-semibold px-5 py-2 rounded-md hover:bg-yellow-300 transition">
          {t('header.leaveRequest')}
        </button>

        <a
          href="tel:+380999999999"
          className="font-medium hover:text-yellow-300 transition"
        >
          +38 (099) 999 9999
        </a>

        <LanguageSwitcher />

        {!user ?
          <Link
            to="/auth"
            className="p-3 cursor-pointer opacity-80 hover:opacity-100 transition"
          >
            <img
              src="/images/header/login.png"
              alt="login"
              className="w-6"
            />
          </Link>
        : <div className="relative group">
            {user.role === 'admin' ?
              <Link
                to="/admin"
                className="block cursor-pointer rounded-md px-4 py-2 bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
              >
                {t('header.adminPanel')}
              </Link>
            : <button className="cursor-pointer rounded-md px-4 py-2 bg-white/10 text-white font-semibold hover:bg-white/20 transition">
                {user.name}
              </button>
            }

            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <button
                onClick={logout}
                className="whitespace-nowrap rounded-md bg-[#151515] border border-white/10 px-5 py-2 text-white hover:bg-red-600 transition shadow-xl"
              >
                {t('header.logout')}
              </button>
            </div>
          </div>
        }
      </div>
    </header>
  );
}
