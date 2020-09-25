import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'

export default function Index({chars}) {
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-4">▼ 漢字一覧</h3>
        <ul className="border-t-2">
          { chars.map(char => (
            <ListItem key={char.id} href="/chars/[id]" as={`/chars/${char.id}`} content={char.id} />
          )) }
        </ul>
      </div>
    </>
  )
}


export async function getStaticProps({params}) {
  const snapshot = await firebase.firestore().collection('chars').limit(30).get();
  const chars = snapshot.docs.map(doc =>
    Object.assign(doc.data(), {id: doc.id})
  );

  return {
    props: {
      chars: chars,
    }
  }
}
