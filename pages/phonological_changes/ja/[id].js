import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { firebase } from '../../../lib/firebase.js'
import Breadcrumb from '../../../components/breadcrumb.js'
import ListItem from '../../../components/listItem.js'



export default function Index({change}) {
  const router = useRouter();
  if (router.isFallback) {
    return(
      <div className="mt-16 text-center">
        <div>Loading...</div>
      </div>
    )
  }

  const country = () => {
    return {
      name: change.language == 'ja' ? '日本' : '韓国',
      flag: change.language == 'ja' ? '🇯🇵' : '🇰🇷',
    }
  }

  const DynamicComponent = dynamic(() => import(`../../../components/phonological_changes/ja/${change.id}.js`));
  return (
    <>
      <Breadcrumb items={[
        {text: '発音変化', href: '/histories', as: '/histories'},
        {text: country().name, href: `/histories/${change.language}`, as: `/histories/${change.language}`},
        {text: change.title},
      ]} />

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 pb-2 border-b-2">
          {change.title}
        </h1>
        <p className="text-sm text-gray-600 mb-4 bg-gray-100 rounded p-2">
          {change.lead}
        </p>
      </div>

      <div className="mb-12">
        <table className="text-left text-sm border mb-4 w-full">
          <tbody>
            <tr className="rounded border-b">
              <th className="p-2 bg-gray-100 border-r w-1/3 sm:w-1/4">国</th>
              <td className="p-2">
                <span className="mr-2">{country().flag}</span>
                {country().name}
              </td>
            </tr>
            <tr className="rounded border-b">
              <th className="p-2 bg-gray-100 border-r">パターン</th>
              <td className="p-2">ng（ン） → ウ（イ）</td>
            </tr>
            <tr className="rounded border-b">
              <th className="p-2 bg-gray-100 border-r">時期</th>
              <td className="p-2">〜7,8世紀</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DynamicComponent />
    </>
  )
}


export async function getStaticPaths() {
  // const snapshot = await firebase.firestore().collection('phonological_changes').where("language", "==", "ja").get();
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
  const doc = await firebase.firestore().collection('phonological_changes').doc(params.id).get();
  const change = await Object.assign(doc.data(), {id: doc.id});

  return {
    props: {
      change: change,
    }
  }
}
