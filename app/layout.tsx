import { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "JSON.pizza — Format",
  description: "Format — Prettify, inspect and share your JSON data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-accent-2 dark:bg-material-dark">{children}</body>
    </html>
  );
}
