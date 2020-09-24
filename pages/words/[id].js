import { firebase } from '../../lib/firebase.js'
import Link from 'next/link'

export default function Index({word, chars}) {
  return (
    <>
      <div className="flex flex-col bg-gray-200 text-center mb-12">
        <div className="py-4 border-white border-b-4 font-bold">
          <p className="text-2xl">{word.id}</p>
        </div>
        <div className="flex flex-row">
          <div className="flex-1 py-4 bg-gray-200 text-center border-white border-r-2">
            <p className="text-2xl">
              { chars.map(char => (
                <span key={char.id}>{char.hangul}</span>
              )) }
            </p>
          </div>
          <div className="flex-1 py-4 bg-gray-200 text-center border-white border-l-2">
            <p className="text-2xl">
              { chars.map(char => (
                <span key={char.id}>{char.kana[0]["value"]}</span>
              )) }
            </p>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-lg font-bold mb-4">▼ 「{word.id}」に含まれる漢字</h3>
        <ul className="border-b-2">
          { chars.map(char => (
            <Link key={char.id} href="/chars/[id]" as={`/chars/${char.id}`}>
              <a>
                <li className="p-3 border-t-2">
                  {char.id}
                </li>
              </a>
            </Link>
          )) }
        </ul>
      </div>
    </>
  )
}


export async function getStaticPaths() {
  const snapshot = await firebase.firestore().collection('words').get();
  const paths = snapshot.docs.map(doc => {
    return {params: {id: doc.id}}
  });

  return {
    paths,
    fallback: true,
  }
}


export async function getStaticProps({params}) {
  // word
  const wordDoc = await firebase.firestore().collection('words').doc(params.id).get();
  const word = Object.assign(wordDoc.data(), {id: wordDoc.id});

  // chars
  const charsSnapshot = await firebase.firestore().collection('chars').where(firebase.firestore.FieldPath.documentId(), "in", word.chars).get();
  let chars = [];
  charsSnapshot.forEach(doc => {
    const index = word.chars.findIndex(item => item == doc.id); // word.charsの並び順を保持
    chars[index] = Object.assign(doc.data(), {id: doc.id});
  });

  return {
    props: {
      word: word,
      chars: chars,
    }
  }
}
