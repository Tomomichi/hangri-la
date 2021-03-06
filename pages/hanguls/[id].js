import { useRouter } from 'next/router'
import Head from 'next/head';
import kroman from 'kroman'
import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'
import Breadcrumb from '../../components/breadcrumb.js'

export default function Index({hangul, chars}) {
  const router = useRouter();
  if (router.isFallback) {
    return(
      <div className="mt-16 text-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <>
      <Breadcrumb items={[
        {text: 'ハングル', href: '/hanguls', as: '/hanguls'},
        {text: hangul},
      ]} />

      <Head>
        <title>{hangul}に対応する漢字 | Hangri-La</title>
        <meta name="description" content={`韓国語のハングル「${hangul}」に対応する漢字一覧です。`} />
      </Head>

      <div className="flex flex-col bg-gray-200 text-center mb-12 rounded">
        <div className="py-4">
          <h1 className="text-2xl inline">
            <ruby className="table-cell">
              <span className="font-bold">{hangul}</span>
              <rt className="text-sm block">({kroman.parse(hangul)})</rt>
            </ruby>
          </h1>
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-lg font-bold mb-4">▼ 「{hangul}」と読む漢字</h3>
        <ul className="border-t border-b divide-y">
          { chars.map(char => (
            <ListItem key={char.id} href="/chars/[id]" as={`/chars/${char.id}`} content={char.id} />
          )) }
        </ul>
      </div>
    </>
  )
}


export async function getStaticPaths() {
  // const snapshot = await firebase.firestore().collection('chars').get();
  // const hanguls = await [...new Set(snapshot.docs.map(doc => doc.data().hangul))];  //重複削除
  // const paths = hanguls.map(h => {
  //   return { params: {id: h} }
  // });
  const paths = [];

  return {
    paths,
    fallback: true,
  }
}


export async function getStaticProps({params}) {
  const snapshot = await firebase.firestore().collection('chars').where('hangul', '==', params.id).get();
  const chars = snapshot.docs.map(doc =>
    Object.assign(doc.data(), {
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString(),
    })
  );

  return {
    props: {
      hangul: params.id,
      chars: chars,
    }
  }
}
