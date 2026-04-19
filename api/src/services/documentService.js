import Tesseract from "tesseract.js";
import { PdfData, VerbosityLevel } from "pdfdataextract";

import {extractInvoiceData} from "./agentService.js"

const MAX_PREVIEW_LENGTH = 500;

function trimPreview(text) {
  return text.replace(/\s+/g, " ").trim().slice(0, MAX_PREVIEW_LENGTH);
}

export async function extractTextFromDocument(file) {
  if (!file) {
    throw new Error("A document upload is required.");
  }

  const isPlainText =
    file.mimetype.startsWith("text/") || file.originalname.toLowerCase().endsWith(".txt");

  if (isPlainText) {
    return file.buffer.toString("utf-8");
  }

  if (file.mimetype === "application/pdf") {
    const pdfData = await PdfData.extract(file.buffer, {
      verbosity: VerbosityLevel.ERRORS,
      get: { text: true },
    });

    // If PDF has extractable text, use it
    if (pdfData.text.join("\n").trim()) {
      return pdfData.text.join("\n");
    }

    // Otherwise, PDF is likely scanned - would need pdf-to-image conversion
    return "Scanned PDFs require image conversion before OCR.";
  }

  // Handle images
  if (file.mimetype.startsWith("image/")) {
    const { data } = await Tesseract.recognize(file.buffer, "eng");
    return data.text;
  }
  
  return `File type is not supported: ${file.mimetype}, please use the following file types: .txt, .pdf, .jpg, .png`;
}

export async function summarizeDocumentText(text) {
  const preview = trimPreview(text);
  const summary = await extractInvoiceData(text)
  
  return {
    summary: summary,
    extractedTextPreview: preview,
    nextStep:
      "Send the OCR output to OpenAI and return the model summary along with any evaluation metadata you want to score."
  };
}
