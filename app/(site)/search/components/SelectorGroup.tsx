"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface SelectorProps<T> {
  data: T[];
  title: string;
  selected: boolean;
  onSelected: (itemName: string) => void;
  disabled?: boolean;
  first?: boolean;
}

const SelectorGroup = <
  T extends {
    name: string;
  }
>({
  data,
  title,
  selected,
  onSelected,
  disabled,
  first,
}: SelectorProps<T>) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    data.length > 0 && !first && setOpenCollapse(true);
  }, [data.length, first]);

  return (
    <>
      <div
        onClick={() => setOpenCollapse(!openCollapse)}
        className={clsx(
          "h-20 font-semibold pt-6 pr-12 pb-6 pl-7 text-xl border-2 border-solid cursor-pointer bg-slate-50 rounded-md flex flex-col max-md:h-12 max-md:py-2 max-md:px-8",
          selected ? "border-green-700" : "border-gray-600",
          disabled && "pointer-events-none opacity-30"
        )}
      >
        <div className="flex flex-row justify-between">
          {title}
          <span
            className={clsx(
              "bg-[url('/images/frontend/icon-arrowDown.png')] h-3 w-6 bg-no-repeat align-self-center align-middle mt-2 transition duration-300 ease-in-out",
              openCollapse && !selected ? "transform rotate-180" : "",
              selected &&
                "bg-[url(/images/frontend/icon-activeCheck.png)] h-5 w-7 max-md:mt-1"
            )}
          />
        </div>
      </div>
      {openCollapse && (
        <div className="flex flex-col justify-between text-left">
          <div className="flex flex-row justify-between border-b-2 ">
            <input
              type="text"
              placeholder="VYHLEDAT..."
              className="w-11/12 h-20 font-semibold pt-6 pr-12 pb-6 pl-7 text-xl outline-none"
              onChange={(e) => setFilter(e.target.value)}
            />
            <span
              className={clsx(
                "bg-[url('/images/frontend/icon-searchSmall.png')] h-5 w-10 bg-no-repeat align-self-center align-middle mt-8 mr-6 "
              )}
            />
          </div>

          {data
            .filter((item) =>
              item?.name
                ?.toString()
                .toLowerCase()
                .includes(filter.toLowerCase())
            )
            .slice(0, count)
            .map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex flex-row justify-between border-b-2 cursor-pointer"
                onClick={() => {
                  setOpenCollapse(false);
                  onSelected(item?.name);
                }}
              >
                <span className="w-11/12 h-20 font-semibold pt-6 pr-12 pb-6 pl-7 text-xl max-md:h-14 max-md:pt-4 max-md:pb-3 max-md:pr-10 max-md:pl3">
                  {item?.name}
                </span>
                <span
                  className={clsx(
                    "bg-[url('/images/frontend/icon-arrowRight.png')] h-5 w-10 bg-no-repeat align-self-center align-middle mt-8 mr-6 max-md:mt-5"
                  )}
                />
              </div>
            ))}
          {count <= data.length && (
            <button
              className="text-red-500 font-bold text-center text-xl mb-4 mt-5"
              onClick={() => setCount(data.length)}
            >
              Zobrazit více
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default SelectorGroup;
