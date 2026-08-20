import { Stalinist_One } from 'next/font/google';
import './globals.css';

const stalinist = Stalinist_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-stalinist',
});

export const metadata = {
  title: 'The Cap — Limited Edition',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={stalinist.variable}>
      <body style={{ margin: 0, padding: 0, background: '#080808' }}>
        {children}
      </body>
    </html>
  );
}
