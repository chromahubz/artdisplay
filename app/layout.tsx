import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArtDisplay - Showcase Your Art in Stunning 3D Mockups",
  description: "Transform your artwork into professional mockups with realistic 3D perspective. Drag-and-drop interface, multiple templates, instant export. Simple, beautiful, powerful.",
  keywords: ["art mockup", "3D mockup", "artwork display", "portfolio mockup", "frame mockup", "gallery wall"],
  authors: [{ name: "ArtDisplay" }],
  creator: "ArtDisplay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://artdisplay.vercel.app",
    title: "ArtDisplay - Showcase Your Art in Stunning 3D Mockups",
    description: "Transform your artwork into professional mockups with realistic 3D perspective",
    siteName: "ArtDisplay",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtDisplay - Showcase Your Art in Stunning 3D Mockups",
    description: "Transform your artwork into professional mockups with realistic 3D perspective",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
