import Head from 'next/head';
import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'
import Breadcrumb from '../../components/breadcrumb.js'

export default function Index({hanguls}) {
  return (
    <>
      <Breadcrumb items={[
        {text: 'ハングル'},
      ]} />

      <Head>
        <title>韓国語のハングルに対応する漢字一覧 | Hangri-La</title>
        <meta name="description" content="韓国語のハングルに対応する漢字の一覧です。" />
      </Head>

      <div>
        <h3 className="text-lg font-bold mb-4">▼ ハングル一覧</h3>
        <ul className="border-t-2">
          { hanguls.map(hangul => (
            <ListItem key={hangul} href="/hanguls/[id]" as={`/hanguls/${hangul}`} content={hangul} />
          )) }
        </ul>
      </div>
    </>
  )
}


export async function getStaticProps({params}) {
  const snapshot = await firebase.firestore().collection('chars').limit(30).get();
  const hanguls = await [...new Set(snapshot.docs.map(doc => doc.data().hangul))];  //重複削除

  return {
    props: {
      hanguls: hanguls,
    }
  }
}
