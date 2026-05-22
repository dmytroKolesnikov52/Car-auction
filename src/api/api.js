const API_URL = 'https://car-auction-backend-b0ba.onrender.com/';

export async function getCars() {
  const res = await fetch(`${API_URL}/api/cars`);
  return await res.json();
}

export async function getCarImages(carId) {
  const res = await fetch(`${API_URL}/api/cars/${carId}/images`);
  return await res.json();
}

export async function getCarsWithImages() {
  const res = await fetch(`${API_URL}/api/cars-with-images`);
  return await res.json();
}
