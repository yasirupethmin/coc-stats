import './globals.css';

export const metadata = {
  title: 'CoC Dashboard — Clash of Clans Player Stats & Progress Tracker',
  description:
    'Visualize your Clash of Clans progression, track upgrade status, and calculate remaining resources to max out your base. Free, open-source dashboard powered by the official CoC API.',
  keywords: 'Clash of Clans, CoC, dashboard, upgrade tracker, progress, stats',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e1a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
