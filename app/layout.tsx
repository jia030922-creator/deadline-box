import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deadline Box",
  description: "Personal deadline-based task submissions"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
