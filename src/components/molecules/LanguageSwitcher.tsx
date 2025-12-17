import { useState } from 'react';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<'UK' | 'EN'>('UK');
  const [open, setOpen] = useState(false);

  const allLangs = ['UK', 'EN'];
  const otherLangs = allLangs.filter((l) => l !== currentLang);

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={`
          bg-yellow-400 text-black font-semibold px-3 py-1 text-sm cursor-pointer
          transition-all duration-200 rounded-sm
          ${open ? 'scale-110' : 'scale-100'}
        `}
      >
        {currentLang}
      </div>

      <div
        className={`absolute top-[90%] mt-1 -left-1 flex flex-col z-10 transition-all duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {otherLangs.map((lang) => (
          <div
            key={lang}
            onClick={() => {
              setCurrentLang(lang as 'UK' | 'EN');
              setOpen(false);
            }}
            className="
                bg-yellow-400 text-black font-semibold px-4 py-2 text-sm
                cursor-pointer border-t border-black rounded-sm
                transition-all duration-200
                hover:scale-105 active:scale-95
              "
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
}
