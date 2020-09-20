import { firebase } from '../../lib/firebase.js'

export default function Index({item, words}) {
  return (
    <div className="container mx-auto">
      <h1 className="text-6xl">{item.char}</h1>

      <div>
        { item.kana.map((kana) => (
          <div key={kana.value} className="text-2xl">{kana.value}</div>
        )) }
        <div className="text-2xl">{item.hangul}</div>
      </div>

      <div>
        { words.map(word => (
          <div key={word.id} className="text-2xl">{word.id}</div>
        )) }
      </div>
    </div>
  )
}


export async function getStaticPaths() {
  const paths = [
    { params: { id: '漢' } },
    { params: { id: '字' } },
  ];

  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({params}) {
  let docRef = firebase.firestore().collection('chars').doc(params.id);
  const doc = await docRef.get();
  const item = doc.data();

  const snapshot = await firebase.firestore().collection('words').where('chars', 'array-contains', item.char).get();
  let words = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    words.push(data);
  });


  return {
    props: {
      item: item,
      words: words,
    }
  }
}
