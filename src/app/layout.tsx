import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import Header from "../components/Layout/header";

export const metadata: Metadata = {
  title: "Ramais Unimed Anápolis",
  description: "Lista de ramais internos | Unimed Anápolis",
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
        </Providers>
      </body>
    </html>
  );
}
