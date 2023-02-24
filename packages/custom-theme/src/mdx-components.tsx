import type { ReactNode, ReactElement, ComponentProps } from "react";
import { useEffect, useRef, useState, cloneElement, Children } from "react";
import "intersection-observer";
import type { Components } from "./helpers/mdx";
import { useSetActiveAnchor, DetailsProvider, useDetails } from "./contexts";
import { Collapse, Anchor } from "./components";
import type { DocsThemeConfig } from "./constants";
import { IS_BROWSER } from "./constants";
import cn from "clsx";
import { Code, Pre, Table, Td, Th, Tr } from "./components";

let observer: IntersectionObserver;
let setActiveAnchor: ReturnType<typeof useSetActiveAnchor>;
const slugs = new WeakMap();

if (IS_BROWSER) {
  observer ||= new IntersectionObserver(
    (entries) => {
      setActiveAnchor((f) => {
        const ret = { ...f };

        for (const entry of entries) {
          if (entry?.rootBounds && slugs.has(entry.target)) {
            const [slug, index] = slugs.get(entry.target);
            const aboveHalfViewport =
              entry.boundingClientRect.y + entry.boundingClientRect.height <=
              entry.rootBounds.y + entry.rootBounds.height;
            const insideHalfViewport = entry.intersectionRatio > 0;
            ret[slug] = {
              index,
              aboveHalfViewport,
              insideHalfViewport,
            };
          }
        }

        let activeSlug = "";
        let smallestIndexInViewport = Infinity;
        let largestIndexAboveViewport = -1;
        for (const s in ret) {
          ret[s].isActive = false;
          if (
            ret[s].insideHalfViewport &&
            ret[s].index < smallestIndexInViewport
          ) {
            smallestIndexInViewport = ret[s].index;
            activeSlug = s;
          }
          if (
            smallestIndexInViewport === Infinity &&
            ret[s].aboveHalfViewport &&
            ret[s].index > largestIndexAboveViewport
          ) {
            largestIndexAboveViewport = ret[s].index;
            activeSlug = s;
          }
        }

        if (ret[activeSlug]) ret[activeSlug].isActive = true;
        return ret;
      });
    },
    {
      rootMargin: "0px 0px -50%",
      threshold: [0, 1],
    }
  );
}

// Anchor links
function HeadingLink({
  tag: Tag,
  context,
  children,
  id,
  ...props
}: ComponentProps<"h2"> & {
  tag: `h${2 | 3 | 4 | 5 | 6}`;
  context: { index: number };
}): ReactElement {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- todo: fix React Hook "useSetActiveAnchor" is called conditionally
  setActiveAnchor ??= useSetActiveAnchor();
  const obRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!id) return;
    const heading = obRef.current;
    if (!heading) return;

    slugs.set(heading, [id, (context.index += 1)]);
    observer.observe(heading);

    return () => {
      observer.disconnect();
      slugs.delete(heading);
      setActiveAnchor((f) => {
        const ret = { ...f };
        delete ret[id];
        return ret;
      });
    };
  }, [id, context]);

  return (
    <Tag
      className={cn(
        "font-semibold tracking-tight text-slate-900 dark:text-slate-100",
        {
          h2: "mt-10 border-b pb-1 text-3xl border-neutral-200/70 contrast-more:border-neutral-400 dark:border-primary-100/10 contrast-more:dark:border-neutral-400",
          h3: "mt-8 text-2xl",
          h4: "mt-8 text-xl",
          h5: "mt-8 text-lg",
          h6: "mt-8 text-base",
        }[Tag]
      )}
      {...props}
    >
      {children}
      <span className="absolute -mt-20" id={id} ref={obRef} />
      <a
        href={`#${id}`}
        className="subheading-anchor"
        aria-label="Permalink for this section"
      />
    </Tag>
  );
}

const findSummary = (children: ReactNode) => {
  let summary: ReactNode = null;
  const restChildren: ReactNode[] = [];

  Children.forEach(children, (child, index) => {
    if (child && (child as ReactElement).type === Summary) {
      summary ||= child;
      return;
    }

    let c = child;
    if (
      !summary &&
      child &&
      typeof child === "object" &&
      (child as ReactElement).type !== Details &&
      "props" in child &&
      child.props
    ) {
      const result = findSummary(child.props.children);
      summary = result[0];
      c = cloneElement(child, {
        ...child.props,
        children: result[1]?.length ? result[1] : undefined,
        key: index,
      });
    }
    restChildren.push(c);
  });

  return [summary, restChildren];
};

const Details = ({
  children,
  open,
  ...props
}: ComponentProps<"details">): ReactElement => {
  const [openState, setOpen] = useState(!!open);
  const [summary, restChildren] = findSummary(children);

  // To animate the close animation we have to delay the DOM node state here.
  const [delayedOpenState, setDelayedOpenState] = useState(openState);
  useEffect(() => {
    if (openState) {
      setDelayedOpenState(true);
    } else {
      const timeout = setTimeout(() => setDelayedOpenState(openState), 500);
      return () => clearTimeout(timeout);
    }
  }, [openState]);

  return (
    <details
      className="my-4 rounded border border-gray-200 bg-white p-2 shadow-sm first:mt-0 dark:border-neutral-800 dark:bg-neutral-900"
      {...props}
      open={delayedOpenState}
      {...(openState && { "data-expanded": true })}
    >
      <DetailsProvider value={setOpen}>{summary}</DetailsProvider>
      <Collapse isOpen={openState}>{restChildren}</Collapse>
    </details>
  );
};

const Summary = (props: ComponentProps<"summary">): ReactElement => {
  const setOpen = useDetails();
  return (
    <summary
      className={cn(
        "cursor-pointer list-none p-1 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800",
        "before:mr-1 before:inline-block before:transition-transform before:content-[''] dark:before:invert",
        "rtl:before:rotate-180 [[data-expanded]>&]:before:rotate-90"
      )}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        setOpen((v) => !v);
      }}
    />
  );
};

const A = ({ href = "", ...props }) => (
  <Anchor href={href} newWindow={href.startsWith("https://")} {...props} />
);

export const getComponents = ({
  isRawLayout,
  components,
}: {
  isRawLayout?: boolean;
  components?: DocsThemeConfig["components"];
}): Components => {
  if (isRawLayout) {
    return { a: A };
  }

  const context = { index: 0 };
  return {
    h1: (props) => (
      <h1
        className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        {...props}
      />
    ),
    h2: (props) => <HeadingLink tag="h2" context={context} {...props} />,
    h3: (props) => <HeadingLink tag="h3" context={context} {...props} />,
    h4: (props) => <HeadingLink tag="h4" context={context} {...props} />,
    h5: (props) => <HeadingLink tag="h5" context={context} {...props} />,
    h6: (props) => <HeadingLink tag="h6" context={context} {...props} />,
    ul: (props) => (
      <ul
        className="mt-6 list-disc first:mt-0 ltr:ml-6 rtl:mr-6"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mt-6 list-decimal first:mt-0 ltr:ml-6 rtl:mr-6"
        {...props}
      />
    ),
    li: (props) => <li className="my-2" {...props} />,
    blockquote: (props) => (
      <blockquote
        className={cn(
          "mt-6 border-gray-300 italic text-gray-700 dark:border-gray-700 dark:text-gray-400",
          "first:mt-0 ltr:border-l-2 ltr:pl-6 rtl:border-r-2 rtl:pr-6"
        )}
        {...props}
      />
    ),
    hr: (props) => (
      <hr className="my-8 dark:border-gray-900" {...props} />
    ),
    a: (props) => (
      <A
        {...props}
        className="text-primary-600 underline decoration-from-font [text-underline-position:from-font]"
      />
    ),
    table: (props) => (
      <Table
        className="nextra-scrollbar mt-6 p-0 first:mt-0"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-6 leading-7 first:mt-0" {...props} />
    ),
    tr: Tr,
    th: Th,
    td: Td,
    details: Details,
    summary: Summary,
    pre: Pre,
    code: Code,
    ...components,
  };
};
