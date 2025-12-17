import LanguageSwitcher from '../molecules/LanguageSwitcher';
import ThemeSwitcher from '../molecules/ThemeSwitcher';

interface BarItem {
  src: string;
  alt: string;
  url: string;
}

const barItems: BarItem[] = [
  { src: 'instagram', alt: 'instagram', url: 'https://instagram.com' },
  { src: 'viber', alt: 'viber', url: 'https://viber.com' },
  { src: 'telegram', alt: 'telegram', url: 'https://telegram.org' },
  { src: 'facebook', alt: 'facebook', url: 'https://facebook.com' },
  { src: 'youtube', alt: 'youtube', url: 'https://youtube.com' },
];

export default function Header() {
  return (
    <header className="bg-black text-white py-3 px-6 flex items-center justify-between">
      <div>
        <img
          src="/images/logo/logo.png"
          alt="logo"
          className="h-10"
        />
      </div>

      <ThemeSwitcher />

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
          Залишити заявку
        </button>

        <a
          href="tel:+380999999999"
          className="font-medium hover:text-yellow-300 transition"
        >
          +38 (099) 999 9999
        </a>

        <div className="p-3 cursor-pointer opacity-80 hover:opacity-100 transition">
          <img
            src="/images/header/star.png"
            alt="favorites"
            className="w-6"
          />
        </div>

        <LanguageSwitcher />

        <div className="p-3 cursor-pointer opacity-80 hover:opacity-100 transition">
          <img
            src="/images/header/login.png"
            alt="login"
            className="w-6"
          />
        </div>
      </div>
    </header>
  );
}
