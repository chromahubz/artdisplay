import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArtDisplay - Showcase Your Art in Stunning Mockups",
  description: "Transform your artwork into professional mockups with realistic 3D placement. Simple, beautiful, powerful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
