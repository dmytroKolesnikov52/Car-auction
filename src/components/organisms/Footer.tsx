import { barItems } from '../../Types';
import { columns1, columns2 } from '../../Types';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  openedMenu: boolean;
}

export default function Footer({ openedMenu }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer
      className={`flex justify-center bg-black text-gray-300 ${
        openedMenu ? 'pl-66' : 'pl-26'
      } transition-all duration-300`}
    >
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-yellow-400">
              {t('footer.branches')}
            </h3>

            <p className="text-sm">
              <span className="font-medium text-white">
                {t('footer.location')}
              </span>
              <br />
              {t('footer.address')}
            </p>

            <div className="mt-4 space-y-1 text-sm">
              <p>{t('footer.phone1')}</p>
              <p>{t('footer.phone2')}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-yellow-400">
              {t('footer.company')}
            </h3>

            <ul className="space-y-2 text-sm transition-all">
              {columns1.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="hover:text-white"
                  >
                    {t(item.text)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-yellow-400">
              {t('footer.services')}
            </h3>

            <ul className="space-y-2 text-sm">
              {columns2.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="hover:text-white"
                  >
                    {t(item.text)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-yellow-400">
              {t('footer.socialMedia')}
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
                      src={`${import.meta.env.BASE_URL}images/header/${src}.png`}
                      alt={alt}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-gray-400">
          {t('footer.copy', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
