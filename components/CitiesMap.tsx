import React from "react";
import TurkeyMap from "turkey-map-react";
import { useRouter } from "next/router";

type Props = {};

export default function CitiesMap({}: Props) {
  const router = useRouter();
  return (
    <div className="h-screen">
      <h2 className="text-white text-center text-2xl font-semibold tracking-[4px]">
        Bir Şehir Seçiniz.
      </h2>
      <TurkeyMap
        showTooltip={true}
        onClick={({ name }) => router.push(`/city/${name}`)}
      />
    </div>
  );
}
