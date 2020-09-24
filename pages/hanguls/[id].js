import { firebase } from '../../lib/firebase.js'
import Link from 'next/link'

export default function Index({hangul, chars}) {
  return (
    <>
      <div className="flex flex-col bg-gray-200 text-center mb-12 rounded">
        <div className="py-4 font-bold">
          <h1 className="text-2xl">{hangul}</h1>
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-lg font-bold mb-4">▼ 「{hangul}」と読む漢字</h3>
        <ul className="border-t-2">
          { chars.map(char => (
            <Link key={char.id} href="/chars/[id]" as={`/chars/${char.id}`}>
              <a>
                <li className="p-3 border-b-2">
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
  const snapshot = await firebase.firestore().collection('chars').get();
  const hanguls = [...new Set(snapshot.docs.map(doc => doc.data().hangul))];  //重複削除
  const paths = hanguls.map(h => {
    return { params: {id: h} }
  });

  return {
    paths,
    fallback: true,
  }
}


export async function getStaticProps({params}) {
  const snapshot = await firebase.firestore().collection('chars').where('hangul', '==', params.id).get();
  const chars = snapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  return {
    props: {
      hangul: params.id,
      chars: chars,
    }
  }
}
