import { useRouter } from 'next/router'
import Head from 'next/head';
import kroman from 'kroman'
import jaconv from 'jaconv'
import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'
import Breadcrumb from '../../components/breadcrumb.js'
import History from '../../components/history.js'


export default function Index({word, chars, homonyms}) {
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
        {text: '漢字語', href: '/words', as: '/words'},
        {text: word.id},
      ]} />

      <Head>
        <title>{word.id}({word.hangul}) | Hangri-La</title>
        <meta name="description" content={`漢字語「${word.id}（${word.kana}）」は、韓国語（ハングル）で「${word.hangul}」となります。`} />
      </Head>

      <div className="flex flex-col bg-gray-200 text-center mb-12 rounded">
        <div className="py-4 border-white border-b-4 font-bold">
          <p className="text-2xl">{word.id}</p>
        </div>
        <div className="flex flex-row">
          <div className="flex-1 py-4 border-white border-r-2 relative">
            <span className="absolute top-0 left-0 pl-1">🇰🇷</span>
            <p className="text-2xl inline">
              <ruby className="table-cell">
                { word.hangul }
                <rt className="text-sm block">({kroman.parse(word.hangul)})</rt>
              </ruby>
            </p>
          </div>
          <div className="flex-1 py-4 border-white border-l-2 relative">
            <span className="absolute top-0 left-0 pl-1">🇯🇵</span>
            <p className="text-2xl inline">
              <ruby className="table-cell">
                { word.kana || "-" }
                { word.kana &&
                  <rt className="text-sm block">({jaconv.toHebon(word.kana).toLowerCase()})</rt>
                }
              </ruby>
            </p>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-lg font-bold mb-4">▼ 発音の歴史的変化</h3>
        { chars.map(char => (
          <div key={char.id} className="mb-8">
            <History char={char} />
          </div>
        )) }
      </div>

      <div className="my-12">
        <h3 className="text-lg font-middle mb-4">▼ 「{word.id}」に含まれる漢字</h3>
        <ul className="border-t-2">
          { chars.map(char => (
            <ListItem key={char.id} href="/chars/[id]" as={`/chars/${char.id}`} content={char.id} />
          )) }
        </ul>
      </div>

      { homonyms.length > 0 &&
        <div className="my-12">
          <h3 className="text-lg font-bold mb-4">▼ 「{word.id}」とハングルが同じ熟語</h3>
          <ul className="border-t-2">
            { homonyms.map(homonym => (
              <ListItem key={homonym.id} href="/words/[id]" as={`/words/${homonym.id}`} content={homonym.id} />
            )) }
          </ul>
        </div>
      }
    </>
  )
}


export async function getStaticPaths() {
  // const snapshot = await firebase.firestore().collection('words').get();
  // const paths = await snapshot.docs.map(doc => {
  //   return {params: {id: doc.id}}
  // });
  const paths = [];

  return {
    paths,
    fallback: true,
  }
}


export async function getStaticProps({params}) {
  // word
  const wordDoc = await firebase.firestore().collection('words').doc(params.id).get();
  const word = await Object.assign(wordDoc.data(), {
    id: wordDoc.id,
    createdAt: wordDoc.data().createdAt.toDate().toISOString(),
    updatedAt: wordDoc.data().updatedAt.toDate().toISOString(),
  });

  // chars
  const charsSnapshot = await firebase.firestore().collection('chars').where(firebase.firestore.FieldPath.documentId(), "in", word.chars).get();
  let chars = [];
  charsSnapshot.forEach(doc => {
    const index = word.chars.findIndex(item => item == doc.id); // word.charsの並び順を保持
    chars[index] = Object.assign(doc.data(), {
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString(),
    });
  });

  // homonyms（同音異義語）
  const homosSnapshot = await firebase.firestore().collection('words')
                                .where("hangul", "==", word.hangul)
                                .where(firebase.firestore.FieldPath.documentId(), "!=", word.id)  // 自分自身を除外
                                .get();
  const homonyms = homosSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString(),
    })
  );

  return {
    props: {
      word: word,
      chars: chars,
      homonyms: homonyms,
    }
  }
}
