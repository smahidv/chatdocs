import { OllamaEmbeddings } from "@langchain/ollama";

export function createEmbeddings() {
  return new OllamaEmbeddings({
    baseUrl: "http://localhost:11434",
    model: "nomic-embed-text",
  });
}