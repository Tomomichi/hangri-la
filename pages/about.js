import Head from 'next/head';
import Link from 'next/link'
import Breadcrumb from '../components/breadcrumb.js'

export default function About() {
  return (
    <>
      <Head>
        <title>このサイトについて | Hangri-La</title>
        <meta name="description" content="Hangri-Laのサイト紹介です。" />
      </Head>

      <Breadcrumb items={[
        {text: 'このサイトについて'},
      ]} />

      <div className="flex flex-row sm:flex-row items-center bg-gray-100 rounded mb-12 px-2 sm:px-10 py-4">
        <div className="w-2/3 sm:w-3/5">
          <h1 className="text-lg font-bold pb-2">
            このサイトについて
          </h1>
        </div>
        <div className="w-1/3 sm:w-2/5 px-0 sm:px-0 pb-0 sm:pb-0">
          <img src="/images/b0141.png" />
        </div>
      </div>

      <div className="text-sm">
        <div className="mb-12">
          <h1 className="text-lg font-bold border-b pb-2 mb-4">Hangri-La（ハングリラ）とは</h1>
          <p>
            Hangri-La（ハングリラ）は、漢字を用いて韓国語を効率的に学ぶことができるサイトです。
            <br />
            韓国語学習者にとってのシャングリラ（桃源郷）みたいな感じを目指して、ハングリラという名前をつけています。
          </p>
        </div>

        <div className="mb-12">
          <h1 className="text-lg font-bold border-b pb-2 mb-4">韓国語も単語の70%程度は漢字語</h1>
          <p className="mb-2">
            現在韓国ではほとんどハングルで文字を表記しますが、韓国も日本と同様に漢字文化圏であり、公文書など元々はすべて漢字で書かれていました。
          </p>
          <p className="mb-2">
            ハングルは日本のひらがな・カタカナのような表音文字であり、あくまで音を表しているにすぎません。
            <br />
            そのため日本語で「漢字」を「かんじ」とひらがなで書いているように、「한쟈」とハングルで表記してもこれが「漢字」であることには変わりありません。
          </p>
          <p className="mb-2">
            日本語では60〜70%程度の単語が漢字語だと言われていますが、韓国語では地理的・文化的に中国により近いこともあり、日本より多い70%以上の単語が漢字語だと言われています。
          </p>
          <p className="mb-2">
            ※新聞などのフォーマルな表現なのか、友人同士のカジュアルな表現なのかでも漢字の比率は大きく変わります。
          </p>
        </div>

        <div className="mb-12">
          <h1 className="text-lg font-bold border-b pb-2 mb-4">漢字語は発音も似ていることが多い</h1>
          <p className="mb-2">
            元々中国から日韓両国に入ってきている漢字語は、その由来が同じため発音も似ているものが多いです。
            <br />
            たとえば「洗濯機」などは日本語で「せんたくき」、韓国語で「세탁기（セタッキ）」と、ほぼそのまま通用しそうですね。
          </p>
          <p className="mb-2">
            当然中国語と日本語でも発音が似ている単語はあるのですが、中国では歴史上何度か大きな発音変化を経験したため、
            いまでは中国語と日韓両国語は発音が異なることも多く、逆に往時の発音を多く残す日本語と韓国語の方が発音が似ているというケースも多いです。
          </p>
          <p className="mb-2">
            Hangri-Laでもほとんど発音が同じ単語の特集など企画していますので、一気に使える語彙を増やすのにご活用ください💪
          </p>
        </div>

        <div className="mb-12">
          <h1 className="text-lg font-bold border-b pb-2 mb-4">発音が違うときも（ある程度）規則性がある</h1>
          <p className="mb-2">
            とはいえほとんど発音が同じ単語は少数派で、ほとんどの単語は日韓である程度発音が違います。
          </p>
          <p className="mb-2">
            しかししばらく勉強すると気が付きますが、この発音差異には一定のパターンがあることが多いです。
            たとえば、、
          </p>
          <p className="mb-2">
            Hangri-Laではこうした発音変化のパターンも整理・解説し、各漢字を検索した際にどのパターンが適用されているのかわかるように整理しています。
            <br />
            理屈を知って効率的に語彙力を増やしましょう！
          </p>
          <p className="mb-2">
            もちろん言語は歴史的経緯を経て人が育んできたものなので、完全に理論的に分類できるわけではありません。
            それでもかなりの単語をカバーできるため、単なる丸暗記ではなくロジックによる裏付けのある効率的な学習をお手伝いできるかと思います。
          </p>
        </div>
      </div>
    </>
  )
}
