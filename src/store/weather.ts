import { create } from 'zustand';
import { Weather } from '../types';

interface WeatherStore {
  // Weather data
  weather: Weather;
  
  // Weather actions
  setWeather: (weather: Weather) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  // Initial Weather data
  weather: {
    temp: 22,
    condition: "맑음",
    dust: "좋음",
    humidity: 65,
    rainChance: 10,
  },
  
  // Weather actions
  setWeather: (weather) => set({ weather }),
}));
