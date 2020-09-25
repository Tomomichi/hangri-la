import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'

export default function Index({word, chars, homonyms}) {
  return (
    <>
      <div className="flex flex-col bg-gray-200 text-center mb-12 rounded">
        <div className="py-4 border-white border-b-4 font-bold">
          <p className="text-2xl">{word.id}</p>
        </div>
        <div className="flex flex-row">
          <div className="flex-1 py-4 border-white border-r-2">
            <p className="text-2xl">
              { chars.map(char => (
                <span key={char.id}>{char.hangul}</span>
              )) }
            </p>
          </div>
          <div className="flex-1 py-4 border-white border-l-2">
            <p className="text-2xl">
              { chars.map(char => (
                <span key={char.id}>{char.kana[0]["value"]}</span>
              )) }
            </p>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-lg font-bold mb-4">▼ 「{word.id}」に含まれる漢字</h3>
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
  const snapshot = await firebase.firestore().collection('words').get();
  const paths = await snapshot.docs.map(doc => {
    return {params: {id: doc.id}}
  });

  return {
    paths,
    fallback: false,
  }
}


export async function getStaticProps({params}) {
  // word
  const wordDoc = await firebase.firestore().collection('words').doc(params.id).get();
  const word = await Object.assign(wordDoc.data(), {id: wordDoc.id});

  // chars
  const charsSnapshot = await firebase.firestore().collection('chars').where(firebase.firestore.FieldPath.documentId(), "in", word.chars).get();
  let chars = [];
  charsSnapshot.forEach(doc => {
    const index = word.chars.findIndex(item => item == doc.id); // word.charsの並び順を保持
    chars[index] = Object.assign(doc.data(), {id: doc.id});
  });

  // homonyms（同音異義語）
  const homosSnapshot = await firebase.firestore().collection('words')
                                .where("hangul", "==", word.hangul)
                                .where(firebase.firestore.FieldPath.documentId(), "!=", word.id)  // 自分自身を除外
                                .get();
  const homonyms = homosSnapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  return {
    props: {
      word: word,
      chars: chars,
      homonyms: homonyms,
    }
  }
}
