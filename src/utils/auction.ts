import {
  BID_PENALTIES,
  BOT_NAMES,
  DAMAGE_PENALTIES,
  KEYS_PENALTIES,
  RUN_STATUS_PENALTIES,
} from '../constants/auction';
import type { CalculateChanceParams } from '../Types';

export function getBidStep(bid: number) {
  if (bid < 1000) return 50;
  if (bid < 5000) return 100;
  if (bid < 10000) return 500;
  return 1000;
}

export function createAuctionBots() {
  const shuffledNames = [...BOT_NAMES].sort(() => Math.random() - 0.5);

  return shuffledNames.slice(0, 3).map((name, index) => ({
    id: index + 1,
    name,
  }));
}

export function getBidPenalty(currentBid: number) {
  return BID_PENALTIES.find((x) => currentBid <= x.max)?.penalty ?? 0;
}

export function getMileagePenalty(mileage: number) {
  return Math.min(mileage / 2000000, 0.35);
}

export function getSecondaryDamagePenalty(secondaryDamage?: string | null) {
  if (!secondaryDamage) return 0;
  return (DAMAGE_PENALTIES[secondaryDamage] ?? 0) * 0.35;
}

export function getBuyNowPenalty(currentBid: number, buyNowPrice: number) {
  if (!buyNowPrice || buyNowPrice <= 0) return 0;

  const percent = currentBid / buyNowPrice;

  if (percent >= 0.75) return 1;
  if (percent >= 0.7) return 0.5;
  if (percent >= 0.6) return 0.2;

  return 0;
}

export function calculateChance({
  primaryDamage,
  secondaryDamage,
  hasKeys,
  runStatus,
  mileage,
  currentBid,
  buyNowPrice,
}: CalculateChanceParams) {
  let chance = 1;

  chance -= primaryDamage ? (DAMAGE_PENALTIES[primaryDamage] ?? 0) : 0;
  chance -= getSecondaryDamagePenalty(secondaryDamage);
  chance -= hasKeys ? (KEYS_PENALTIES[hasKeys] ?? 0) : 0;
  chance -= runStatus ? (RUN_STATUS_PENALTIES[runStatus] ?? 0) : 0;
  chance -= getMileagePenalty(mileage ?? 0);
  chance -= getBidPenalty(currentBid ?? 0);
  chance -= getBuyNowPenalty(currentBid ?? 0, buyNowPrice ?? 0);

  return Math.max(0, Math.min(1, chance));
}
