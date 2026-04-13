# Software Assessment Starter

This repo contains two sibling apps:

- `api`: Node.js + Express API with CORS enabled
- `frontend`: React + Next.js frontend for uploading a document

Candidate directions live in `CANDIDATE_INSTRUCTIONS.md`.

## Suggested exercise flow

1. Upload a document from the frontend
2. Send it to the API
3. Run OCR in the API for image or PDF documents
4. Send the extracted text to OpenAI for a summary
5. Return the summary to the frontend

The current implementation is intentionally a starter:

- plain text files are read directly
- PDFs and images return an OCR placeholder message
- OpenAI summary generation is stubbed

## Run the API

```bash
cd api
copy .env.example .env
npm install
npm run dev
```

## Run the frontend

```bash
cd frontend
copy .env.local.example .env.local
npm install
npm run dev
```

The frontend expects the API at `http://localhost:4000` by default.
