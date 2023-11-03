import Provider from '@/provider/Provider';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@styles/reset.scss';

const noto_sans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={noto_sans.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
