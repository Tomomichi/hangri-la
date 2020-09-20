import Link from 'next/link'
import { firebase } from '../../lib/firebase.js'

export default function Index({item, words}) {
  return (
    <>
      <div className="flex flex-col text-center mb-12">
        <div className="py-4 border-solid border-4 border-b-2">
          <h1 className="text-2xl">{item.char}</h1>
        </div>
        <div className="flex flex-row">
          <div className="py-4 flex-1 border-solid border-4 border-t-2 border-r-2">
            <div className="text-2xl">{item.hangul}</div>
          </div>
          <div className="py-4 flex-1 border-solid border-4 border-t-2 border-l-2">
            { item.kana.map((kana) => (
              <div key={kana.value} className="text-2xl">{kana.value}</div>
            )) }
          </div>
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-lg font-bold mb-4">▼ 「{item.char}」が含まれる熟語</h3>
        <ul className="border-b-2">
          { words.map(word => (
            <Link href="/words/[id]" as={`/words/${word.id}`}>
              <a>
                <li key={word.id} className="p-3 border-t-2">
                  {word.id}
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
    { params: { id: '漢' } },
    { params: { id: '字' } },
  ];

  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({params}) {
  let docRef = firebase.firestore().collection('chars').doc(params.id);
  const doc = await docRef.get();
  const item = doc.data();

  const snapshot = await firebase.firestore().collection('words').where('chars', 'array-contains', item.char).get();
  let words = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    words.push(data);
  });


  return {
    props: {
      item: item,
      words: words,
    }
  }
}
