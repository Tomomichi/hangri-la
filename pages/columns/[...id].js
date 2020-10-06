import { readFileSync } from 'fs'
import { join } from 'path'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { firebase } from '../../lib/firebase.js'
import { renderers } from '../../lib/markdown.js'
import Breadcrumb from '../../components/breadcrumb.js'


export default function Index({column, content}) {
  const router = useRouter();
  if (router.isFallback) {
    return(
      <div className="mt-16 text-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <>
      <Breadcrumb items={[
        {text: 'コラム', href: '/columns', as: '/columns'},
        {text: column.category, href: `/columns/introduction`, as: `/columns/introduction`},
        {text: column.title},
      ]} />

      <h1 className="font-bold mb-4 text-2xl p-2 border-b-4 border-t-4 border-gray-700">{ column.title }</h1>
      <div className="flex -mb-8">
        <div>{column.tags.map(tag => (
          <span className="text-sm rounded bg-gray-200 px-2 py-1">{tag}</span>
        ))}</div>
        <div className="text-right flex-1">{column.publishedAt}</div>
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
  const paths = [
    {params: { id: ['introduction']}},
  ];

  return {
    paths,
    fallback: true,
  }
}


export async function getStaticProps({params}) {
  const id = params.id.pop(-1);
  const filePath = join(process.cwd(), `_contents/columns/${id}.md`);
  const content = readFileSync(filePath, 'utf8');

  const column = {
    title: 'どうして漢字で韓国語なの？',
    category: 'はじめに',
    tags: ['はじめに'],
    publishedAt: '2020-10-05',
  }

  return {
    props: {
      column: column,
      content: content,
    }
  }
}
