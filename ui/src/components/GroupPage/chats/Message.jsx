/* eslint-disable react/prop-types */
import { personId } from "../../../constants/person";

export const Message = ({ message }) => {
  if (personId === message.sender.id) {
    return (
      <div className="flex justify-end w-full">
        <div className="bg-secondary flex max-w-[400px] gap-x-4 items-center justify-center rounded-[45px] px-4 py-3">
          <p className="text-text-primary">{message.message}</p>
          <p className="text-opacity-60 text-text-primary">{message.time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-x-2">
      {message.sender.thumbnail ? (
        <img
          className="w-8 h-8 rounded-full"
          src={message.sender.thumbnail}
          alt="thumbnail"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-secondary" />
      )}
      <div className="bg-third flex max-w-[400px] gap-x-4 items-center justify-center rounded-t-[45px] rounded-br-[45px] px-4 py-3">
        <div className="flex flex-col">
          <p className="text-white font-medium">{message.sender.name}</p>
          <p className="text-white">{message.message}</p>
        </div>
        <p className="text-opacity-60 text-white">{message.time}</p>
      </div>
    </div>
  );
};
