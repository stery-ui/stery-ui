import type { ReactElement, ReactNode } from 'react'
import cn from 'clsx'
import { Menu, Transition } from '@headlessui/react'
import { ArrowRightIcon, MenuIcon } from '../icons'

import { useConfig, useMenu } from '../contexts'
import type { Item, PageItem, MenuItem} from '../utils';
import { renderComponent, useFSRoute } from '../utils'
import { Anchor } from './anchor'

export type NavBarProps = {
  flatDirectories: Item[]
  items: (PageItem | MenuItem)[]
}

const classes = {
  link: cn(
    'text-sm contrast-more:text-gray-700 contrast-more:dark:text-gray-100'
  ),
  active: cn('font-medium subpixel-antialiased'),
  inactive: cn(
    'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
  )
}

function NavbarMenu({
  className,
  menu,
  children
}: {
  className?: string
  menu: MenuItem
  children: ReactNode
}): ReactElement {
  const { items } = menu
  const routes = Object.fromEntries(
    (menu.children || []).map(route => [route.name, route])
  )

  return (
    <div className="relative inline-block">
      <Menu>
        <Menu.Button
          className={cn(
            className,
            '-ml-2 hidden items-center whitespace-nowrap rounded p-2 md:inline-flex',
            classes.inactive
          )}
        >
          {children}
        </Menu.Button>
        <Transition
          leave="transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Menu.Items
            className="absolute right-0 z-20 mt-1 max-h-64 min-w-full overflow-auto rounded-md ring-1 ring-black/5 bg-white py-1 text-sm shadow-lg dark:ring-white/20 dark:bg-neutral-800"
            tabIndex={0}
          >
            {Object.entries(items || {}).map(([key, item]) => (
              <Menu.Item key={key}>
                <Anchor
                  href={
                    item.href || routes[key]?.route || menu.route + '/' + key
                  }
                  className={cn(
                    'relative hidden w-full select-none whitespace-nowrap text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 md:inline-block',
                    'py-1.5 transition-colors ltr:pl-3 ltr:pr-9 rtl:pr-3 rtl:pl-9'
                  )}
                  newWindow={item.newWindow}
                >
                  {item.title || key}
                </Anchor>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export function Navbar({ flatDirectories, items }: NavBarProps): ReactElement {
  const config = useConfig()
  const activeRoute = useFSRoute()
  const { menu, setMenu } = useMenu()

  return (
    <div className="nextra-nav-container sticky top-0 z-20 w-full bg-transparent">
      <div
        className={cn(
          'nextra-nav-container-blur',
          'pointer-events-none absolute z-[-1] h-full w-full bg-white dark:bg-dark',
          'shadow-[0_2px_4px_rgba(0,0,0,.02),0_1px_0_rgba(0,0,0,.06)] dark:shadow-[0_-1px_0_rgba(255,255,255,.1)_inset]',
          'contrast-more:shadow-[0_0_0_1px_#000] contrast-more:dark:shadow-[0_0_0_1px_#fff]'
        )}
      />
      <nav className="mx-auto flex h-[var(--nextra-navbar-height)] max-w-[90rem] items-center justify-end gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        {config.logoLink ? (
          <Anchor
            href={typeof config.logoLink === 'string' ? config.logoLink : '/'}
            className="flex items-center hover:opacity-75 ltr:mr-auto rtl:ml-auto"
          >
            {renderComponent(config.logo)}
          </Anchor>
        ) : (
          <div className="flex items-center ltr:mr-auto rtl:ml-auto">
            {renderComponent(config.logo)}
          </div>
        )}
        {items.map(pageOrMenu => {
          if (pageOrMenu.display === 'hidden') return null

          if (pageOrMenu.type === 'menu') {
            const menu = pageOrMenu as MenuItem

            const isActive =
              menu.route === activeRoute ||
              activeRoute.startsWith(menu.route + '/')

            return (
              <NavbarMenu
                key={menu.title}
                className={cn(
                  classes.link,
                  'flex gap-1',
                  isActive ? classes.active : classes.inactive
                )}
                menu={menu}
              >
                {menu.title}
                <ArrowRightIcon
                  className="h-[18px] min-w-[18px] rounded-sm p-0.5"
                  pathClassName="origin-center transition-transform rotate-90"
                />
              </NavbarMenu>
            )
          }
          const page = pageOrMenu as PageItem
          let href = page.href || page.route || '#'

          // If it's a directory
          if (page.children) {
            href =
              (page.withIndexPage ? page.route : page.firstChildRoute) || href
          }

          const isActive =
            page.route === activeRoute ||
            activeRoute.startsWith(page.route + '/')

          return (
            <Anchor
              href={href}
              key={href}
              className={cn(
                classes.link,
                'relative -ml-2 hidden whitespace-nowrap p-2 md:inline-block',
                !isActive || page.newWindow ? classes.inactive : classes.active
              )}
              newWindow={page.newWindow}
              aria-current={!page.newWindow && isActive}
            >
              <span className="absolute inset-x-0 text-center">
                {page.title}
              </span>
              <span className="invisible font-medium">{page.title}</span>
            </Anchor>
          )
        })}

        {renderComponent(config.search.component, {
          directories: flatDirectories,
          className: 'hidden md:inline-block mx-min-w-[200px]'
        })}

        {config.project.link ? (
          <Anchor
            className="p-2 text-current"
            href={config.project.link}
            newWindow
          >
            {renderComponent(config.project.icon)}
          </Anchor>
        ) : null}

        {config.chat.link ? (
          <Anchor
            className="p-2 text-current"
            href={config.chat.link}
            newWindow
          >
            {renderComponent(config.chat.icon)}
          </Anchor>
        ) : null}

        {renderComponent(config.navbar.extraContent)}

        <button
          type="button"
          aria-label="Menu"
          className="nextra-hamburger -mr-2 rounded p-2 active:bg-gray-400/20 md:hidden"
          onClick={() => setMenu(!menu)}
        >
          <MenuIcon className={cn({ open: menu })} />
        </button>
      </nav>
    </div>
  )
}
