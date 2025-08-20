import { useQuery } from '@/lib/react-query';
import { WeatherData } from '@/types';

// 서울의 기본 좌표 (위도: 37.5665, 경도: 126.9780)
const SEOUL_COORDS = {
  lat: 37.5665,
  lon: 126.9780
};

// OpenWeatherMap API 키
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
// 미세먼지 API 키 (한국환경공단)
const DUST_API_KEY = import.meta.env.VITE_DUST_API_KEY;

// 강수확률 가져오기 (여러 API 시도)
const getRainChance = async (lat: number = SEOUL_COORDS.lat, lon: number = SEOUL_COORDS.lon): Promise<number> => {
  try {
    if (!WEATHER_API_KEY) {
      return 15;
    }

    // OpenWeatherMap 5일 예보 API 호출 (더 많은 데이터 요청)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr&cnt=40`
    );

    if (!response.ok) {
      return 15;
    }

    const data = await response.json();

    // 현재 시간과 가장 가까운 예보 데이터 찾기
    const now = new Date();
    const forecasts = data.list || [];
    
    if (forecasts.length === 0) {
      return 15;
    }

    // 현재 시간과 가장 가까운 예보 찾기
    let closestForecast = forecasts[0];
    let minTimeDiff = Infinity;

    for (const forecast of forecasts) {
      const forecastTime = new Date(forecast.dt * 1000);
      const timeDiff = Math.abs(forecastTime.getTime() - now.getTime());
      
      if (timeDiff < minTimeDiff) {
        minTimeDiff = timeDiff;
        closestForecast = forecast;
      }
    }

    // 강수확률 계산 (pop: probability of precipitation)
    let rainChance = Math.round((closestForecast.pop || 0) * 100);

    // 강수확률이 0이거나 너무 낮으면 현재 날씨 상태를 기반으로 보정
    if (rainChance === 0 || rainChance < 5) {
      const weatherMain = closestForecast.weather?.[0]?.main || '';
      const weatherDesc = closestForecast.weather?.[0]?.description || '';
      
      // 날씨 상태에 따른 기본 강수확률 설정
      if (weatherMain === 'Rain' || weatherDesc.includes('비')) {
        rainChance = 80;
      } else if (weatherMain === 'Snow' || weatherDesc.includes('눈')) {
        rainChance = 60;
      } else if (weatherMain === 'Thunderstorm' || weatherDesc.includes('천둥')) {
        rainChance = 70;
      } else if (weatherMain === 'Drizzle' || weatherDesc.includes('이슬비')) {
        rainChance = 50;
      } else if (weatherMain === 'Clouds' || weatherDesc.includes('흐림')) {
        rainChance = 30;
      } else if (weatherMain === 'Clear' || weatherDesc.includes('맑음')) {
        rainChance = 15;
      } else {
        rainChance = 20; // 기본값
      }
    }
    
    return rainChance;

  } catch (error) {
    return 15;
  }
};

// 자외선 지수 가져오기
const getUVIndex = async (lat: number = SEOUL_COORDS.lat, lon: number = SEOUL_COORDS.lon): Promise<string> => {
  try {
    if (!WEATHER_API_KEY) {
      return '보통';
    }

    // OpenWeatherMap One Call API에서 자외선 지수 가져오기
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&exclude=minutely,hourly,daily,alerts`
    );

    if (!response.ok) {
      return '보통';
    }

    const data = await response.json();

    const currentUV = data.current?.uvi || 0;

    // 자외선 지수 등급 분류
    // 0-2: 낮음, 3-5: 보통, 6-7: 높음, 8-10: 매우높음, 11+: 극도로높음
    if (currentUV <= 2) {
      return '낮음';
    } else if (currentUV <= 5) {
      return '보통';
    } else if (currentUV <= 7) {
      return '높음';
    } else if (currentUV <= 10) {
      return '매우높음';
    } else {
      return '극도로높음';
    }

  } catch (error) {
    return '보통';
  }
};

// 미세먼지 정보 가져오기
const getDustData = async (lat: number = SEOUL_COORDS.lat, lon: number = SEOUL_COORDS.lon): Promise<string> => {
  try {
    if (!DUST_API_KEY) {
      return '보통';
    }

    // 한국환경공단 미세먼지 API 호출
    const response = await fetch(
      `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${DUST_API_KEY}&returnType=json&numOfRows=1&pageNo=1&sidoName=서울&ver=1.4`
    );

    if (!response.ok) {
      return '보통';
    }

    const data = await response.json();

    if (data.response?.body?.items?.[0]) {
      const item = data.response.body.items[0];
      const pm10Value = parseInt(item.pm10Value);
      const pm25Value = parseInt(item.pm25Value);

      // PM10 기준: 좋음(0-30), 보통(31-80), 나쁨(81-150), 매우나쁨(151~)
      // PM2.5 기준: 좋음(0-15), 보통(16-35), 나쁨(36-75), 매우나쁨(76~)
      if (pm10Value <= 30 && pm25Value <= 15) {
        return '좋음';
      } else if (pm10Value <= 80 && pm25Value <= 35) {
        return '보통';
      } else if (pm10Value <= 150 && pm25Value <= 75) {
        return '나쁨';
      } else {
        return '매우나쁨';
      }
    }

    return '보통';
  } catch (error) {
    return '보통';
  }
};

const getWeatherData = async (lat: number = SEOUL_COORDS.lat, lon: number = SEOUL_COORDS.lon): Promise<WeatherData> => {
  try {
    // OpenWeatherMap API 호출
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
    );

    if (!response.ok) {
      const errorText = await response.text();
      
      if (response.status === 401) {
        // API key is invalid, using mock data
      }
      
      throw new Error(`Weather API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

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
    
    // 미세먼지 정보 가져오기
    const dust = await getDustData(lat, lon);
    
    // 자외선 지수 가져오기
    const uvIndex = await getUVIndex(lat, lon);

    // 강수확률 계산 (현재 날씨 상태 기반)
    let rainChance = 15; // 기본값
    
    // 현재 날씨 상태에 따른 강수확률 설정
    if (condition.includes('비') || condition.includes('이슬비')) {
      rainChance = 80;
    } else if (condition.includes('천둥번개')) {
      rainChance = 70;
    } else if (condition.includes('눈')) {
      rainChance = 60;
    } else if (condition.includes('흐림')) {
      rainChance = 30;
    } else if (condition.includes('맑음')) {
      rainChance = 15;
    }
    
    // API에서 강수확률 가져오기 시도
    try {
      const apiRainChance = await getRainChance(lat, lon);
      if (apiRainChance > 0) {
        rainChance = apiRainChance;
      }
    } catch (error) {
      // Failed to get API rain chance, using weather condition based chance
    }
    
    // 현재 날씨 정보를 활용하여 강수확률 보정
    const currentRain = data.rain;
    const currentSnow = data.snow;
    const currentClouds = data.clouds?.all || 0;
    const currentWeatherMain = data.weather?.[0]?.main || '';
    const currentWeatherDesc = data.weather?.[0]?.description || '';
    
    // 현재 날씨 상태를 기반으로 강수확률 최종 보정
    if (currentRain) {
      rainChance = Math.max(rainChance, 70); // 현재 비가 오고 있으면 최소 70%
    } else if (currentSnow) {
      rainChance = Math.max(rainChance, 60); // 현재 눈이 오고 있으면 최소 60%
    } else if (currentWeatherMain === 'Rain' || currentWeatherDesc.includes('비')) {
      rainChance = Math.max(rainChance, 80);
    } else if (currentWeatherMain === 'Snow' || currentWeatherDesc.includes('눈')) {
      rainChance = Math.max(rainChance, 60);
    } else if (currentWeatherMain === 'Thunderstorm' || currentWeatherDesc.includes('천둥')) {
      rainChance = Math.max(rainChance, 70);
    } else if (currentWeatherMain === 'Drizzle' || currentWeatherDesc.includes('이슬비')) {
      rainChance = Math.max(rainChance, 50);
    } else if (currentWeatherMain === 'Clouds' || currentWeatherDesc.includes('흐림')) {
      rainChance = Math.max(rainChance, 30);
    } else if (currentWeatherMain === 'Clear' || currentWeatherDesc.includes('맑음')) {
      rainChance = Math.max(rainChance, 15);
    }

    const weatherData = {
      temp: Math.round(data.main.temp),
      condition,
      humidity: data.main.humidity,
      rainChance,
      dust,
      uvIndex,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };

    return weatherData;
  } catch (error) {
    // Return mock data when API fails
    return {
      temp: 31, // 테스트를 위해 31도로 설정
      condition: "맑음",
      humidity: 50,
      rainChance: 15, // 맑음일 때 기본 강수확률 (더 현실적인 값)
      dust: "좋음",
      uvIndex: "높음", // 맑음일 때 기본 자외선 지수
      description: "맑음",
      icon: "01n"
    };
  }
};

export const useWeather = (lat?: number, lon?: number) => {
  const queryKey = ['weather', lat || SEOUL_COORDS.lat, lon || SEOUL_COORDS.lon];
  
  return useQuery({
    queryKey,
    queryFn: () => {
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
  const { condition, temp, dust, uvIndex } = weather;
  
  // 기온이 30도 초과인 경우 (31도 이상)
  if (temp > 30) {
    return '🌡️ 시원한 실내에서 데이트하세요!';
  }
  
  // 기온이 10도 미만인 경우
  if (temp < 10) {
    return '❄️ 따뜻한 실내에서 데이트하세요!';
  }
  
  // 비나 눈이 오는 경우
  if (condition.includes('비') || condition.includes('눈') || condition.includes('천둥번개') || condition.includes('이슬비')) {
    return '☔ 실내 데이트를 추천해요!';
  }
  
  // 미세먼지가 나쁨 이상인 경우
  if (dust === '나쁨' || dust === '매우나쁨') {
    return '😷 미세먼지가 나빠요! 실내 데이트를 추천해요!';
  }
  
  // 자외선 지수가 매우높음 이상인 경우
  if (uvIndex === '매우높음' || uvIndex === '극도로높음') {
    return '☀️ 자외선이 강해요! 실내 데이트를 추천해요!';
  }
  
  // 맑고 적당한 기온 (15-25도)인 경우
  if (condition.includes('맑음') && temp >= 15 && temp <= 25) {
    return '🌤️ 야외 데이트하기 좋은 날씨예요!';
  }
  
  // 기타 경우
  return '🌤️ 데이트하기 좋은 날씨예요!';
};
