import { useDispatch } from "react-redux";
import { openChat } from "../../../store/slices/chat";
import { setCreateScreen } from "../../../store/slices/createScreen";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export const Group = (props) => {
  const { group } = props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        dispatch(setCreateScreen(false));
        dispatch(openChat({ ...group }));
        navigate("/group");
      }}
      className="border-forth cursor-pointer px-2 py-3 border-b flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-x-3">
        {group.thumbnail ? (
          <img
            src={group.thumbnail}
            alt="Group"
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-secondary"></div>
        )}
        <div className="flex flex-col gap-y-1 justify-between">
          <h2 className="font-sora text-text-primary text-lg font-semibold">
            {group.name}
          </h2>
          {group.messages.length > 0 && (
            <p className="text-text-primary text-opacity-60">
              {group.messages[group.messages.length - 1].message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-1 justify-between items-end">
        <p className="text-text-primary text-opacity-60 text-xs">
          {group.time}
        </p>
        {group.unread > 0 && (
          <div className="bg-[#483769] w-5 h-5 flex items-center justify-center text-primary text-xs rounded-full">
            {group.unread}
          </div>
        )}
      </div>
    </div>
  );
};
