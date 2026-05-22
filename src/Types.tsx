import type { CarFiltersState } from './components/templates/CarFilters';

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

export const initialFilters: CarFiltersState = {
  brand: [],
  body_type: [],
  engine_type: [],
  seats: [],
  drive_type: [],
  transmission: [],
  year: { from: '', to: '' },
  price: { from: '', to: '' },
  mileage: { from: '', to: '' },
  engine_volume: { from: '', to: '' },
  battery_capacity: { from: '', to: '' },
};

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
  label: { en: string; uk: string };
  icon: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  { label: { en: 'Home', uk: 'Головна' }, icon: 'home', path: '/' },
  {
    label: { en: 'Order a car', uk: 'Авто на замовлення' },
    icon: 'car-sales',
    path: '/order',
  },
  {
    label: { en: 'Auction', uk: 'Аукціон' },
    icon: 'auction',
    path: '/auction',
  },
  {
    label: { en: 'Delivery', uk: 'Доставка' },
    icon: 'delivery-car',
    path: '/delivery',
  },
  {
    label: { en: 'Contacts', uk: 'Контакти' },
    icon: 'contact-mail',
    path: '/contacts',
  },
  {
    label: { en: 'Social media', uk: 'Соц. мережі' },
    icon: 'social',
    path: '/social',
  },
];

export type BidOwner = 'user' | 'bot' | null;

export type AuctionBot = {
  id: number;
  name: string;
};

export type CalculateChanceParams = {
  primaryDamage?: string | null;
  secondaryDamage?: string | null;
  hasKeys?: string | null;
  runStatus?: string | null;
  mileage?: number | null;
  currentBid?: number | null;
  buyNowPrice?: number | null;
};

export interface User {
  id: number;
  name: string;
  phone: string;
  role: 'user' | 'admin';
}
