import Link from 'next/link'
import Head from 'next/head'
import "../styles/tailwind.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Hangrila</title>
      </Head>
      <div className="max-w-screen-sm mx-auto px-2 sm:px-0">
        <header className="text-gray-700 body-font">
          <div className="py-5">
            <Link href="/">
              <a className="title-font text-gray-900">
                <span className="text-lg">hangri-la</span>
              </a>
            </Link>
          </div>
        </header>

        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App
