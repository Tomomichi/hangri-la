import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'

export default function Index({char, words}) {
  return (
    <>
      <div className="flex flex-col bg-gray-200 text-center mb-12 rounded">
        <div className="py-4 border-white border-b-4 font-bold">
          <h1 className="text-2xl">{char.id}</h1>
        </div>
        <div className="flex flex-row">
          <div className="py-4 flex-1 border-white border-r-2">
            <div className="text-2xl">{char.hangul}</div>
          </div>
          <div className="py-4 flex-1 border-white border-l-2">
            { char.kana.map((kana) => (
              <div key={kana.value} className="text-2xl">{kana.value}</div>
            )) }
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
    </>
  )
}


export async function getStaticPaths() {
  const snapshot = await firebase.firestore().collection('chars').get();
  const paths = snapshot.docs.map(doc => {
    return {params: {id: doc.id}}
  });

  return {
    paths,
    fallback: false,
  }
}


export async function getStaticProps({params}) {
  // char
  const charDoc = await firebase.firestore().collection('chars').doc(params.id).get();
  const char = Object.assign(charDoc.data(), {id: charDoc.id});

  // words
  const wordsSnapshot = await firebase.firestore().collection('words').where('chars', 'array-contains', char.id).get();
  const words = wordsSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );


  return {
    props: {
      char: char,
      words: words,
    }
  }
}
