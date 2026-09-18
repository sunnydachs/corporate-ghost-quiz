import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "What Corporate Ghost Are You? (Self-Roast Quiz)",
  description:
    "Take the self-roast personality quiz and discover your haunted work style.",
  openGraph: {
    title: "What Corporate Ghost Are You? (Self-Roast Quiz)",
    description:
      "Eight questions. One cursed corporate ghost. No recovery plan.",
    type: "website",
    images: [{ url: "/og-bg.png", width: 1200, height: 630, alt: "A haunted office at midnight — Corporate Ghost Quiz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Corporate Ghost Are You?",
    description:
      "Eight questions. One cursed corporate ghost. No recovery plan.",
    images: ["/og-bg.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#07111f" />
      </head>
      <body>{children}</body>
    </html>
  );
}
