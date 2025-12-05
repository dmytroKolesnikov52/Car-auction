import { useState } from 'react';

export default function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="flex items-center gap-1">
      <img
        key={'moon'}
        src="/images/header/moon.png"
        className={`h-6 transition-all ${darkMode ? '' : 'translate-x-10'}`}
      />
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`z-1 cursor-pointer w-16 h-8 rounded-full flex items-center transition-all ${
          darkMode ? 'bg-[#1b1b1b]' : 'bg-white'
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full transition-all ${
            darkMode ? 'bg-white translate-x-1' : 'bg-[#1b1b1b] translate-x-9'
          }`}
        ></div>
      </button>
      <img
        key={'sun'}
        src="/images/header/sun.png"
        className={`h-7 transition-all ${darkMode ? '-translate-x-10' : ''}`}
      />
    </div>
  );
}
