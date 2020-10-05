import { readFileSync } from 'fs'
import { join } from 'path'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { firebase } from '../../../lib/firebase.js'
import { renderers } from '../../../lib/markdown.js'
import Breadcrumb from '../../../components/breadcrumb.js'


export default function Index({change, content}) {
  const router = useRouter();
  if (router.isFallback) {
    return(
      <div className="mt-16 text-center">
        <div>Loading...</div>
      </div>
    )
  }

  const country = {
    ja: { name: '日本', flag: '🇯🇵', },
    ko: { name: '韓国', flag: '🇰🇷', },
  }

  return (
    <>
      <Breadcrumb items={[
        {text: '発音変化', href: '/histories', as: '/histories'},
        {text: country[change.language].name, href: `/histories/${change.language}`, as: `/histories/${change.language}`},
        {text: change.title},
      ]} />

      <div className="mb-8 pb-2 border-b-2">
        <h1 className="text-2xl font-bold mb-2">
          {change.title}
        </h1>
        <p className="text-sm text-gray-500 mb-1">
          {change.lead}
        </p>
      </div>

      <div className="mb-12">
        <table className="text-left text-sm border mb-4 w-full">
          <tbody>
            <tr className="rounded border-b">
              <th className="p-2 bg-gray-100 border-r w-1/3 sm:w-1/4">国</th>
              <td className="p-2">
                <span className="mr-2">{country[change.language].flag}</span>
                {country[change.language].name}
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

      <ReactMarkdown source={ content } renderers={renderers} escapeHtml={false} />
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
  const change = await Object.assign(doc.data(), {
    id: doc.id,
    createdAt: doc.data().createdAt.toDate().toISOString(),
    updatedAt: doc.data().updatedAt.toDate().toISOString(),
  });

  const filePath = join(process.cwd(), `_contents/phonetic_changes/${params.id}.md`);
  const content = readFileSync(filePath, 'utf8');

  return {
    props: {
      change: change,
      content: content,
    }
  }
}
