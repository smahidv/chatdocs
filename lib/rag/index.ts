import { initializeVectorStore } from "./vectorStore";

let initialized = false;

export async function initializeRag() {
  if (initialized) {
    return;
  }

  await initializeVectorStore();

  initialized = true;
}