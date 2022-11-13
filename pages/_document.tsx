import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Mono&family=Space+Mono&family=Spline+Sans+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-accent-2 dark:bg-material-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
