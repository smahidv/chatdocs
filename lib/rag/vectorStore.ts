import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { createEmbeddings } from "../ai/embeddings";
import { loadDocuments } from "./loader";

let retriever: ReturnType<MemoryVectorStore["asRetriever"]> | null = null;

export async function initializeVectorStore() {
    if (retriever) {
    console.log("✅ Reusing existing vector store");
    return;
  }
console.log("🚀 Building vector store...");
  const documents = await loadDocuments();

 console.log(`Loaded ${documents.length} chunks`);
  console.log(`Loaded ${documents.length} chunks`);

  const embeddings = createEmbeddings();

  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );

  retriever = vectorStore.asRetriever({
    k: 3,
  });
  console.log("✅ Vector store ready");
}

export function getRetriever() {
  if (!retriever) {
    throw new Error("Vector store has not been initialized.");
  }

  return retriever;
}