import { Loading } from "../../common/Loading";
import { Message } from "./Message";

/* eslint-disable react/prop-types */
export const ChatBox = (props) => {
  const { messages } = props;

  if (!messages) {
    return <Loading />;
  }

  return (
    <div className="flex-1 overflow-auto py-4 px-6 flex flex-col gap-y-2">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    
    </div>
  );
};
