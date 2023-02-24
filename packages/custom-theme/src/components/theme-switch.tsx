import type { ReactElement } from 'react'

import { SunIcon, MoonIcon } from '../icons'
import { useMounted } from '../hooks'
import { useTheme } from 'next-themes'
import cn from 'clsx'

import { Select } from './select'

type ThemeSwitchProps = {
  lite?: boolean
  className?: string
}

const OPTIONS = [
  { key: 'light', name: 'Light' },
  { key: 'dark', name: 'Dark' },
  { key: 'system', name: 'System' }
]

export function ThemeSwitch({
  lite,
  className
}: ThemeSwitchProps): ReactElement {
  const { setTheme, resolvedTheme, theme = '' } = useTheme()
  const mounted = useMounted()
  const IconToUse = mounted && resolvedTheme === 'dark' ? MoonIcon : SunIcon
  return (
    <div className={cn('relative', className)}>
      <Select
        title="Change theme"
        className="w-full"
        options={OPTIONS}
        onChange={option => {
          setTheme(option.key)
        }}
        selected={{
          key: theme,
          name: (
            <div className="flex items-center gap-2 capitalize">
              <IconToUse />
              <span className={lite ? 'md:hidden' : ''}>
                {mounted ? theme : 'light'}
              </span>
            </div>
          )
        }}
      />
    </div>
  )
}
