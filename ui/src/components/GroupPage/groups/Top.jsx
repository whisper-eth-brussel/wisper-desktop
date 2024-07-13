import { FiPlus } from "react-icons/fi";

export const Top = () => {
  return (
    <div className="flex items-center px-2 justify-between">
      <h1 className="font-sora text-2xl font-semibold">Chaty</h1>
      <button className="p-2 flex items-center justify-center">
        <FiPlus size={20} />
      </button>
    </div>
  );
};
