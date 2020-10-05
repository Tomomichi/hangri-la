import { firebase } from '../lib/firebase.js'
import Link from 'next/link'
import ListItem from '../components/listItem.js'

export default function Index({chars, words}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center bg-gray-100 rounded-none sm:rounded mb-8 px-2 sm:px-10 py-12 sm:py-4 -mx-2 sm:mx-auto -mt-4 sm:mt-0">
        <div className="w-full sm:w-3/5">
          <p className="text-lg font-bold pb-2">
            韓国語を<span className="text-red-600">漢字</span>で効率的に学ぼう！
          </p>
          <p className="text-sm">
            韓国語の単語の70%程度は漢字由来で、日本語と発音が近いものも多いです。
            <br />
            漢字の知識を活かして効率的に韓国語を学びましょう。
          </p>
          <p className="text-xs flex items-center mt-2">
            <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
            <Link href="/about">
              <a className="border-b border-dashed border-gray-700 hover:opacity-75">もっとくわしく</a>
            </Link>
          </p>
        </div>
        <div className="w-full sm:w-2/5 px-12 sm:px-0 pt-8 sm:pt-0">
          <img src="/images/b0610.png" />
        </div>
      </div>

      <div className="mb-12">
        <div className="flex flex-col sm:flex-row">
          <Link href="/">
            <a className="flex-1 flex items-center bg-gray-100 border rounded p-4 mr-0 sm:mr-2 mb-4 sm:mb-0 hover:opacity-75">
              <div className="text-4xl mr-2">💡</div>
              <div className="flex-1">
                <small className="text-sm">覚えたらすぐ使える！</small>
                <span className="font-bold block">日本語とほぼ同じ発音の漢字語</span>
              </div>
            </a>
          </Link>
          <Link href="/">
            <a className="flex-1 flex items-center bg-gray-100 border rounded p-4 hover:opacity-75">
              <div className="text-4xl mr-2">🧑‍🎓</div>
              <div className="flex-1">
                <small className="text-sm">日本語にはないけど</small>
                <span className="font-bold block">何となく意味がわかる漢字語</span>
              </div>
            </a>
          </Link>
        </div>

        <p className="flex items-center justify-end text-gray-700 text-sm mt-4">
          <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
          <Link href="/chars">
            <a className="border-b border-dashed border-gray-700 hover:opacity-75">すべての特集を見る</a>
          </Link>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="mb-12 flex-1 mr-0 sm:mr-4">
          <h3 className="text-lg font-bold mb-4">▼ 漢字</h3>
          <ul className="border-t border-b divide-y">
            { chars.map(char => (
              <ListItem key={char.id} href="/chars/[id]" as={`/chars/${char.id}`} content={`
                ${char.id}
                <small className="text-sm ml-1">(${char.hangul})</small>
              `} />
            )) }
          </ul>
          <p className="flex items-center justify-end text-gray-700 text-sm mt-4">
            <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
            <Link href="/chars">
              <a className="border-b border-dashed border-gray-700 hover:opacity-75">すべての漢字を見る</a>
            </Link>
          </p>
        </div>

        <div className="mb-12 flex-1 ml-0 sm:ml-4">
          <h3 className="text-lg font-bold mb-4">▼ 漢字語</h3>
          <ul className="border-t border-b divide-y">
            { words.map(word => (
              <ListItem key={word.id} href="/words/[id]" as={`/words/${word.id}`} content={`
                ${word.id}
                <small className="text-sm ml-1">(${word.hangul})</small>
              `} />
            )) }
          </ul>
          <p className="flex items-center justify-end text-gray-700 text-sm mt-4">
            <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
            <Link href="/words">
              <a className="border-b border-dashed border-gray-700 hover:opacity-75">すべての漢字語を見る</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


export async function getStaticProps(context) {
  const charsSnapshot = await firebase.firestore().collection('chars').limit(5).get();
  const chars = charsSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString(),
    })
  );

  const wordsSnapshot = await firebase.firestore().collection('words').limit(5).get();
  const words = wordsSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString(),
    })
  );

  return {
    props: {
      chars: chars,
      words: words,
    }
  }
}
