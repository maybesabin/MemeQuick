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

export const metadata = {
  title: "MemeQuick - Make Memes in Seconds | Meme Generator",
  description:
    "Create hilarious memes in seconds with MemeQuick! Upload images, add top & bottom text, stickers, and share your memes instantly.",
  keywords: [
    "Meme generator",
    "MemeQuick",
    "Make memes",
    "Online meme maker",
    "Funny memes",
    "Meme editor",
    "Create memes",
    "Meme templates",
    "Meme creator",
    "Instant memes",
  ],
  icons: {
    icon: emoji.src,
    shortcut: emoji.src,
    apple: emoji.src
  },
  authors: [{ name: "Sabin Hamal" }],
  openGraph: {
    title: "MemeQuick - Make Memes in Seconds | Meme Generator",
    description:
      "Create hilarious memes in seconds with MemeQuick! Upload images, add top & bottom text, stickers, and share your memes instantly.",
    url: "https://meme-quick.vercel.app/",
    siteName: "MemeQuick",
    images: [
      {
        url: emoji,
        width: 1200,
        height: 630,
        alt: "MemeQuick",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "MemeQuick",
    title: "MemeQuick - Make Memes in Seconds | Meme Generator",
    description:
      "Create hilarious memes in seconds with MemeQuick! Upload images, add top & bottom text, stickers, and share your memes instantly.",
    images: [emoji],
  },
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
