import { ChatSvg } from "../assets/svg/ChatSvg";
import { Whisper } from "../assets/svg/Whisper";
import Group from "../assets/Group.png";
import { Link } from "react-router-dom";

import "./home.css";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden w-full relative">
      <div className="absolute right-0">
        <img src={Group} alt="Group" />
      </div>
      <div className="container">
        <div className="navigation">
          <div className="whisper">
            <Whisper />
          </div>
          <Link to="/group" className="navbarGroup z-50 cursor-pointer">
            <ChatSvg />
            Groups
          </Link>
        </div>
        <div className="content">
          <div className="contentTitle">Whisper your secrets securely</div>
          <div className="contentText">
            The secure chat app for privacy and trust, knowing your secrets are
            always protected.
          </div>
          <Link to="/group/create" className="contentButton z-50 relative">
            + Create a group
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
