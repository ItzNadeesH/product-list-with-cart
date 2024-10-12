import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import "./globals.css";

const redhattext = Red_Hat_Text({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product list with the cart",
  description: "Product list with the cart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={redhattext.className}>{children}</body>
    </html>
  );
}
