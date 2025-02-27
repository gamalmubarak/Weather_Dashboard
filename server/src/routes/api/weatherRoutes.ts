import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
    try {
      const { cityName } = req.body;
  
      if (!cityName) {
        return res.status(400).json({ error: 'City name is required' });
      }
  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(cityName);

  // TODO: save city to search history
 await HistoryService.addCity(cityName);

    return res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
