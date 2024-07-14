import { useSelector } from "react-redux";

import { SideGroup } from "./SideGroup";

export const SideContainer = () => {
  const chats = useSelector((state) => state.group.chats);

  return (
    <div className="overflow-auto">
      <ul>
        {chats.map((group) => (
          <SideGroup key={group.id} group={group} />
        ))}
      </ul>
    </div>
  );
};
