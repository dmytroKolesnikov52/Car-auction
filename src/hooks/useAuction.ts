import { useCallback, useEffect, useRef, useState } from 'react';
import type { Car } from '../components/organisms/CarCard';
import type { AuctionBot, User } from '../Types';
import {
  calculateChance,
  createAuctionBots,
  getBidStep,
} from '../utils/auction';

export function useAuction(
  car?: Car,
  isAuthorized = false,
  user?: User | null,
) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const [currentBid, setCurrentBid] = useState<number | null>(0);
  const [isSold, setIsSold] = useState(false);
  const [isUserBid, setIsUserBid] = useState(false);
  const [isBidButtonLocked, setIsBidButtonLocked] = useState(false);
  const [bidOwner, setBidOwner] = useState<'user' | 'bot' | null>(null);
  const [botMessage, setBotMessage] = useState('');
  const [winnerMessage, setWinnerMessage] = useState('');
  const [auctionBots, setAuctionBots] = useState<AuctionBot[]>([]);

  const bidOwnerRef = useRef<'user' | 'bot' | null>(null);

  useEffect(() => {
    bidOwnerRef.current = bidOwner;
  }, [bidOwner]);

  useEffect(() => {
    if (!car) return;

    const auctionKey = `auction_${car.id}`;
    const bidKey = `auction_bid_${car.id}`;

    const storedAuctionStart = localStorage.getItem(auctionKey);
    const storedBid = localStorage.getItem(bidKey);

    setIsSold(Boolean(car.is_sold));

    setCurrentBid(
      storedBid ? parseInt(storedBid, 10) : (car.current_bill ?? 0),
    );

    if (storedAuctionStart) {
      setIsAuctionActive(true);
      setAuctionBots(createAuctionBots());
    } else {
      setIsAuctionActive(false);
      setTimeLeft(null);
      setAuctionBots([]);
    }
  }, [car]);

  useEffect(() => {
    if (!car || !isAuctionActive) return;

    const auctionKey = `auction_${car.id}`;
    const bidKey = `auction_bid_${car.id}`;

    const storedBid = localStorage.getItem(bidKey);

    if (storedBid) {
      setCurrentBid(parseInt(storedBid, 10));
    }

    const interval = setInterval(() => {
      const storedAuctionStart = localStorage.getItem(auctionKey);

      if (!storedAuctionStart) {
        setIsAuctionActive(false);
        setTimeLeft(null);
        clearInterval(interval);
        return;
      }

      const startTime = parseInt(storedAuctionStart, 10);
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = Math.max(0, 60 - elapsed);

      setTimeLeft(remaining);

      if (remaining === 0) {
        localStorage.removeItem(auctionKey);

        setIsAuctionActive(false);
        setIsSold(true);
        setTimeLeft(null);
        setAuctionBots([]);
        clearInterval(interval);

        if (bidOwnerRef.current === 'user' || isUserBid) {
          setBotMessage('');
          setWinnerMessage(
            'Вітаємо, ви виграли аукціон!\nМи зв’яжемось з вами найближчим часом.',
          );
        }

        fetch(`http://localhost:5000/api/cars/${car.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            is_bill_started: 0,
            is_sold: 1,
            current_bill: storedBid,
            phone_user:
              bidOwnerRef.current === 'user' || isUserBid ?
                (user?.phone ?? null)
              : null,
          }),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [car, isAuctionActive, isUserBid, user]);

  const makeBotBid = useCallback(
    (bot: AuctionBot) => {
      if (!car) return;

      setCurrentBid((prevBid) => {
        const bid = prevBid ?? 0;

        const chance = calculateChance({
          primaryDamage: car.damage,
          secondaryDamage: car.secondary_damage,
          hasKeys: car.keys_for_car ? 'YES' : 'NO',
          runStatus: car.runs_drive,
          mileage: car.mileage,
          currentBid: bid,
          buyNowPrice: car.price,
        });

        console.log(
          `Bot ${bot.name} has a ${Math.round(chance * 100)}% chance to bid. Current bid: ${bid}$`,
        );

        const botWillBid = Math.random() < chance;

        if (!botWillBid) return bid;

        const newBid = bid + getBidStep(bid);

        extendAuctionIfNeeded();
        setBidOwner('bot');
        setIsUserBid(false);
        setIsBidButtonLocked(false);

        setBotMessage(
          bidOwnerRef.current === 'user' ?
            `${bot.name} перебив твою ставку!`
          : `${bot.name} перебиває ставку!`,
        );

        localStorage.setItem(`auction_bid_${car.id}`, String(newBid));

        return newBid;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [car],
  );

  useEffect(() => {
    if (!car || !isAuctionActive || isSold || auctionBots.length === 0) return;

    const intervals = auctionBots.map((bot, index) => {
      return setInterval(
        () => {
          makeBotBid(bot);
        },
        900 + index * 350,
      );
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [car, isAuctionActive, isSold, auctionBots, makeBotBid]);

  const handleMakeBid = useCallback(async () => {
    if (!car || !isAuthorized || isBidButtonLocked || bidOwner === 'user')
      return;

    setWinnerMessage('');
    setBotMessage('');

    const bid = currentBid ?? 0;
    const newBid = bid + getBidStep(bid);

    setCurrentBid(newBid);
    extendAuctionIfNeeded();
    setBidOwner('user');
    setIsUserBid(true);
    setIsBidButtonLocked(true);

    localStorage.setItem(`auction_bid_${car.id}`, String(newBid));

    if (!isAuctionActive) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/cars/${car.id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_bill_started: 1 }),
          },
        );

        if (!response.ok) {
          console.error('Failed to start auction in database');
          setIsBidButtonLocked(false);
          return;
        }

        const auctionKey = `auction_${car.id}`;

        localStorage.setItem(auctionKey, String(Date.now()));

        setAuctionBots(createAuctionBots());
        setIsAuctionActive(true);
        setTimeLeft(60);
      } catch (error) {
        console.error('Error starting auction:', error);
        setIsBidButtonLocked(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    car,
    isAuthorized,
    isBidButtonLocked,
    bidOwner,
    currentBid,
    isAuctionActive,
  ]);

  const extendAuctionIfNeeded = useCallback(() => {
    if (!car || timeLeft === null) return;

    if (timeLeft <= 10) {
      const auctionKey = `auction_${car.id}`;

      const newStartTime = Date.now() - 50000;

      localStorage.setItem(auctionKey, String(newStartTime));

      setTimeLeft(10);
    }
  }, [car, timeLeft]);

  const resetAuction = useCallback(() => {
    if (!car) return;

    fetch(`http://localhost:5000/api/cars/${car.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        is_bill_started: 0,
        is_sold: 0,
        current_bill: 0,
        phone_user: null,
      }),
    });

    const bidKey = `auction_bid_${car.id}`;
    const auctionKey = `auction_${car.id}`;

    setCurrentBid(0);
    setIsAuctionActive(false);
    setIsSold(false);
    setTimeLeft(null);
    setWinnerMessage('');
    setBotMessage('');
    setIsBidButtonLocked(false);
    setIsUserBid(false);
    setAuctionBots([]);
    setBidOwner(null);

    localStorage.setItem(bidKey, '0');
    localStorage.removeItem(auctionKey);
  }, [car]);

  const handleBuyNow = useCallback(async () => {
    if (!car || !isAuthorized) return;

    const bidKey = `auction_bid_${car.id}`;
    const auctionKey = `auction_${car.id}`;
    const finalPrice = car.price ?? 0;

    try {
      const response = await fetch(`http://localhost:5000/api/cars/${car.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_bill_started: 0,
          is_sold: 1,
          current_bill: finalPrice,
          phone_user: user?.phone || null,
        }),
      });

      if (!response.ok) {
        console.error('Failed to buy car');
        return;
      }

      localStorage.removeItem(auctionKey);
      localStorage.setItem(bidKey, String(finalPrice));

      setCurrentBid(finalPrice);
      setIsAuctionActive(false);
      setIsSold(true);
      setTimeLeft(null);
      setWinnerMessage('');
      setBotMessage('');
      setIsBidButtonLocked(true);
      setIsUserBid(false);
      setAuctionBots([]);
      setBidOwner(null);
    } catch (error) {
      console.error('Error buying car:', error);
    }
  }, [car, isAuthorized, user]);

  const bidButtonText =
    !isAuctionActive ? 'Зробити ставку'
    : (currentBid ?? 0) < 1000 ? '+50$'
    : (currentBid ?? 0) < 5000 ? '+100$'
    : (currentBid ?? 0) < 10000 ? '+500$'
    : '+1000$';

  return {
    timeLeft,
    isAuctionActive,
    currentBid,
    isSold,
    isUserBid,
    isBidButtonLocked,
    bidOwner,
    botMessage,
    winnerMessage,
    auctionBots,
    bidButtonText,
    handleMakeBid,
    resetAuction,
    handleBuyNow,
  };
}
