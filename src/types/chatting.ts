export class Message {
  id?: string;
  role: "user" | "assistant" | "system" | "tool";
  content?: string;
  author?: string;

  constructor(content: string, role: "user" | "assistant" | "system" | "tool", author?: string) {
    this.role = role;
    this.content = content;
    this.author = author;
  }
}
