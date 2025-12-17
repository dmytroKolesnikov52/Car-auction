const API_URL = 'http://localhost:5000/';

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
