import React, { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { addIsActive} from "../redux/slices/optionSlice";

type Props = {};

export default function Header({}: Props) {
  const dispatch = useAppDispatch();
  const options = ["Liste", "Harita"];
  const [active, setActive] = useState("Liste");

  function Active(e: any) {
    setActive(e.currentTarget.innerHTML);
    dispatch(addIsActive(e.currentTarget.innerHTML));
  }
  return (
     
    <header className="z-10 sticky top-0 flex flex-col items-center text-white">
      <div className=" m-5 bg-black space-x-3 p-2 max-w-fit  rounded-full">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={(e) => Active(e)}
            className={`border-none border-gray-400  text-lg font-semibold px-10  py-3 rounded-full transition-all duration-200 ${
              option == active && "bg-[#4036E0] "
            } ${option !== active && "hover:bg-gray-300 hover:text-black"} `}
          >
            {option}
          </button>
        ))}
      </div>
    </header>
  );
}
