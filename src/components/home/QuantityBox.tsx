import { useState } from "react";
import { useBuyRaffleTicketStore } from "store/buyraffleticketstore";

export default function QuantityBox({max}: {max: number}) {
  const MAX = max;
  const MIN = 1;
  const { ticketQuantity, setTicketQuantity } = useBuyRaffleTicketStore();
  const inc = () => {
    setTicketQuantity(ticketQuantity < MAX ? ticketQuantity + 1 : MAX);
  }
  const dec = () => {
    setTicketQuantity(ticketQuantity > MIN ? ticketQuantity - 1 : MIN);
  }
  const setMax = () => {
    setTicketQuantity(MAX);
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (!v) return setTicketQuantity(0);
    if (v > MAX) return setTicketQuantity(MAX);
    if (v < MIN) return setTicketQuantity(MIN);
    setTicketQuantity(v);
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h4 className="text-sm text-gray-1200 font-medium font-inter">
          Quantity
        </h4>
        <h4 className="text-sm text-black-1000 font-medium font-inter">
          Max : {MAX}
        </h4>
      </div>

      <div className="w-full my-5 flex items-center justify-between rounded-[14px] p-[13px] border border-gray-1100">
        <button
          onClick={dec}
          className="w-8 h-8 cursor-pointer rounded bg-primary-color flex items-center justify-center"
        >
          <img src="/icons/min-icon.svg" alt="" />
        </button>

        <input
          type="number"
          value={ticketQuantity}
          onChange={onInput}
          className="rounded-[14px] outline-none font-medium text-base text-black-1000 text-center w-16"
        />

        <button
          onClick={inc}
          className="w-8 h-8 cursor-pointer rounded bg-primary-color flex items-center justify-center"
        >
          <img src="/icons/plus-white-icon.svg" alt="" />
        </button>
      </div>

      <button
        onClick={setMax}
        className="bg-gray-1300 rounded-lg px-6 py-2 font-semibold text-center cursor-pointer"
      >
        Max
      </button>
    </div>
  );
}
