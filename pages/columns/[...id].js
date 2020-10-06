import { readFileSync } from 'fs'
import { join } from 'path'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { firebase } from '../../lib/firebase.js'
import { renderers } from '../../lib/markdown.js'
import Breadcrumb from '../../components/breadcrumb.js'


export default function Index({content}) {
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
        {text: 'はじめに', href: `/columns/introduction`, as: `/columns/introduction`},
        {text: 'なぜ漢字で韓国語なのか'},
      ]} />

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

  return {
    props: {
      content: content,
    }
  }
}
