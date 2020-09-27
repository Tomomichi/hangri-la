import Head from 'next/head';
import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'
import Breadcrumb from '../../components/breadcrumb.js'

export default function Index({words}) {
  return (
    <>
      <Breadcrumb items={[
        {text: '漢字語'},
      ]} />

      <Head>
        <title>韓国語の漢字語一覧 | Hangri-La</title>
        <meta name="description" content="韓国語の漢字語(熟語)一覧です。" />
      </Head>

      <div>
        <h3 className="text-lg font-bold mb-4">▼ 漢字語一覧</h3>
        <ul className="border-t-2">
          { words.map(word => (
            <ListItem key={word.id} href="/words/[id]" as={`/words/${word.id}`} content={`
              ${word.id}
              <small>(${word.hangul})</small>
            `} />
          )) }
        </ul>
      </div>
    </>
  )
}


export async function getStaticProps({params}) {
  const snapshot = await firebase.firestore().collection('words').limit(30).get();
  const words = snapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  return {
    props: {
      words: words,
    }
  }
}
