import { firebase } from '../../lib/firebase.js'
import Link from 'next/link'

export default function Index({word}) {
  return (
    <div className="container mx-auto">
      <h1 className="text-6xl">{word.id}</h1>

      <div>
        { word.chars.map(char => (
          <div key={char} className="text-3xl">
            <Link href="/chars/[id]" as={`/chars/${char}`}>
              <a>{char}</a>
            </Link>
          </div>
        )) }
      </div>
    </div>
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
