import { useQuery } from '@tanstack/react-query';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  rainChance: number;
  dust: string;
  description: string;
  icon: string;
}

// 서울의 기본 좌표 (위도: 37.5665, 경도: 126.9780)
const SEOUL_COORDS = {
  lat: 37.5665,
  lon: 126.9780
};

// OpenWeatherMap API 키
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

console.log('=== Weather Hook Loaded ===');
console.log('Environment variables:', import.meta.env);
console.log('Weather API Key from env:', import.meta.env.VITE_OPENWEATHERMAP_API_KEY);

const getWeatherData = async (lat: number = SEOUL_COORDS.lat, lon: number = SEOUL_COORDS.lon): Promise<WeatherData> => {
  console.log('=== getWeatherData called ===');
  console.log('Parameters:', { lat, lon });
  
  try {
    console.log('Weather API Key:', WEATHER_API_KEY);
    console.log('API Key length:', WEATHER_API_KEY?.length);
    console.log('API Key type:', typeof WEATHER_API_KEY);
    
    console.log('Calling weather API...');
    console.log('API URL:', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`);
    
    // OpenWeatherMap API 호출
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
    );

    console.log('Weather API Response status:', response.status);
    console.log('Weather API Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Weather API Error Response:', errorText);
      
      if (response.status === 401) {
        console.log('API key is invalid, using mock data');
      }
      
      throw new Error(`Weather API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Weather API Response data:', data);

    // 날씨 상태에 따른 한글 조건 매핑
    const weatherConditionMap: { [key: string]: string } = {
      'Clear': '맑음',
      'Clouds': '흐림',
      'Rain': '비',
      'Snow': '눈',
      'Thunderstorm': '천둥번개',
      'Drizzle': '이슬비',
      'Mist': '안개',
      'Smoke': '연기',
      'Haze': '연무',
      'Dust': '먼지',
      'Fog': '안개',
      'Sand': '모래',
      'Ash': '재',
      'Squall': '돌풍',
      'Tornado': '토네이도'
    };

    const condition = weatherConditionMap[data.weather[0].main] || data.weather[0].main;
    
    // 미세먼지 정보 (실제로는 별도 API 필요)
    const dust = '좋음'; // 기본값

    const weatherData = {
      temp: Math.round(data.main.temp),
      condition,
      humidity: data.main.humidity,
      rainChance: data.rain ? Math.round(data.rain['1h'] * 100) : 0,
      dust,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };

    console.log('Processed weather data:', weatherData);
    return weatherData;
  } catch (error) {
    console.error('Weather API error:', error);
    console.log('Using mock weather data due to error');
    
    // Return mock data when API fails
    return {
      temp: 18,
      condition: "맑음",
      humidity: 50,
      rainChance: 0,
      dust: "좋음",
      description: "맑음",
      icon: "01n"
    };
  }
};

export const useWeather = (lat?: number, lon?: number) => {
  console.log('=== useWeather hook called ===');
  console.log('useWeather parameters:', { lat, lon });
  
  const queryKey = ['weather', lat || SEOUL_COORDS.lat, lon || SEOUL_COORDS.lon];
  console.log('Query key:', queryKey);
  
  return useQuery({
    queryKey,
    queryFn: () => {
      console.log('Query function called');
      return getWeatherData(lat, lon);
    },
    staleTime: 10 * 60 * 1000, // 10분마다 갱신
    refetchInterval: 10 * 60 * 1000, // 10분마다 자동 갱신
    retry: 1, // 실패 시 1번만 재시도
    enabled: true, // 항상 활성화
  });
};

// 날씨 상태에 따른 데이트 추천 메시지
export const getWeatherRecommendation = (weather: WeatherData): string => {
  const { condition, temp } = weather;
  
  if (condition.includes('맑음') && temp >= 15 && temp <= 25) {
    return '🌤️ 야외 데이트하기 좋은 날씨예요!';
  } else if (condition.includes('비') || condition.includes('눈')) {
    return '☔ 실내 데이트를 추천해요!';
  } else if (temp < 10) {
    return '❄️ 따뜻한 실내에서 데이트하세요!';
  } else if (temp > 30) {
    return '🌡️ 시원한 실내에서 데이트하세요!';
  } else {
    return '🌤️ 데이트하기 좋은 날씨예요!';
  }
};
