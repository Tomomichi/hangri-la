import Head from 'next/head';
import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'
import Breadcrumb from '../../components/breadcrumb.js'

export default function Index({chars}) {
  return (
    <>
      <Head>
        <title>韓国語の漢字一覧 | Hangri-La</title>
        <meta name="description" content="韓国語の漢字と対応するハングルの一覧です。" />
      </Head>

      <Breadcrumb items={[
        {text: '漢字'},
      ]} />

      <div>
        <h3 className="text-lg font-bold mb-4">▼ 漢字一覧</h3>
        <ul className="border-t border-b divide-y">
          { chars.map(char => (
            <ListItem key={char.id} href="/chars/[id]" as={`/chars/${char.id}`} content={`
              ${char.id}
              <small>(${char.hangul})</small>
            `} />
          )) }
        </ul>
      </div>
    </>
  )
}


export async function getStaticProps({params}) {
  const snapshot = await firebase.firestore().collection('chars').limit(30).get();
  const chars = snapshot.docs.map(doc =>
    Object.assign(doc.data(), {
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString(),
    })
  );

  return {
    props: {
      chars: chars,
    }
  }
}
