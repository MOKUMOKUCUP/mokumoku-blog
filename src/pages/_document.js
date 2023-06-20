import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/icon-192x192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Noto+Sans+JP&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
