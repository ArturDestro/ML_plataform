import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ML Model Serving Platform",
  description: "Plataforma para treinar, avaliar e servir modelos de ML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}