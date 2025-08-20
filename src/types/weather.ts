// Weather related types
export interface Weather {
  temp: number;
  condition: string;
  dust: string;
  humidity: number;
  rainChance: number;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  rainChance: number;
  dust: string;
  uvIndex: string;
  description: string;
  icon: string;
}
