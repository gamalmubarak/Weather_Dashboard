import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    // Convert import.meta.url to file path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.filePath = path.join(__dirname, '../../db/db.json');
  }

  // TODO: Define a read method that reads from the searchHistory.json file

  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, { encoding: 'utf-8', flag: 'a+' });
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  
  async addCity(name: string): Promise<City> {
    const cities = await this.read();
    const id = Date.now().toString(); // Generate a unique ID
    const newCity = new City(id, name);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
 
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter((city) => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
