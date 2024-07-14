/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { IoIosLink } from "react-icons/io";

import { useToast } from "@chakra-ui/react";

export const HeaderChat = ({ onClick, isCreate, setIsOpenSide }) => {
  const chat = useSelector((state) => state.chat);

  const { name, thumbnail, members } = chat;

  const toast = useToast();

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("https://chat-app.com/join/123456");
    return toast({
      title: "Copied",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <div
      onClick={onClick}
      className={`py-6 px-9 rounded-t-3xl flex-1  ${
        isCreate ? "bg-primary" : "bg-fifth"
      }`}
    >
      <div
        className={`flex items-center ${
          isCreate ? "justify-end" : "justify-between"
        }`}
      >
        {!isCreate && (
          <div
            onClick={() => {
              setIsOpenSide(true);
            }}
            className="flex cursor-pointer items-center gap-x-3"
          >
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
        )}
        <button
          onClick={handleCopy}
          className="p-2 flex items-center justify-center"
        >
          <IoIosLink size={24} className="text-text-primary" />
        </button>
      </div>
    </div>
  );
};
