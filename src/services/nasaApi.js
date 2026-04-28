const API_KEY = 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov';

const ROVER_SOLS = {
  curiosity: 3500,
  opportunity: 5000,
  spirit: 900,
};

export const nasaApi = {
  async getAPOD(count = 12) {
    const res = await fetch(
      `${BASE_URL}/planetary/apod?api_key=${API_KEY}&count=${count}`
    );
    if (!res.ok) throw new Error('Falha ao buscar APOD');
    return res.json();
  },

  async getAPODByDate(date) {
    const res = await fetch(
      `${BASE_URL}/planetary/apod?api_key=${API_KEY}&date=${date}`
    );
    if (!res.ok) throw new Error('Falha ao buscar APOD por data');
    return res.json();
  },

  async getMarsPhotos(rover = 'curiosity', sol, camera = '') {
    const useSol = sol || ROVER_SOLS[rover] || 1000;
    const cameraParam = camera ? `&camera=${camera}` : '';
    const res = await fetch(
      `${BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?sol=${useSol}&api_key=${API_KEY}${cameraParam}&page=1`
    );
    if (!res.ok) throw new Error('Falha ao buscar fotos de Marte');
    const data = await res.json();
    return data.photos.slice(0, 20);
  },

  async getMarsRovers() {
    const res = await fetch(
      `${BASE_URL}/mars-photos/api/v1/rovers?api_key=${API_KEY}`
    );
    if (!res.ok) throw new Error('Falha ao buscar rovers');
    const data = await res.json();
    return data.rovers;
  },

  async getNEO(startDate, endDate) {
    const res = await fetch(
      `${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
    );
    if (!res.ok) throw new Error('Falha ao buscar NEO');
    return res.json();
  },
};
