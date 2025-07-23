import { useState } from "react";
import ChattingInput from "./ChattingInput";
import ChattingContent from "./ChattingContent";
import { Message } from "@/types/chatting";

export default function IdeaLab() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    setInputValue("");
    console.log("submit");
  };

  const [messages, setMessages] = useState<Message[]>([
    new Message("안녕하세요", "user"),
    new Message("안녕하세요", "assistant")
  ]);

  return (
    <div className="content-container content-container-right h-full flex flex-col">
      <div className="content-container-header">
        <h1>Idea Lab</h1>
      </div>
      <div className="flex-1 p-4 bg-white overflow-y-auto">
        <ChattingContent messages={messages} isLoading={false} />
      </div>

      <ChattingInput inputValue={inputValue} onChange={(e) => setInputValue(e.target.value)} onSubmit={handleSubmit} />
    </div>
  );
}
