import { barItems } from '../../Types';
import { columns1, columns2 } from '../../Types';

interface FooterProps {
  openedMenu: boolean;
}

export default function Footer({ openedMenu }: FooterProps) {
  return (
    <footer
      className={`flex justify-center bg-black text-gray-300 ${openedMenu ? 'pl-66' : 'pl-26'} transition-all duration-300`}
    >
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-yellow-400">
              Наші відділення
            </h3>
            <p className="text-sm">
              <span className="font-medium text-white">Біла Церква</span>
              <br />
              вул. Ярослава Мудрого, 45
            </p>

            <div className="mt-4 space-y-1 text-sm">
              <p>+38 (099) 999 99 99</p>
              <p>+38 (066) 666 66 66</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-yellow-400">
              Компанія
            </h3>
            <ul className="space-y-2 text-sm transition-all">
              {columns1.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="hover:text-white"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-yellow-400">
              Послуги
            </h3>
            <ul className="space-y-2 text-sm">
              {columns2.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="hover:text-white"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-yellow-400">
              Ми в соцмережах
            </h3>

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
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} Car Auction. Всі права захищені.
        </div>
      </div>
    </footer>
  );
}
