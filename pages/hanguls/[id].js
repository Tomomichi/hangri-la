import { firebase } from '../../lib/firebase.js'

export default function Index({hangul, chars}) {
  return (
    <div className="container mx-auto">
      <h1 className="text-6xl">{hangul}</h1>

      <div>
        { chars.map(char => (
          <div key={char.id} className="text-3xl">{char.id}</div>
        )) }
      </div>
    </div>
  )
}


export async function getStaticPaths() {
  const snapshot = await firebase.firestore().collection('chars').get();
  const hanguls = [...new Set(snapshot.docs.map(doc => doc.data().hangul))];  //重複削除
  const paths = hanguls.map(h => {
    return { params: {id: h} }
  });

  return {
    paths,
    fallback: true,
  }
}


export async function getStaticProps({params}) {
  const snapshot = await firebase.firestore().collection('chars').where('hangul', '==', params.id).get();
  let chars = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    chars.push(data);
  });


  return {
    props: {
      hangul: params.id,
      chars: chars,
    }
  }
}
