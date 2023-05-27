import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const openGraphImage = {
  images: [
    `${
      process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
    }/api/og`,
  ],
};
export const metadata = {
  title: "Seçim çetele v3",
  description: "Seçim çetele v3",
  openGraph: {
    ...openGraphImage,
    title: "Seçim çetele v3",
    description: "Seçim çetele v3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
