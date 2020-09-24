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
      </div>
    </div>
  )
}


export async function getStaticProps(context) {
  const charsSnapshot = await firebase.firestore().collection('chars').get();
  const chars = charsSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  const wordsSnapshot = await firebase.firestore().collection('words').get();
  const words = wordsSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  // word.chars
  const wordCharsKeys = words.map(w => w.chars).flat();
  const wordCharsSnapshot = await firebase.firestore().collection('chars').where(firebase.firestore.FieldPath.documentId(), "in", wordCharsKeys).get();
  let wordChars = {};
  wordCharsSnapshot.forEach(doc => {
    wordChars[doc.id] = Object.assign(doc.data(), {id: doc.id});
  });

  // words.forEach(word => {
  //   word.chars.forEach
  // });

  return {
    props: {
      chars: chars,
      words: words,
    }
  }
}
