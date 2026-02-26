import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'קופי הנטר | מוצאים את ההפוך המושלם',
  description: 'מצא את בית הקפה הטוב ביותר לקפה הפוך גדול חזק, על בסיס מים עם חלב דל בתל אביב.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
