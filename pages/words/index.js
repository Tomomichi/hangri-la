import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'

export default function Index({words}) {
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-4">▼ 熟語一覧</h3>
        <ul className="border-t-2">
          { words.map(word => (
            <ListItem key={word.id} href="/words/[id]" as={`/words/${word.id}`} content={word.id} />
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
