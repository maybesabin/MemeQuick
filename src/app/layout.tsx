import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import emoji from "../assets/goofy.png"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ],
});

export const metadata: Metadata = {
  title: "Meme Quick",
  description: "Quickly generate memes.",
  icons: {
    icon: emoji.src,
    shortcut: emoji.src,
    apple: emoji.src
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
