import Link from 'next/link'
import kroman from 'kroman'
import jaconv from 'jaconv'


const filteredHistory = (histories, language, group) => {
  if(!histories) { return []; }
  return histories.filter(h => h.language == language && h.group == group);
}

export default function History({char}){
  return (
    <div className="text-center border-gray-200 border-2 rounded">
      <div className="py-2 bg-gray-200">
        <span className="text-lg font-bold">{char.id}</span>
      </div>

      <div className="text-sm relative">
        <div className="absolute w-1/4 h-full text-gray-700 border-gray-600 border-r border-dashed">
          <span className="absolute" style={{bottom: "-.5em", right: "-.4em"}}>▼</span>
        </div>
        <div className="absolute w-3/4 h-full text-gray-700 border-gray-600 border-r border-dashed">
          <span className="absolute" style={{bottom: "-.5em", right: "-.4em"}}>▼</span>
        </div>
        { !char.histories &&
          <div className="absolute w-full h-full flex items-center bg-black opacity-25 z-50 text-white">
            <span className="flex-1">(まだデータがありません)</span>
          </div>
        }

        <div className="flex flex-row border-b border-dashed relative" style={{minHeight: 50}}>
          <div className="absolute w-full text-gray-600 text-xs">受入</div>
          <div className="py-4 flex-1 border-gray-200 border-r relative">
            { filteredHistory(char.histories, 'ko', 'acceptances').map(history => (
              <div className="py-2">
                <Link href="">
                  <a className="block bg-white border-gray-600 border rounded px-2 py-1 mx-1 sm:mx-6 hover:border-gray-500 hover:bg-gray-100">
                    {history.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div className="py-4 flex-1 border-gray-200 border-l">
            { filteredHistory(char.histories, 'ja', 'acceptances').map(history => (
              <div className="py-2">
                <Link href="">
                  <a className="block bg-white border-gray-600 border rounded px-2 py-1 mx-1 sm:mx-6 hover:border-gray-500 hover:bg-gray-100">
                    {history.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row border-b border-dashed relative" style={{minHeight: 50}}>
          <div className="absolute w-full text-gray-600 text-xs">変化</div>
          <div className="py-4 flex-1 border-gray-200 border-r relative">
            { filteredHistory(char.histories, 'ko', 'changes').map(history => (
              <div className="py-2">
                <Link href="">
                  <a className="block bg-white border-gray-600 border rounded px-2 py-1 mx-1 sm:mx-6 hover:border-gray-500 hover:bg-gray-100">
                    {history.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div className="py-4 flex-1 border-gray-200 border-l">
            { filteredHistory(char.histories, 'ja', 'changes').map(history => (
              <div className="py-2">
                <Link href="">
                  <a className="block bg-white border-gray-600 border rounded px-2 py-1 mx-1 sm:mx-6 hover:border-gray-500 hover:bg-gray-100">
                    {history.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row relative" style={{minHeight: 50}}>
          <div className="absolute w-full text-gray-600 text-xs">規則</div>
          <div className="py-4 flex-1 border-gray-200 border-r relative">
            { filteredHistory(char.histories, 'ko', 'rules').map(history => (
              <div className="py-2">
                <Link href="">
                  <a className="block bg-white border-gray-600 border rounded px-2 py-1 mx-1 sm:mx-6 hover:border-gray-500 hover:bg-gray-100">
                    {history.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div className="py-4 flex-1 border-gray-200 border-l">
            { filteredHistory(char.histories, 'ja', 'rules').map(history => (
              <div className="py-2">
                <Link href="">
                  <a className="block bg-white border-gray-600 border rounded px-2 py-1 mx-1 sm:mx-6 hover:border-gray-500 hover:bg-gray-100">
                    {history.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row bg-gray-200">
        <div className="py-2 flex-1 border-white border-r relative">
          <span className="absolute top-0 left-0 pl-1">🇰🇷</span>
          <div className="text-xl inline">
            <ruby className="table-cell">
              {char.hangul}
              <rt className="text-sm block">({kroman.parse(char.hangul)})</rt>
            </ruby>
          </div>
        </div>
        <div className="py-2 flex-1 border-white border-l relative">
          <span className="absolute top-0 left-0 pl-1">🇯🇵</span>
          { char.kana.map((kana) => (
            <div key={kana.value} className="text-xl inline">
              <ruby className="table-cell">
                {kana.value}
                <rt className="text-sm block">({jaconv.toHebon(kana.value).toLowerCase()})</rt>
              </ruby>
            </div>
          )) }
        </div>
      </div>
    </div>
  );
};
