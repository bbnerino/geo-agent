import { useState } from "react";
import ChattingInput from "./ChattingInput";
import ChattingContent from "./ChattingContent";
import { PromptRequest } from "@/api/adk";
import { useRouter, useSearchParams } from "next/navigation";
import { useMessageStore } from "@/store/messages";

export default function IdeaLab() {
  const [inputValue, setInputValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const session_id = searchParams.get("session_id");
  const [sessionId, setSessionId] = useState(session_id);
  const promptRequest = new PromptRequest({ session_id: sessionId });

  const [isLoading, setIsLoading] = useState(false);

  const { messages, pushUserMessage, pushAssistantMessage, pushToolMessage } = useMessageStore();

  const handleSubmit = async () => {
    setIsLoading(true);
    pushUserMessage(inputValue);
    setInputValue("");
    const res = await promptRequest.request(inputValue).finally(() => setIsLoading(false));
    if (res.session_id !== session_id) {
      setSessionId(res.session_id);
      router.replace(`/?session_id=${res.session_id}`);
    }

    const messages = res.messages;

    messages.forEach((message) => {
      const content = message.content?.parts?.[0];
      if (!content) return;
      if (content.role === "user") {
        if (content?.functionResponse) {
          pushUserMessage(content.functionResponse.name ?? "-", message.author);
        }
      } else {
        console.log("🔵", content);
        if (content?.functionCall) {
          pushToolMessage(
            content.functionCall.name ? `함수 호출 : ${content.functionCall.name}` : "-",
            message.author
          );
          return;
        }
        if (content?.functionResponse) {
          if (content.functionResponse.name === "update_content") {
            const newContent = content?.functionResponse.response.content;

            pushToolMessage(newContent, "update_content");
          }
          return;
        } else {
          // ???
          pushAssistantMessage(content.text ?? "-", message.author);
        }
      }
    });
  };

  return (
    <div className="content-container content-container-right h-full flex flex-col">
      <div className="content-container-header">
        <h1>Idea Lab</h1>
      </div>
      <div className="flex-1 p-4 bg-white overflow-y-auto">
        <ChattingContent messages={messages} isLoading={isLoading} />
      </div>

      <ChattingInput inputValue={inputValue} onChange={(e) => setInputValue(e.target.value)} onSubmit={handleSubmit} />
    </div>
  );
}
