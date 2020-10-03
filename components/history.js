import Link from 'next/link'
import kroman from 'kroman'
import jaconv from 'jaconv'


const filteredHistory = (histories, language, group) => {
  if(!histories) { return []; }
  return histories.filter(h => h.language == language && h.group == group);
}

const groupName = {
  'acceptances': '受入',
  'changes': '変化',
  'rules': '規則',
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
        { !char.phonological_changes &&
          <div className="absolute w-full h-full flex items-center bg-black opacity-25 z-50 text-white">
            <span className="flex-1">(まだデータがありません)</span>
          </div>
        }

        { Object.keys(groupName).map(group => (
          <div className={`flex flex-row relative ${group=='rules' ? '' : 'border-b border-dashed'}`} style={{minHeight: 50}}>
            <div className="absolute w-full text-gray-600 text-xs">{groupName[group]}</div>
            <div className="py-4 flex-1 border-gray-200 border-r relative">
              { filteredHistory(char.phonological_changes, 'ko', group).map(history => (
                <div key={history.title} className="py-2">
                  <Link href={`/phonological_changes/${history.language}/[id]`} as={`/phonological_changes/${history.language}/${history.changeId}`}>
                    <a className="block bg-white border-gray-600 border rounded px-2 py-1 mx-1 sm:mx-6 hover:border-gray-500 hover:bg-gray-100">
                      {history.title}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
            <div className="py-4 flex-1 border-gray-200 border-l">
              { filteredHistory(char.phonological_changes, 'ja', group).map(history => (
                <div key={history.title} className="py-2">
                  <Link href={`/phonological_changes/${history.language}/[id]`} as={`/phonological_changes/${history.language}/${history.changeId}`}>
                    <a className="block bg-white border-gray-600 border rounded px-2 py-1 mx-1 sm:mx-6 hover:border-gray-500 hover:bg-gray-100">
                      {history.title}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )) }
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
          <div className="text-xl inline">
            <ruby className="table-cell">
              {char.kana}
              <rt className="text-sm block">({jaconv.toHebon(char.kana).toLowerCase()})</rt>
            </ruby>
          </div>
        </div>
      </div>
    </div>
  );
};
