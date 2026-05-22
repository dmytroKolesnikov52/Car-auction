export const BOT_NAMES = [
  'Олександр',
  'Максим',
  'Дмитро',
  'Андрій',
  'Ігор',
  'Владислав',
  'Сергій',
  'Роман',
  'Богдан',
  'Михайло',
];

export const DAMAGE_PENALTIES: Record<string, number> = {
  'ALL': 0.3,
  'MINOR': 0.08,
  'MAJOR': 0.45,
  'TOTAL': 0.85,
  'STRIPPED': 0.75,
  'BURN': 0.8,
  'ENGINE': 0.65,
  'HAIL': 0.15,
  'ALL OVER': 0.35,
  'SIDE': 0.22,
  'VANDALISM': 0.35,
  'MINOR DENT/SCRATCHES': 0.05,
  'BIOHAZARD/CHEMICAL': 0.7,
  'MECHANICAL': 0.55,
  'UNDERCARRIAGE': 0.45,
  'NORMAL WEAR': 0.03,
  'REAR END': 0.25,
  'FRONT END': 0.35,
  'ROLLOVER': 0.6,
  'WATER/FLOOD': 0.75,
  'FRAME DAMAGE': 0.7,
  'DAMAGE HISTORY': 0.2,
  'TOP/ROOF': 0.35,
};

export const KEYS_PENALTIES: Record<string, number> = {
  YES: 0,
  NO: 0.2,
};

export const RUN_STATUS_PENALTIES: Record<string, number> = {
  'RUN & DRIVE VERIFIED': 0,
  'VEHICLE STARTS': 0.25,
  'NO': 0.55,
};

export const BID_PENALTIES = [
  {
    max: 999,
    penalty: 0,
    delay: 200,
  },
  {
    max: 4999,
    penalty: 0.05,
    delay: 1500,
  },
  {
    max: 9999,
    penalty: 0.25,
    delay: 3000,
  },
  {
    max: Infinity,
    penalty: 0.3,
    delay: 6000,
  },
];
