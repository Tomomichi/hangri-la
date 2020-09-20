import { firebase } from '../lib/firebase.js'
import Link from 'next/link'

export default function Index({items}) {
  return (
    <div className="container mx-auto">
      { items.map((item) => (
        <div key={item.id} className="text-2xl">
          <Link href="/chars/[id]" as={`/chars/${item.id}`}>
            <a>{item.char}</a>
          </Link>
        </div>
      )) }
    </div>
  )
}


export async function getStaticProps(context) {
  let docRef = firebase.firestore().collection('chars');
  const snapshot = await docRef.get();
  let items = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    items.push(data);
  });

  return {
    props: {
      items: items,
    }
  }
}
