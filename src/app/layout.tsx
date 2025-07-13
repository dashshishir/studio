import type { Metadata } from 'next';
import './globals.css';
import 'react-quill/dist/quill.snow.css';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'DevOpsHub',
  description: 'Your gateway to mastering DevOps principles and practices.',
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
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <div className="relative flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
