import { firebase } from '../../lib/firebase.js'
import Link from 'next/link'

export default function Index({word}) {
  return (
    <>
      <div className="py-4 border-solid border-4 text-center">
        <h1 className="text-2xl">{word.id}</h1>
      </div>

      <div className="my-12">
        <h3 className="text-lg font-bold mb-4">▼ 「{word.id}」に含まれる漢字</h3>
        <ul className="border-b-2">
          { word.chars.map(char => (
            <Link href="/chars/[id]" as={`/chars/${char}`}>
              <a>
                <li key={char} className="p-3 border-t-2">
                  {char}
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
  const paths = [
    { params: { id: '漢字' } },
  ];

  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({params}) {
  let docRef = firebase.firestore().collection('words').doc(params.id);
  const doc = await docRef.get();
  let word = doc.data();
  word.id = doc.id;

  return {
    props: {
      word: word
    }
  }
}
