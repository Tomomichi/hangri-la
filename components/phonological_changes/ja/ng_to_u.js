import ListItem from '../../listItem.js'

export default function Change() {
  return (
    <>
      <div className="mb-12">
        <h3 className="text-lg font-bold mb-4">▼ 発音変化の詳細</h3>
        <div>
          <p className="mb-8">
            よく例に挙げられる単語として、「<span className="text-lg font-bold text-red-600">明</span>」を考えてみます。
            <br />
            この漢字の読み方は、日本に伝わった時期に応じていくつかの種類が存在します。
          </p>

          <table className="text-left text-sm border mb-8 w-full">
            <tbody>
              <tr className="rounded border-b">
                <th className="p-2 bg-gray-100 border-r">呉音</th>
                <td className="p-2 border-r">〜7世紀まで（遣唐使以前）</td>
                <td className="p-2 font-bold">ミョウ</td>
              </tr>
              <tr className="rounded border-b">
                <th className="p-2 bg-gray-100 border-r">漢音</th>
                <td className="p-2 border-r">7,8世紀頃（遣唐使）</td>
                <td className="p-2 font-bold">メイ</td>
              </tr>
              <tr className="rounded border-b">
                <th className="p-2 bg-gray-100 border-r">唐音</th>
                <td className="p-2 border-r">12世紀〜（鎌倉時代）</td>
                <td className="p-2 font-bold">ミン</td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm flex items-center mb-8">
            <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
            参考リンク：
            <a href="https://ja.wikipedia.org/wiki/%E9%9F%B3%E8%AA%AD%E3%81%BF" target="_blank" className="border-b border-dashed border-gray-700 hover:opacity-75">
              音読み - Wikipedia
            </a>
            <svg className="fill-current text-gray-600 h-4 w-4 inline ml-1" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path></svg>
          </p>

          <p className="mb-8">
            もともと「明」の末尾は <b>ng [ŋ]</b>（ン）の音ですが、呉音・漢音が入った当時の日本語には まだ撥音（はつおん）「ン」は存在していませんでした。
          </p>

          <p className="text-sm flex items-center mb-8">
            <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
            参考リンク：
            <a href="https://ja.wikipedia.org/wiki/%E3%82%93" target="_blank" className="border-b border-dashed border-gray-700 hover:opacity-75">
              ん - Wikipedia
            </a>
            <svg className="fill-current text-gray-600 h-4 w-4 inline ml-1" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path></svg>
          </p>

          <p className="mb-8">
            しかしその部分に何か音があることは認識していたため、当時の感覚で近いと思われた「ウ」や「イ」の音を当てて受け入れていたようです。
          </p>

          <p className="mb-8">
            その後、唐音の時代（鎌倉時代以降）には日本語に撥音「ン」ができており、 原音に近い「ミン」で受け入れるようになっています。
          </p>
        </div>
      </div>

      <div className="mb-12 pt-8 border-t border-dotted">
        <ul className="text-sm">
          <li className="mb-2">*1) ほげ</li>
          <li className="mb-2">*2) ほげ</li>
        </ul>
      </div>

      <div className="mb-12">
        <h3 className="text-lg font-bold mb-4">▼ 参考文献</h3>
        <div>
          湯沢 質幸, 松崎 寛
          「音声・音韻探求方 - 日本語音声へのいざない（シリーズ日本語探求法）」
           朝倉書店 2004
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-lg font-bold mb-4">▼ このパターンに該当する漢字の例</h3>
        <div>
          <ul className="border-t-2">
            <ListItem href="/chars/[id]" as={`/chars/命`} content="命" />
          </ul>
        </div>
      </div>
    </>
  )
}
