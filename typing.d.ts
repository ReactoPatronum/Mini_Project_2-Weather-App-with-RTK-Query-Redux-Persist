export interface WeatherObject {
    main: Main;
    sys: Sys;
    weather: Weather[];
    name:string
  }
  
  interface Main {
    feels_like: number;
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  }
  
  interface Sys {
    country: string;
    sunrise: string;
    sunset: string;
  }
  
  interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
  }
  
  export interface Params{
      cityName:any,
      language:string,
      units:string,
      apiKey:any
  }