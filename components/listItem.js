import Link from 'next/link'

export default function ListItem({href, as, content}){
    if(href && as) {
      return (
        <li>
          <Link href={href} as={as}>
            <a className="flex p-3">
              <span className="flex-1" dangerouslySetInnerHTML={{__html: content}}></span>

              <svg className="fill-current text-gray-400 h-6 w-6" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </a>
          </Link>
        </li>
      );
    }else {
      return (
        <li className="p-3 flex">
          <span className="flex-1" dangerouslySetInnerHTML={{__html: content}}></span>
        </li>
      );
    }
};
