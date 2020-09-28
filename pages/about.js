import Head from 'next/head';
import Link from 'next/link'
import Breadcrumb from '../components/breadcrumb.js'

export default function About() {
  return (
    <>
      <Head>
        <title>このサイトについて | Hangri-La</title>
        <meta name="description" content="Hangri-Laのサイト紹介です。" />
      </Head>

      <Breadcrumb items={[
        {text: 'このサイトについて'},
      ]} />

      <div className="flex flex-row sm:flex-row items-center bg-gray-100 rounded mb-12 px-2 sm:px-10 py-4">
        <div className="w-2/3 sm:w-3/5">
          <h1 className="text-lg font-bold pb-2">
            このサイトについて
          </h1>
        </div>
        <div className="w-1/3 sm:w-2/5 px-0 sm:px-0 pb-0 sm:pb-0">
          <img src="/images/b0141.png" />
        </div>
      </div>

      <div className="text-sm">
        <div className="mb-12">
          <h1 className="text-lg font-bold border-b pb-2 mb-4">Hangri-La（ハングリラ）とは</h1>
          <p>
            Hangri-La（ハングリラ）は、漢字を用いて韓国語を効率的に学ぶことができるサイトです。
            <br />
            韓国語学習者にとってのシャングリラ（桃源郷）みたいな感じを目指して、ハングリラという名前をつけています。
          </p>
        </div>

        <div className="mb-12">
          <h1 className="text-lg font-bold border-b pb-2 mb-4">Hangri-La（ハングリラ）とは</h1>
          <p>
            Hangri-La（ハングリラ）は、漢字を用いて韓国語を効率的に学ぶことができるサイトです。
            <br />
            韓国語学習者にとってのシャングリラ（桃源郷）みたいな感じを目指して、ハングリラという名前をつけています。
          </p>
        </div>
      </div>
    </>
  )
}
