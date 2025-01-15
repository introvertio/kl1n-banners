import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kl1n Banners",
  description: "Generate Banners for your social media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
