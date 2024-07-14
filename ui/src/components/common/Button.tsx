import React from "react";

import { FaChevronRight } from "react-icons/fa";

export const Button = ({ text, handler }) => {
  return (
    <button
      onClick={handler}
      className="bg-[#24252A] w-fit gap-5 rounded-[50px] flex items-center justify-between p-3"
    >
      <span className="text-base text-white font-normal ">{text}</span>
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-forth">
        <FaChevronRight />
      </div>
    </button>
  );
};
