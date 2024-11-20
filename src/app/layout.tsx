import '@/reset.css';
import '@/index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SNUTT 7조</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
