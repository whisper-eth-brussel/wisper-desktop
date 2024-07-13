/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { IoIosLink } from "react-icons/io";

export const HeaderChat = () => {
  const chat = useSelector((state) => state.chat);

  const { name, thumbnail, members } = chat;

  return (
    <div className="py-6 px-9 rounded-t-3xl flex-1 bg-fifth">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Group"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-secondary"></div>
          )}
          <div className="flex flex-col gap-y-1 justify-between">
            <h2 className="font-sora text-text-primary text-lg font-semibold">
              {name}
            </h2>
            <p className="text-text-primary text-opacity-60">
              {members.length} members
            </p>
          </div>
        </div>
        <button className="p-2 flex items-center justify-center">
          <IoIosLink size={24} className="text-text-primary" />
        </button>
      </div>
    </div>
  );
};
