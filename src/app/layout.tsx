import React from 'react';
import '@/styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Amrik Singh | Cyberpunk Portfolio',
  description: 'A futuristic cyberpunk portfolio showcasing my work and skills',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
} 