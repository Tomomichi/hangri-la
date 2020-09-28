import Link from 'next/link'

export default function Sidebar(){
  return (
    <>
      <Link href="/about">
        <a className="flex flex-row sm:flex-row items-center bg-gray-100 rounded px-1 py-4 border-2 hover:opacity-75">
          <div className="w-2/3 sm:w-3/5 pl-2">
            <p className="text-sm font-bold">
              このサイトについて
            </p>
          </div>
          <div className="w-1/3 sm:w-2/5 px-0 sm:px-0 pb-0 sm:pb-0">
            <img src="/images/b0141.png" />
          </div>
        </a>
      </Link>
    </>
  );
};
