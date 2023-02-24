import type { ReactElement } from 'react'
import cn from 'clsx'
import { useConfig } from '../contexts'
import { LocaleSwitch } from './locale-switch'
import { ThemeSwitch } from './theme-switch'
import { renderComponent } from '../utils'

export function Footer({ menu }: { menu?: boolean }): ReactElement {
  const config = useConfig()
  return (
    <footer className="bg-gray-100 pb-[env(safe-area-inset-bottom)] dark:bg-neutral-900">
      <div
        className={cn(
          'mx-auto flex max-w-[90rem] gap-2 py-2 px-4',
          menu ? 'flex' : 'hidden'
        )}
      >
        {config.i18n.length > 0 && <LocaleSwitch options={config.i18n} />}
        {config.darkMode && <ThemeSwitch />}
      </div>
      <hr className="dark:border-neutral-800" />
      <div
        className={cn(
          'mx-auto flex max-w-[90rem] justify-center py-12 text-gray-600 dark:text-gray-400 md:justify-start',
          'pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]'
        )}
      >
        {renderComponent(config.footer.text)}
      </div>
    </footer>
  )
}
