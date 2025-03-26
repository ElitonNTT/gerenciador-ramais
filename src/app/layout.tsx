import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import Header from "../components/Layout/header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Ramais UniFAMA",
  description: "Lista de ramais internos | UniFAMA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
