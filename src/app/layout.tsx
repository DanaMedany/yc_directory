import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { Toaster } from "@/components/ui/sonner";

import "easymde/dist/easymde.min.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Pitch, vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <main>
          <Navbar />
          {children}
        </main>
        <Toaster richColors={true} />
      </body>
    </html>
  );
}
