import { useSelector } from "react-redux";

import { Group } from "./Group";

export const Container = () => {
  const chats = useSelector((state) => state.group.chats);

  return (
    <div className="overflow-auto">
      <ul>
        {chats.map((group) => (
          <Group key={group.id} group={group} />
        ))}
      </ul>
    </div>
  );
};
