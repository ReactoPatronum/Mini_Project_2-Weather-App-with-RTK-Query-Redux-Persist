import React, { useState } from "react";
import { cities } from "./CitiesJSON";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { addStorage, removeStorage } from "../redux/slices/storageSlice";
import { AiOutlineStar, AiFillStar, AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-modal";

type Props = {};

export default function Main({}: Props) {
  const { store } = useAppSelector((store) => store.reducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [inputVal, setInputVal] = useState<string>("");
  const [hover, setHover] = useState<string>("");
  const [fav, setFav] = useState<boolean>(false);

  const filtered = cities.filter((city) =>
    city.name.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase())
  );

  function Change(e: any, city:string) {
    console.log(city);
    e.stopPropagation();
    if (!store.includes(city as never)) {
      dispatch(addStorage(city));
    }
    if (store.includes(city as never)) {
      dispatch(removeStorage(city));
    }
  }

  return (
    <main className="flex flex-col items-center mt-10 min-h-screen">
      <div className="flex items-center space-x-3">
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="w-80"
          type="text"
          placeholder="Şehirler de Ara..."
        />
        <button
          onClick={() => setFav((current) => !current)}
          className="text-white bg-purple-600 p-2 font-semibold h-[41px]"
        >
          Favori Şehirler
        </button>
      </div>
      <div className="grid grid-cols-4 text-white mt-10 w-full gap-5 ">
        {filtered.map((city) => (
          <div
            onMouseEnter={() => setHover(city.name)}
            onMouseLeave={() => setHover("")}
            onClick={() => router.push(`/city/${city.name}`)}
            className={`relative col-span-4 sm:col-span-2 lg:col-span-1 border border-gray-400 p-5 cursor-pointer hover:scale-100`}
            key={city.id}
          >
            <div className="flex items-center justify-between">
              <p className="bg-[#4036E0] font-bold rounded-full h-8 w-8 flex items-center justify-center">
                {city.id}
              </p>
              <p className="font-semibold">{city.name}</p>
              <div onClick={(e) => Change(e, city.name)}>
                {!store.includes(city.name as never) ? (
                  <AiOutlineStar className="hover:scale-125 transition-all duration-200 w-7 h-7 text-yellow-500" />
                ) : (
                  <AiFillStar className="text-yellow-500 hover:scale-125 transition-all duration-200 w-7 h-7" />
                )}
              </div>
            </div>
            {hover === city.name && (
              <div className="text-sm p-2 rounded-lg flex flex-col items-center justify-center absolute h-16 w-[160px] bg-white -top-10 text-black">
                <h3 className="font-semibold">
                  Nüfus:{" "}
                  <span className="text-red-600 font-bold">
                    {city.population}
                  </span>
                </h3>
                <h3 className="font-semibold">
                  Bölge:{" "}
                  <span className="text-red-600 font-bold">{city.region}</span>
                </h3>
                <h3></h3>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <Modal
          isOpen={fav}
          ariaHideApp={false}
          onRequestClose={() => setFav(false)}
          className="z-50 p-5 min-h-40 max-w-lg w-[90%] absolute top-44 left-[50%] translate-x-[-50%] bg-white border-2 rounded-xl shadow-md"
        >
          <div className="grid grid-cols-4 gap-5">
            <h2 className="text-center col-span-4 text-red-600 text-xl font-semibold">Favori Şehirler</h2>
            {store.length ? (
              store.map((item) => (
                <div
                  onClick={() => router.push(`/city/${item}`)}
                  className={`col-span-2 border border-gray-400 p-4 cursor-pointer hover:scale-100 text-white bg-[#0d2546]`}
                  key={item}
                >
                  <div
                   onClick={() => router.push(`/city/${item}`)}
                    className="flex items-center justify-between"
                  >
                    <AiFillCloseCircle   onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeStorage(item));
                    }} className="w-7 h-7 hover:scale-125 transition-all duration-200" />

                    <p className="font-semibold">{item}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4">
                <h2 className="text-lg font-semibold">
                  Favori Şehir Bulunamadı
                </h2>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </main>
  );
}
