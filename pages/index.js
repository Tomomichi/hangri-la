import { firebase } from '../lib/firebase.js'
import Link from 'next/link'
import ListItem from '../components/listItem.js'

export default function Index({chars, words}) {
  return (
    <div>
      <div className="mb-12">
        <h3 className="text-lg font-bold mb-4">▼ 最近登録された漢字</h3>
        <ul className="border-t-2">
          { chars.map(char => (
            <ListItem key={char.id} href="/chars/[id]" as={`/chars/${char.id}`} content={`
              ${char.id}
              <small className="text-sm ml-1">(${char.hangul})</small>
            `} />
          )) }
        </ul>
        <Link href="/chars">
          <a className="mt-4 flex items-center justify-end text-sm text-gray-800">
            <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
            すべての漢字を見る
          </a>
        </Link>
      </div>

      <div className="mb-12">
        <h3 className="text-lg font-bold mb-4">▼ 最近登録された熟語</h3>
        <ul className="border-t-2">
          { words.map(word => (
            <ListItem key={word.id} href="/words/[id]" as={`/words/${word.id}`} content={`
              ${word.id}
              <small className="text-sm ml-1">(${word.hangul})</small>
            `} />
          )) }
        </ul>
        <Link href="/words">
          <a className="mt-4 flex items-center justify-end text-sm text-gray-800">
            <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
            すべての熟語を見る
          </a>
        </Link>
      </div>
    </div>
  )
}


export async function getStaticProps(context) {
  const charsSnapshot = await firebase.firestore().collection('chars').limit(5).get();
  const chars = charsSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  const wordsSnapshot = await firebase.firestore().collection('words').limit(5).get();
  const words = wordsSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  return {
    props: {
      chars: chars,
      words: words,
    }
  }
}
