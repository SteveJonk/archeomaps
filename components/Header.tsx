import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import Logo from '@/data/logo.svg'
import { SetLocationProps } from 'pages'
import { useRouter } from 'next/router'

export function Header({ currentLocation, setCurrentLocation }: HeaderProps) {
  const router = useRouter()

  function onResetLocation() {
    setCurrentLocation(null)
    router.replace('/')
  }

  return (
    <header className="sticky top-0 z-10 mx-auto flex w-full justify-between bg-white px-4 py-6 dark:bg-gray-900 sm:px-6 xl:px-0">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        {currentLocation && (
          <button
            className="mr-4 rounded-sm bg-white px-4 py-2 text-black"
            onClick={onResetLocation}
          >
            Terug naar overzicht
          </button>
        )}
      </div>
    </header>
  )
}

type HeaderProps = SetLocationProps
