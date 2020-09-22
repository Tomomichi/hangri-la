import Link from 'next/link'
import Head from 'next/head'
import "../styles/tailwind.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Hangri-La</title>
      </Head>
      <div className="max-w-screen-lg mx-auto px-2 sm:px-0">
        <header className="text-gray-700 body-font">
          <div className="py-5">
            <Link href="/">
              <a className="title-font text-gray-900">
                <span className="text-lg">Hangri-La</span>
              </a>
            </Link>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row">
          <div className="w-full md:w-2/3 mr-0 sm:mr-24 mb-24 sm:mb-0">
            <Component {...pageProps} />
          </div>
          <div className="w-full md:w-1/3 bg-gray-300">
          </div>
        </div>
      </div>
    </>
  );
}

export default App
