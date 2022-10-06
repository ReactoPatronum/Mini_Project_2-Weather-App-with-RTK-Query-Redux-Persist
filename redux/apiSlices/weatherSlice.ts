import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeatherObject, Params } from "../../typing";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getWeatherApi: builder.query<WeatherObject, Params>({
      query: (arg) => {
        const { cityName, language, units, apiKey } = arg;
        return {
          params: { cityName, language, units, apiKey },
          url: `weather?q=${cityName}&lang=${language}&appid=${apiKey}&units=${units}`,
        };
      },
    }),
  }),
});

export const { useGetWeatherApiQuery } = weatherApi;
