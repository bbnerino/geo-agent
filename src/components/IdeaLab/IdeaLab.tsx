import { useState } from "react";
import ChattingInput from "./ChattingInput";

export default function IdeaLab() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    setInputValue("");
    console.log("submit");
  };

  return (
    <div className="content-container content-container-right lg:flex-1 h-full flex flex-col">
      <div className="content-container-header">
        <h1>Idea Lab</h1>
      </div>
      <div className="flex-1 p-4 bg-red-50 overflow-y-auto">HI</div>

      <ChattingInput
        inputValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
