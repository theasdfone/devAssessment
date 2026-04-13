# Candidate Instructions

Build out this starter into a working document-processing assessment app.

## Your task

Complete the upload flow so that a user can:

1. Upload a document from the `frontend`
2. Send the file to the `api`
3. Run OCR against the uploaded document
4. Send the extracted text to OpenAI
5. Return a useful summary to the frontend

## Requirements

- Fork this repository into your own public repository before making changes.
- Use the OpenAI API key provided to you separately offline.
- Use the files in `/testDocs` to test your implementation.
- Keep the existing project structure with sibling `api` and `frontend` folders.
- Make reasonable implementation choices and document any assumptions.

## Expected outcome

When the app is running, a reviewer should be able to:

1. Start the API and frontend locally
2. Upload one of the documents from `/testDocs`
3. See OCR output successfully processed
4. Receive an OpenAI-generated summary in the UI

## Notes

- The current API contains placeholder logic for OCR and summary generation.
- You may install additional packages if needed.
- Favor a clean, readable implementation over over-engineering.
- If some file types are unsupported, explain that clearly in your final notes.

## What to submit

- A link to your completed public repository
- Brief setup and run instructions
- A short note describing your OCR approach, OpenAI integration, and any tradeoffs
