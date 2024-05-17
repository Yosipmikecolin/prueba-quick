export const getRandomCoordinates = (): { lat: number; lng: number } => {
  const lat = (Math.random() * 180 - 90).toFixed(6);
  const lng = (Math.random() * 360 - 180).toFixed(6);
  return { lat: parseFloat(lat), lng: parseFloat(lng) };
};
