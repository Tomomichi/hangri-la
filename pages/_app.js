import Head from 'next/head'
import "../styles/tailwind.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Hangrila</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App
