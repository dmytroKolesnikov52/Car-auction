interface BarItem {
  src: string;
  alt: string;
  url: string;
}

export const barItems: BarItem[] = [
  { src: 'instagram', alt: 'instagram', url: 'https://instagram.com' },
  { src: 'viber', alt: 'viber', url: 'https://viber.com' },
  { src: 'telegram', alt: 'telegram', url: 'https://telegram.org' },
  { src: 'facebook', alt: 'facebook', url: 'https://facebook.com' },
  { src: 'youtube', alt: 'youtube', url: 'https://youtube.com' },
];

interface Columns {
  href: string;
  text: string;
}

export const columns1: Columns[] = [
  { href: '#', text: 'Про нас' },
  { href: '#', text: 'Як ми працюємо' },
  { href: '#', text: 'Доставка' },
  { href: '#', text: 'Відгуки' },
  { href: '#', text: 'Контакти' },
];

export const columns2: Columns[] = [
  { href: '#', text: 'Авто з США' },
  { href: '#', text: 'Авто з Європи' },
  { href: '#', text: 'Авто з Канади' },
  { href: '#', text: 'Підбір авто' },
  { href: '#', text: 'Калькулятор' },
];

interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  { label: 'Головна', icon: 'home', path: '/' },
  { label: 'Авто на замовлення', icon: 'car-sales', path: '/order' },
  { label: 'Аукціон', icon: 'auction', path: '/auction' },
  { label: 'Доставка', icon: 'delivery-car', path: '/delivery' },
  { label: 'Контакти', icon: 'contact-mail', path: '/contacts' },
  { label: 'Соц. мережі', icon: 'social', path: '/social' },
];
