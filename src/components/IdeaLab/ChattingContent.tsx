import { Message } from "@/types/chatting";
import React, { useEffect, useRef } from "react";
import LoadingMessage from "./message/LoadingMessage";
import UserMessage from "./message/UserMessage";
import SystemMessage from "./message/SystemMessage";
import ToolMessage from "./message/ToolMessage";

const ChattingContent = ({ messages, isLoading }: { messages: Message[]; isLoading: boolean }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Scroll 영역
  return (
    <div className="chat-scroll w-full h-[calc(100vh-300px)] overflow-y-auto">
      <div className="flex flex-col gap-2 items-start" id="chatting-area">
        {messages.map((message, index) => {
          if (message.role === "user") {
            return <UserMessage message={message.content} key={index} />;
          }
          if (message.role === "tool") {
            return <ToolMessage key={index} message={message.content} author={message.author} />;
          }
          return <SystemMessage key={index} role={message.role} message={message.content} author={message.author} />;
        })}
        {isLoading && <LoadingMessage />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChattingContent;
