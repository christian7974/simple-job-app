import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Application Tracker",
  description: "Application to help people track their job applications",
  keywords: ['job', 'application', 'track', 'job application', 'job tracker'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
