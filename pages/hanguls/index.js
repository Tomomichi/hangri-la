import { firebase } from '../../lib/firebase.js'
import ListItem from '../../components/listItem.js'

export default function Index({hanguls}) {
  return (
    <>
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