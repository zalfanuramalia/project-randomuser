import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
      return (
        <Html>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap" rel="stylesheet" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument