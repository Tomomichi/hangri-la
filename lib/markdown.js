import Link from 'next/link'

export const renderers = {
  heading: props => renderHeading(props),
  list: props => <ul className='text-left list-disc ml-6'>{props.children}</ul>,
  listItem: props => <li className='leading-8'>{props.children}</li>,
  paragraph: props => <p className='mb-8'>{ props.children }</p>,
  link: props => renderLink(props),
  thematicBreak: props => <hr className='my-12' />,
};

const renderHeading = (props) => {
  const baseClass = "font-bold mb-4";
  switch (props.level) {
    case 2:
      return <h2 className={`${baseClass} text-lg pb-1 border-b`}>{ props.children }</h2>
    case 3:
      return <h3 className={`${baseClass} text-lg border-l-4 border-gray-600 py-2 px-3 bg-gray-100`}>{ props.children }</h3>
    case 4:
      return <h4 className={`${baseClass}`}>{ props.children }</h4>
    default:
      return <h5 className={`${baseClass}`}>{ props.children }</h5>
  }
}

const renderLink = (props) => {
  if(props.href.includes('http')) {
    return(
      <span className="text-sm flex items-center">
        <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </svg>
        <a href={props.href} target="_blank" className="border-b border-dashed border-gray-700 hover:opacity-75">{props.children}</a>
        <svg className="fill-current text-gray-600 h-4 w-4 inline ml-1" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path></svg>
      </span>
    );
  }else {
    return(
      <span className="text-sm flex items-center">
        <svg className="fill-current text-gray-700 h-4 w-4 inline" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </svg>
        <Link href={props.href} target="_blank">
          <a className="border-b border-dashed border-gray-700 hover:opacity-75">{props.children}</a>
        </Link>
      </span>
    );
  }
}
