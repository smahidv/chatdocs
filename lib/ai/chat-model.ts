import { ChatOllama } from "@langchain/ollama";

export function createChatModel() {
  return new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama3.2:3b",
    temperature: 0,
  });
}