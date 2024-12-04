import { Link, useLocation } from 'react-router-dom'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Breadcrumb() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          return (
            <li key={name}>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <Link
                  to={routeTo}
                  className={`ml-4 text-sm font-medium ${
                    isLast ? 'text-gray-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}