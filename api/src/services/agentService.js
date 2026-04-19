import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function extractInvoiceData(text) {
    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
content: `You are an invoice data extraction agent. Given invoice text, do the following:

1. Write a brief human-readable summary of the invoice.
2. Extract the fields below and return them on a single line as a compact JSON string with no markdown, code blocks, indentation, or line breaks.

Fields:
- vendor (string)
- address (string)
- invoiceNumber (string)
- invoiceDate (string)
- dueDate (string)
- billTo (string)
- totalAmount (number)

Rules:
- Omit any field that cannot be found.
- Convert values to the correct type where possible.
- If an error occurs, return only the error message.
`,
            },
            {
                role: "user",
                content: text,
            },
        ],
    });

    return response.choices[0].message.content ?? "";
}