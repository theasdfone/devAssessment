import "./globals.css";

export const metadata = {
  title: "Software Assessment Tool",
  description: "Upload a document and summarize it through the assessment API."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
