type ThemeSwitcherProps = {
  lightMode: boolean;
  setLightMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ThemeSwitcher({
  lightMode,
  setLightMode,
}: ThemeSwitcherProps) {
  return (
    <div className="flex items-center gap-1">
      <img
        src="/images/header/moon.png"
        className={`h-6 transition-all ${lightMode ? 'translate-x-10' : ''}`}
      />

      <button
        onClick={() => setLightMode((prev) => !prev)}
        className={`z-1 cursor-pointer w-16 h-8 rounded-full flex items-center border-1 border-gray-900 transition-all ${
          lightMode ? 'bg-white' : 'bg-[#1b1b1b]'
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full transition-all ${
            lightMode ? 'bg-[#1b1b1b] translate-x-9' : 'bg-white translate-x-1'
          }`}
        />
      </button>

      <img
        src="/images/header/sun.png"
        className={`h-7 transition-all ${lightMode ? '' : '-translate-x-10'}`}
      />
    </div>
  );
}
