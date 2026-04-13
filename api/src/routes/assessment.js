import express from "express";
import multer from "multer";
import {
  extractTextFromDocument,
  summarizeDocumentText
} from "../services/documentService.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

router.post("/summarize", upload.single("document"), async (req, res) => {
  try {
    const extractedText = await extractTextFromDocument(req.file);
    const result = await summarizeDocumentText(extractedText);

    res.json({
      fileName: req.file?.originalname ?? null,
      mimeType: req.file?.mimetype ?? null,
      ...result
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || "Unable to summarize the uploaded document."
    });
  }
});

export default router;
