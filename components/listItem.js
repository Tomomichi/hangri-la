import Link from 'next/link'

export default function ListItem({href, as, content}){
    if(href && as) {
      return (
        <Link href={href} as={as}>
          <a>
            <li className="p-3 border-b-2 flex">
              <span className="flex-1" dangerouslySetInnerHTML={{__html: content}}></span>

              <svg className="fill-current text-gray-400 h-6 w-6" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </li>
          </a>
        </Link>
      );
    }else {
      return (
        <li className="p-3 border-b-2 flex">
          <span className="flex-1" dangerouslySetInnerHTML={{__html: content}}></span>
        </li>
      );
    }
};
