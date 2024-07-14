import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { HeaderChat } from "../components/GroupPage/chats/HeaderChat";
import { WriteChat } from "../components/GroupPage/chats/WriteChat";
import { Container } from "../components/GroupPage/groups/Container";
import { Top } from "../components/GroupPage/groups/Top";
import Header from "../components/GroupPage/Header";
import { openChat } from "../store/slices/chat";
import { ChatBox } from "../components/GroupPage/chats/ChatBox";
import CreateGroup from "../components/CreateGroup";
import { useLocation } from "react-router-dom";
import { setCreateScreen } from "../store/slices/createScreen";

const Group = () => {
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.group.chats);

  const location = useLocation();

  const { isCreate } = useSelector((state) => state.isCreate);

  useEffect(() => {
    dispatch(setCreateScreen(location.pathname === "/group/create"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
          <HeaderChat isCreate={isCreate} />
          {isCreate ? <CreateGroup /> : <ChatBox messages={chat.messages} />}
          {!isCreate && <WriteChat />}
        </div>
      </div>
    </div>
  );
};

export default Group;
