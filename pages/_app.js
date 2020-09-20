import Head from 'next/head'
import "../styles/tailwind.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Hangrila</title>
      </Head>
      <div className="max-w-screen-sm mx-auto px-1 sm:px-0">
        <header className="text-gray-700 body-font">
          <div className="py-5">
            <a className="title-font text-gray-900">
              <span className="text-lg">hangri-la</span>
            </a>
          </div>
        </header>

        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App
