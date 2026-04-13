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

  return [
    "OCR not implemented yet.",
    "Candidates can replace this placeholder with OCR extraction for PDFs or images",
    "before sending the extracted text to OpenAI."
  ].join(" ");
}

export async function summarizeDocumentText(text) {
  const preview = trimPreview(text);

  return {
    summary: "Summary generation not implemented yet. Replace this stub with an OpenAI call.",
    extractedTextPreview: preview,
    nextStep:
      "Send the OCR output to OpenAI and return the model summary along with any evaluation metadata you want to score."
  };
}
