import { AdkResponse } from "@/types/adk";
import { Tool, tools } from "@/types/llm/tools/tool";

const ADK_URL = "http://localhost:8000/api/v1/adk";

export class PromptRequest {
  user_id: string;
  message: string;
  session_id?: string;
  instruction?: string;
  tools?: string[] = tools;

  constructor({ session_id }: { session_id?: string }) {
    this.user_id = "test_user";
    this.session_id = session_id;
  }

  public async request(message: string): Promise<AdkResponse> {
    this.message = message;

    const requestData = {
      user_id: this.user_id,
      message: this.message,
      session_id: this.session_id,
      instruction: this.instruction,
      tools: this.tools
    };

    const res = await this.fetch(requestData);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    }
  }

  private async fetch(data: unknown) {
    const res = await fetch(`${ADK_URL}/marketer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    return res;
  }
}
