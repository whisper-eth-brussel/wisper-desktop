import React from "react";
import "./writeChat.css";
import { FaAngleUp } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../store/slices/chat";

export const WriteChat = () => {
  const [message, setMessage] = React.useState("");

  const dispatch = useDispatch();

  const sendMessage = async () => {
    // /gossip/send -> post ->
    // const body = {
    //   message: "Hello",
    // };

    try {
      const res = await axios.post("http://localhost:10101/gossip/send", {
        message,
      });

      if (res.status === 200) {
        setMessage("");
        dispatch(
          addMessage({
            id: "1",
            sender: {
              id: "1",
              name: "User 1",
              thumbnail:
                "https://randomuser.me/api/portraits/thumb/women/25.jpg",
            },
            message: message,
            time: "12:00",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full px-4 items-center gap-x-2">
      <div
        style={{
          width: "100%",
          borderRadius: "40px",
          position: "relative",
        }}
      >
        <input
          style={{
            width: "100%",
            margin: "3px auto",
            padding: "10px 50px",
            borderRadius: "40px",
            border: "2px solid #DAC8FF",
            outline: "none",
            fontSize: "14px",
            color: "#24252A",
            fontWeight: "400",
            zIndex: "999",
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message"
        />

        <div className="inputIcons">
          <div className="fileIcon">
            <svg
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.8088 4.11955L10.0075 13.6538C10.0172 14.0257 9.95267 14.3934 9.81767 14.7352C9.68276 15.0771 9.48005 15.3864 9.22149 15.6449C8.96292 15.9035 8.65368 16.1062 8.31176 16.2411C7.96992 16.3761 7.60224 16.4406 7.23038 16.4309L4.3659 16.3593C3.61646 16.341 2.8945 16.0288 2.3558 15.4901C1.8171 14.9514 1.50489 14.2294 1.48658 13.48L1.30184 3.34776C1.29565 3.04987 1.34851 2.75565 1.45735 2.4821C1.5662 2.20855 1.72887 1.96107 1.93599 1.75395C2.14312 1.54682 2.3906 1.38414 2.66417 1.27529C2.93769 1.16647 3.23192 1.1136 3.5298 1.11981L4.66266 1.13868C4.96057 1.14237 5.25669 1.20508 5.53399 1.32313C5.81137 1.44109 6.06436 1.61215 6.2785 1.8263C6.49265 2.04044 6.66371 2.29344 6.78168 2.57082C6.89973 2.84812 6.96243 3.14423 6.96612 3.44214L7.13172 12.4255C7.13487 12.5745 7.10844 12.7216 7.05396 12.8583C6.99957 12.9951 6.91821 13.1188 6.81464 13.2224C6.71108 13.326 6.58736 13.4073 6.45056 13.4617C6.31384 13.5162 6.16674 13.5426 6.01773 13.5395L5.45119 13.5221C5.30226 13.5202 5.15419 13.4889 5.01552 13.4299C4.87687 13.3708 4.75035 13.2853 4.64328 13.1783C4.5362 13.0712 4.4507 12.9447 4.39168 12.806C4.33268 12.6673 4.30132 12.5193 4.29946 12.3703L4.22358 6.37934"
                stroke="#B18CFA"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {!message && (
            <div className="voiceIcon">
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6882 9.30769C11.6882 10.2257 11.3235 11.1062 10.6744 11.7554C10.0252 12.4045 9.14473 12.7692 8.22668 12.7692C7.30862 12.7692 6.42816 12.4045 5.77899 11.7554C5.12983 11.1062 4.76514 10.2257 4.76514 9.30769V4.46154C4.76514 3.54348 5.12983 2.66302 5.77899 2.01386C6.42816 1.3647 7.30862 1 8.22668 1C9.14473 1 10.0252 1.3647 10.6744 2.01386C11.3235 2.66302 11.6882 3.54348 11.6882 4.46154V9.30769Z"
                  stroke="#B18CFA"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.1499 10C15.1517 10.8188 14.9917 11.6298 14.6794 12.3866C14.3669 13.1433 13.908 13.8309 13.329 14.4099C12.7501 14.9888 12.0625 15.4478 11.3057 15.7601C10.5489 16.0726 9.73786 16.2326 8.91911 16.2308H7.5345C6.71574 16.2326 5.90471 16.0726 5.14793 15.7601C4.39116 15.4478 3.70356 14.9888 3.12461 14.4099C2.54566 13.8309 2.08678 13.1433 1.7743 12.3866C1.46182 11.6298 1.3019 10.8188 1.30373 10"
                  stroke="#B18CFA"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.22656 16.2305V18.9997"
                  stroke="#B18CFA"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {message && (
        <button
          onClick={sendMessage}
          className="bg-forth rounded-full w-12 h-12 flex items-center justify-center"
        >
          <FaAngleUp className="text-white" />
        </button>
      )}
    </div>
  );
};
