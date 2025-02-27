import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  tempF: number;
  iconDescription: string;
  date: string;
  icon: string;
  windSpeed: string;
  humidity: string;

  constructor(city: string, tempF: number, iconDescription: string, date: string, icon: string, windSpeed: string, humidity: string) {
    this.city = city;
    this.tempF = tempF;
    this.iconDescription = iconDescription;
    this.date = date;
    this.icon = icon;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL = process.env.API_BASE_URL;
  private apiKey = process.env.API_KEY;
  cityName = "";

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const response = await fetch(
      `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    return await response.json();
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any[]): Coordinates {
    if (!locationData || locationData.length === 0) {
      throw new Error('Location not found');
    }
    const { lat, lon } = locationData[0];
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const queryURL = this.buildWeatherQuery(coordinates);
    const response = await fetch(queryURL);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    let data = await response.json();
    const currentData = this.parseCurrentWeather(data.list[0]);
    const forecastData = this.buildForecastArray(currentData, data.list);
    return [currentData, ...forecastData];
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
