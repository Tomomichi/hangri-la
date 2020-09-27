import { useRouter } from 'next/router'
import Head from 'next/head';
import Link from 'next/link'
import kroman from 'kroman'
import jaconv from 'jaconv'
import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'
import Breadcrumb from '../../components/breadcrumb.js'

export default function Index({char, words, homonyms}) {
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
        {text: '漢字', href: '/chars', as: '/chars'},
        {text: char.id},
      ]} />

      <Head>
        <title>{char.id}({char.hangul}) | Hangri-La</title>
        <meta name="description" content={`漢字「${char.id}（${char.kana[0]["value"]}）」は、韓国語（ハングル）で「${char.hangul}」となります。`} />
      </Head>

      <div className="flex flex-col bg-gray-200 text-center mb-12 rounded">
        <div className="py-4 border-white border-b-4 font-bold">
          <h1 className="text-2xl">{char.id}</h1>
        </div>
        <div className="flex flex-row">
          <div className="py-4 flex-1 border-white border-r-2 relative">
            <span className="absolute top-0 left-0 pl-1">🇰🇷</span>
            <div className="text-2xl inline">
              <ruby className="table-cell">
                {char.hangul}
                <rt className="text-sm block">({kroman.parse(char.hangul)})</rt>
              </ruby>
            </div>
          </div>
          <div className="py-4 flex-1 border-white border-l-2 relative">
            <span className="absolute top-0 left-0 pl-1">🇯🇵</span>
            { char.kana.map((kana) => (
              <div key={kana.value} className="text-2xl inline">
                <ruby className="table-cell">
                  {kana.value}
                  <rt className="text-sm block">({jaconv.toHebon(kana.value).toLowerCase()})</rt>
                </ruby>
              </div>
            )) }
          </div>
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-lg font-bold mb-4">▼ 発音差異の歴史的経緯</h3>
        <div className="text-center border-gray-200 border-2">
          <div className="flex flex-row">
            <div className="py-2 flex-1 bg-gray-200">
              <span className="text-lg font-bold">人</span>
            </div>
          </div>

          { false &&
            <div className="flex flex-row border-b">
              <div className="flex-1 border-gray-200 border-r relative">
                <div className="">
                  <span className="">🇰🇷</span>
                </div>
              </div>
              <div className="flex-1 border-gray-200 border-l relative">
                <div className="">
                  <span className="">🇯🇵</span>
                </div>
              </div>
            </div>
          }

          <div className="flex flex-row border-b border-dashed" style={{minHeight: 50}}>
            <div className="flex flex-row flex-1 border-gray-200 border-r relative">
              <div className="flex-1 border-gray-400 border-r-2 relative">
                <span className="absolute left-0 text-gray-600 text-xs">受入</span>
              </div>
              <div className="flex-1"></div>
            </div>
            <div className="flex flex-row flex-1 border-gray-200 border-l relative">
              <div className="flex-1 border-gray-400 border-r-2"></div>
              <div className="flex-1"></div>
            </div>
          </div>

          <div className="flex flex-row border-b border-dashed" style={{minHeight: 50}}>
            <div className="flex flex-row flex-1 border-gray-200 border-r relative">
              <div className="flex-1 border-gray-400 border-r-2 relative">
                <span className="absolute left-0 text-gray-600 text-xs">変化</span>
              </div>
              <div className="flex-1"></div>
            </div>
            <div className="flex flex-row flex-1 border-gray-200 border-l relative">
              <div className="flex-1 border-gray-400 border-r-2"></div>
              <div className="flex-1"></div>
            </div>
          </div>

          <div className="flex flex-row" style={{minHeight: 50}}>
            <div className="flex flex-row flex-1 border-gray-200 border-r relative">
              <div className="flex-1 border-gray-400 border-r-2 relative">
                <span className="absolute left-0 text-gray-600 text-xs">規則</span>
                <span className="text-gray-400 absolute bottom-0 right-0" style={{right: "-.4em", bottom: "-.5em"}}>▼</span>
              </div>
              <div className="flex-1"></div>
            </div>
            <div className="flex flex-row flex-1 border-gray-200 border-l relative">
              <div className="flex-1 border-gray-400 border-r-2 relative">
                <span className="text-gray-400 absolute bottom-0 right-0" style={{right: "-.5em", bottom: "-.5em"}}>▼</span>
              </div>
              <div className="flex-1"></div>
            </div>
          </div>

          <div className="flex flex-row bg-gray-200">
            <div className="py-2 flex-1 border-white border-r relative">
              <span className="absolute top-0 left-0 pl-1">🇰🇷</span>
              <div className="text-xl inline">
                <ruby className="table-cell">
                  {char.hangul}
                  <rt className="text-sm block">({kroman.parse(char.hangul)})</rt>
                </ruby>
              </div>
            </div>
            <div className="py-2 flex-1 border-white border-l relative">
              <span className="absolute top-0 left-0 pl-1">🇯🇵</span>
              { char.kana.map((kana) => (
                <div key={kana.value} className="text-xl inline">
                  <ruby className="table-cell">
                    {kana.value}
                    <rt className="text-sm block">({jaconv.toHebon(kana.value).toLowerCase()})</rt>
                  </ruby>
                </div>
              )) }
            </div>
          </div>

        </div>
      </div>

      <div className="my-12">
        <h3 className="text-lg font-bold mb-4">▼ 「{char.id}」が含まれる熟語</h3>
        <ul className="border-t-2">
          { words.map(word => (
            <ListItem key={word.id} href="/words/[id]" as={`/words/${word.id}`} content={word.id} />
          )) }
          { words.length == 0 &&
            <ListItem content="（まだ熟語が登録されていません…）" />
          }
        </ul>
      </div>

      { char.conjugations &&
        <div className="my-12">
          <h3 className="text-lg font-bold mb-4">▼ 「{char.id}」の活用</h3>
          <ul className="border-t-2">
            { char.conjugations.map(conj => (
              <ListItem key={conj.value} content={`
                <span>${char.hangul}(${char.id})</span>
                <span>${conj.value} : </span>
                <span>${conj.meaning}</span>
              `} />
            )) }
          </ul>
        </div>
      }

      { homonyms.length > 0 &&
        <div className="my-12">
          <h3 className="text-lg font-bold mb-4">▼ 「{char.id}」と同じハングルの漢字</h3>
          <ul className="border-t-2">
            { homonyms.map(homo => (
              <ListItem key={homo.id} content={`
                ${homo.id}
                <small className="text-sm ml-1">(${homo.hangul})</small>
              `} />
            )) }
          </ul>

          <Link href="/hanguls/[:id]" as={`/hanguls/${char.hangul}`}>
            <a className="mt-4 flex items-center justify-end text-sm text-gray-800">
              <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
              すべての漢字を見る
            </a>
          </Link>
        </div>
      }
    </>
  )
}


export async function getStaticPaths() {
  // const snapshot = await firebase.firestore().collection('chars').get();
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
  // char
  const charDoc = await firebase.firestore().collection('chars').doc(params.id).get();
  const char = await Object.assign(charDoc.data(), {id: charDoc.id});

  // words
  const wordsSnapshot = await firebase.firestore().collection('words').where('chars', 'array-contains', char.id).get();
  const words = await wordsSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  // homonyms（同音異義語）
  const homosSnapshot = await firebase.firestore().collection('chars')
                                .where("hangul", "==", char.hangul)
                                .where(firebase.firestore.FieldPath.documentId(), "!=", char.id)  // 自分自身を除外
                                .get();
  const homonyms = homosSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  return {
    props: {
      char: char,
      words: words,
      homonyms: homonyms,
    }
  }
}
