import { createChatModel } from "../ai/chat-model";
import { initializeRag } from "../rag";
import { getRetriever } from "../rag/vectorStore";

export async function* generateReply(question: string) {
     await initializeRag(); 
  const retriever = getRetriever();
console.time("Retriever");

  const documents = await retriever.invoke(question);
  console.timeEnd("Retriever");
console.time("LLM");

  const context = documents
    .map((doc) => doc.pageContent)
    .join("\n\n");

  const model = createChatModel();

  const stream = await model.stream(`
You are a helpful assistant.

Answer ONLY from the context below.

If the answer is not in the context, say:
"I couldn't find that information in the document."

Context:
${context}

Question:
${question}
`);
console.timeEnd("LLM");
  for await (const chunk of stream) {
    yield chunk.content.toString();
  }
}

