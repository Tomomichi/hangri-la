import Head from 'next/head';
import Link from 'next/link'
import Sidebar from '../components/sidebar.js'
import "../styles/tailwind.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Hangri-La(ハングリラ) - 韓国語を漢字で効率的に学べるサイト</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="韓国語,漢字,漢字語,ハングル,日本語,音韻,読み方,発音,違い,単語,学習,効率的" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Hangri-La(ハングリラ)は、漢字を活用して韓国語を効率的に学べるように設計された韓国語学習サービスです。" />
        <meta property="og:title" content="Hangri-La(ハングリラ) - 韓国語を漢字で効率的に学べるサイト" />
        <meta property="og:url" content="https://hangri-la.vercel.app" />
        <meta property="og:image" content="https://scaas.vercel.app/api?url=https://hangri-la.vercel.app" />
        <meta property="og:site_name" content="Hangri-La(ハングリラ) - 韓国語を漢字で効率的に学べるサイト" />
        <meta property="og:description" content="Hangri-La(ハングリラ)は、漢字を活用して韓国語を効率的に学べるように設計された韓国語学習サービスです。" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="Hangri-La(ハングリラ)は、漢字を活用して韓国語を効率的に学べるように設計された韓国語学習サービスです。" />
        <meta name="twitter:image:src" content="https://scaas.vercel.app/api?url=https://hangri-la.vercel.app" />
      </Head>

      <header className="mb-4 border-b">
        <div className="max-w-screen-lg mx-auto px-2 lg:px-0 py-3">
          <Link href="/">
            <a className="title-font text-gray-900">
              <span className="text-lg font-bold">Hangri-La</span>
              <small>（ハングリラ）</small>
            </a>
          </Link>
          <small className="text-xs text-red-600 border border-red-600 rounded px-1 py-1">BETA</small>
          <div className="text-xs text-gray-700 pl-3 hidden sm:inline">韓国語を漢字で効率的に学べるサイト</div>
        </div>
      </header>

      <div className="max-w-screen-lg mx-auto px-2 lg:px-0 text-gray-700">
        <div className="flex flex-col md:flex-row">
          <div className="max-w-screen-sm w-full md:w-2/3 mx-auto md:mr-24 mb-12">
            <Component {...pageProps} />
          </div>
          <div className="w-full md:w-1/3">
            <Sidebar />
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-200 text-center py-12 mt-40">
        <div className="mb-4">
          <h5>
            <span className="text-lg">Hangri-La</span>
            <span className="text-sm">（ハングリラ）</span>
          </h5>
          <small className="text-xs text-gray-400">〜 漢字で効率的に韓国語を学習するサイト 〜</small>
        </div>
        <p className="text-sm text-gray-400">
          © 2020 Hangri-La. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default App
