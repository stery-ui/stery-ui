import type { ReactElement } from 'react'
import { XIcon } from '../icons'
import cn from 'clsx'
import { useConfig } from '../contexts'
import { renderComponent } from '../utils'

export function Banner(): ReactElement | null {
  const { banner } = useConfig()
  if (!banner.text) {
    return null
  }
  const hideBannerScript = `try{if(localStorage.getItem(${JSON.stringify(
    banner.key
  )})==='0'){document.body.classList.add('nextra-banner-hidden')}}catch(e){}`

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: hideBannerScript }} />
      <div
        className={cn(
          'nextra-banner-container sticky top-0 z-20 flex items-center md:relative',
          'h-[var(--nextra-banner-height)] [body.nextra-banner-hidden_&]:hidden',
          'text-slate-50 dark:text-white bg-neutral-900 dark:bg-[linear-gradient(1deg,#383838,#212121)]',
          'px-2 ltr:pl-10 rtl:pr-10'
        )}
      >
        <div className="w-full truncate px-4 text-center font-medium text-sm">
          {renderComponent(banner.text)}
        </div>
        {banner.dismissible && (
          <button
            type="button"
            aria-label="Dismiss banner"
            className="w-8 h-8 opacity-80 hover:opacity-100"
            onClick={() => {
              try {
                localStorage.setItem(banner.key, '0')
              } catch {
                /* ignore */
              }
              document.body.classList.add('nextra-banner-hidden')
            }}
          >
            <XIcon className="mx-auto h-4 w-4" />
          </button>
        )}
      </div>
    </>
  )
}
