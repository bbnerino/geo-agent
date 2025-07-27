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

  const { messages, pushUserMessage, pushAssistantMessage } = useMessageStore();

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
        if (content?.function_response) {
          pushUserMessage(content.function_response.name ?? "-", message.author);
        }
      } else {
        if (content?.function_call) {
          pushAssistantMessage(content.function_call.name ?? "-", message.author);
        } else {
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
