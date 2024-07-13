import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { HeaderChat } from "../components/GroupPage/chats/HeaderChat";
import { Container } from "../components/GroupPage/groups/Container";
import { Top } from "../components/GroupPage/groups/Top";
import Header from "../components/GroupPage/Header";
import { openChat } from "../store/slices/chat";
import { ChatBox } from "../components/GroupPage/chats/ChatBox";

const Group = () => {
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.group.chats);

  const chat = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(
      openChat({
        ...chats[0],
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#FFFDFD] mx-8 my-12">
      <Header />
      <div className="flex-1 mt-5 grid gap-3 grid-cols-12 h-[calc(100vh_-_148px)] overflow-hidden">
        <div className="col-start-1 rounded-3xl col-end-5 bg-primary flex-1 flex flex-col gap-y-8 py-5 overflow-hidden">
          <Top />
          <Container />
        </div>
        <div className="col-start-5 overflow-hidden rounded-3xl col-end-13 bg-primary flex-1">
          <HeaderChat />
          <ChatBox messages={chat.messages} />
        </div>
      </div>
    </div>
  );
};

export default Group;
