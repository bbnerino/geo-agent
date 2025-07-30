import React, { useState } from "react";
import { useWritingStudioStore } from "@/store/writingStudio";
import Modal2 from "../common/Modal2";
import ChattingInput from "../IdeaLab/ChattingInput";
import ChattingContent from "../IdeaLab/ChattingContent";

import { useTempMessageStore } from "@/store/temp_messages";

import { useMessageStore } from "@/store/messages";

interface Props {
  open: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

const MiniIdeaLab = ({ open, onClose, position }: Props) => {
  const { content, selectedSentence } = useWritingStudioStore();

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);
  const {
    promptRequest,
    pushUserMessage: pushMainUserMessage,
    pushAssistantMessage: pushMainAssistantMessage,
    pushToolMessage: pushMainToolMessage
  } = useMessageStore();

  const { messages, pushUserMessage, pushAssistantMessage, pushToolMessage } = useTempMessageStore();

  const handleSubmit = async () => {
    setIsLoading(true);
    pushUserMessage(inputValue);
    setInputValue("");
    const request = `
    - type : patch_content
    - content : ${content}
    - selectedSentence : ${selectedSentence}
    - input : ${inputValue}
    `;
    const res = await promptRequest.request(request).finally(() => setIsLoading(false));

    const messages = res.messages;

    messages.forEach((message) => {
      const content = message.content?.parts?.[0];
      if (!content) return;
      if (content.role === "user") {
        if (content?.functionResponse) {
          pushUserMessage(content.functionResponse.name ?? "-", message.author);
          pushMainUserMessage(content.functionResponse.name ?? "-", message.author);
        }
      } else {
        console.log("🔵", content);
        if (content?.functionCall) {
          pushToolMessage(content.functionCall.name ? `함수 호출 : ${content.functionCall.name}` : "-", message.author);
          pushMainToolMessage(
            content.functionCall.name ? `함수 호출 : ${content.functionCall.name}` : "-",
            message.author
          );
          return;
        }
        if (content?.functionResponse) {
          if (content.functionResponse.name === "update_content") {
            const newContent = content?.functionResponse.response.content;

            pushToolMessage(newContent, "update_content");
            pushMainToolMessage(newContent, "update_content");
          }
          return;
        } else {
          // ???
          pushAssistantMessage(content.text ?? "-", message.author);
          pushMainAssistantMessage(content.text ?? "-", message.author);
        }
      }
    });
  };

  return (
    <Modal2 size="medium" open={open} onClose={onClose} position={position}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="text-gray-500 font-semibold text-lg">선택된 텍스트</div>
          <div className="text-black-500 text-sm">{selectedSentence || "-"}</div>
        </div>

        <div className="flex-1 p-4 bg-white overflow-y-auto">
          <ChattingContent messages={messages} isLoading={isLoading} size="sm" />
        </div>
      </div>
      <ChattingInput inputValue={inputValue} onChange={handleInputChange} onSubmit={handleSubmit} />
    </Modal2>
  );
};

export default MiniIdeaLab;
