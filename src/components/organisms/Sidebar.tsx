import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../Types';

interface SidebarProps {
  openedMenu: boolean;
  setOpenedMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ openedMenu, setOpenedMenu }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={`fixed left-0 h-full bg-[#111111] transition-all duration-300 flex flex-col gap-3 items-center ${
        openedMenu ? 'w-60 px-3' : 'w-20'
      }`}
    >
      <button
        onClick={() => setOpenedMenu((prev) => !prev)}
        className={`group mt-5 px-6 py-3 flex items-center justify-center cursor-pointer ${openedMenu ? 'w-full' : ''}`}
      >
        <img
          src={`/images/sideBar/${openedMenu ? 'close' : 'burger-bar'}.png`}
          className="w-6 h-6 group-hover:w-7 group-hover:h-7 transition-all"
        />
      </button>

      {menuItems.map(({ label, icon, path }) => {
        const active = location.pathname === path;
        return (
          <Link
            key={label}
            to={path}
            className={`px-6 py-3 flex flex-col items-center rounded-md transition-all ${
              active ?
                'bg-[#1b1b1b] text-yellow-400'
              : 'text-gray-300 hover:text-yellow-400 hover:bg-[#1a1a1a]'
            } ${openedMenu ? 'flex w-full flex-row gap-3 px-5 justify-start' : 'max-w-20 justify-center'}`}
          >
            <img
              src={`/images/sideBar/${active ? `${icon}Active` : icon}.png`}
              alt={label}
              className="w-6 h-6 flex-shrink-0"
            />
            <span
              className={`${openedMenu ? 'text-[14px] mb-2' : 'text-[10px]'} mt-1.5 text-center`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
