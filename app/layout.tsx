import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AI Dev Hub — VibeLaunch",
  description:
    "The premier catalog for AI developers. Discover LLM models, MCP servers, and AI skills. Generate your perfect dev environment config in seconds — no login required.",
  keywords: [
    "AI models",
    "MCP servers",
    "AI skills",
    "developer tools",
    "LLM",
    "Cursor",
    "Claude",
    "Antigravity",
    "config generator",
  ],
  openGraph: {
    title: "AI Dev Hub — VibeLaunch",
    description: "Discover AI models, MCP servers, and skills. Generate your config in seconds.",
    type: "website",
    siteName: "VibeLaunch",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Dev Hub — VibeLaunch",
    description: "The premier catalog for AI developers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(16, 16, 24, 0.95)",
              color: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(24px)",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "white",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
