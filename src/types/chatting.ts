export class Message {
  id?: string;
  role: "user" | "assistant" | "system";
  content?: string;
  author?: string;

  constructor(content: string, role: "user" | "assistant" | "system", author?: string) {
    this.role = role;
    this.content = content;
    this.author = author;
  }
}
