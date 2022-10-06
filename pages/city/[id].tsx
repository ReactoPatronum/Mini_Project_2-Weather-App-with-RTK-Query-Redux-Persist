/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGetWeatherApiQuery } from "../../redux/apiSlices/weatherSlice";

type Props = {};

export default function ID({}: Props) {
  const router = useRouter();
  const [bg, setBg] = useState<string | undefined>("");
  const [check, setCheck] = useState<boolean>(true);
  const { id } = router.query;
  const { data } = useGetWeatherApiQuery(
    {
      cityName: id,
      language: "tr",
      units: "metric",
      apiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    },
    { skip: check }
  );

  console.log(data, bg);
  useEffect(() => {
    if (id) {
      setCheck(false);
    }
    setBg(data?.weather[0].main);
  }, [id, data]);

  return (
    <div className={`${bg} `}>
      <div className="h-screen absolute w-60 md:w-96 top-0 xl:w-[600px]  right-0 shdw bg-[rgba(110,110,110,0.25)] ">
        <div className="text-gray-200 text-lg md:text-2xl font-semibold space-y-12 p-2 md:p-6 lg:p-10">
          <h2 className="text-center text-xl md:text-2xl xl:text-4xl font-bold text-gray-300">
            Hava Durumu
          </h2>
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold">Sıcaklık</h2>
            <h2 className="font-bold text-green-300">{data?.main.temp} °C</h2>
          </div>
          <div className="flex items-center justify-between">
            <h2  className="text-white  font-bold">Hissedilen Sıcaklık</h2>
            <h2 className="font-bold text-green-300">{data?.main.feels_like} °C</h2>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-white  font-bold">Nem</h2>
            <h2 className="font-bold text-green-300">{data?.main.humidity}%</h2>
          </div>

          <div className="absolute   bottom-5 flex flex-col space-x-3 items-center p-10">
            <h3 className="text-8xl lg:text-9xl font-semibold">
              {data?.main.temp.toFixed()}°
            </h3>
            <div className="flex flex-col items-center ">
              <h3 className="text-4xl font-semibold mt-7">{data?.name}</h3>
              <div className="flex items-center ">
                <img
                  src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                  alt=""
                />
                <h3 className=" lg:text-4xl font-semibold uppercase">
                  {data?.weather[0].description}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
