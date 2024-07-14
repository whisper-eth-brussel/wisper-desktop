import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { HeaderChat } from "../components/GroupPage/chats/HeaderChat";
import { WriteChat } from "../components/GroupPage/chats/WriteChat";
import { Container } from "../components/GroupPage/groups/Container";
import { SideBox } from "../components/GroupPage/chats/SideBox";
import { Top } from "../components/GroupPage/groups/Top";
import Header from "../components/GroupPage/Header";
import { openChat } from "../store/slices/chat";
import { ChatBox } from "../components/GroupPage/chats/ChatBox";
import CreateGroup from "../components/CreateGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { setCreateScreen } from "../store/slices/createScreen";
import { useDetectClickOutside } from "react-detect-click-outside";
import { io } from "socket.io-client";

const Group = () => {
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.group.chats);

  const location = useLocation();

  const navigate = useNavigate();

  const [isOpenSide, setIsOpenSide] = useState(false);

  const { isCreate } = useSelector((state) => state.isCreate);

  const socket = io("http://localhost:10101" ?? "", {});

  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("chat", (data) => {
    console.log(data);
  });

  const ref = useDetectClickOutside({
    onTriggered: () => setIsOpenSide(false),
  });

  useEffect(() => {
    dispatch(setCreateScreen(location.pathname === "/group/create"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const chat = useSelector((state) => state.chat);

  useEffect(() => {
    if (chats.length > 0) {
      dispatch(
        openChat({
          ...chats[0],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chats.length === 0) {
      navigate("/group/create");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  return (
    <div className="bg-[#FFFDFD] mx-8 my-12">
      <Header />
      <div className="flex-1 mt-5 grid gap-3 grid-cols-12 h-[calc(100vh_-_148px)] overflow-hidden">
        <div className="col-start-1 rounded-3xl col-end-5 bg-primary flex-1 flex flex-col gap-y-8 py-5 overflow-hidden">
          <Top />
          <Container />
        </div>
        <div className="col-start-5 overflow-hidden rounded-3xl col-end-13 bg-primary flex-1">
          <HeaderChat setIsOpenSide={setIsOpenSide} isCreate={isCreate} />

          <div className="relative">
            {isCreate ? <CreateGroup /> : <ChatBox messages={chat.messages} />}
            <SideBox ref={ref} isOpen={isOpenSide} />
          </div>
          {!isCreate && <WriteChat />}
        </div>
      </div>
    </div>
  );
};

export default Group;
