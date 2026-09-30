import fs from "node:fs/promises";

import { getData } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";

PDFParse.setWorker(getData());

import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const DOCUMENT_PATH = "./documents/nextjs-docs.pdf";

export async function loadDocuments(): Promise<Document[]> {
  const file = await fs.readFile(DOCUMENT_PATH);

  const parser = new PDFParse({
    data: file,
  });

  const result = await parser.getText();

  const document = new Document({
    pageContent: result.text,
    metadata: {
      source: DOCUMENT_PATH,
    },
  });

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  return splitter.splitDocuments([document]);
}