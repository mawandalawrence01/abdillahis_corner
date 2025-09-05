import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from '../components/SessionProvider';
import { CartProvider } from '../contexts/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdillahi's Corner - Online Bookstore",
  description: "Discover your next favorite book at Abdillahi's Corner. We offer a wide selection of fiction, non-fiction, academic, and religious books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
