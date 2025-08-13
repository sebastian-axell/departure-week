import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/denmark.svg" />
      </Head>
      <body className="antialiased overflow-y-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
