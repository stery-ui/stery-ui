import { useDatepickerContext } from "./contexts/datepicker-context";
import { PanelProps } from "./types";

export default function Panel(e: PanelProps) {
    let context = useDatepickerContext()

    let stateProps = {
        'data-state-open': context.open ? 'true' : 'false',
    }

    let children = e.children
    
    let props = {
        ...e,
        ...stateProps
    }

    if(typeof children === 'function') {
        children = children(e)
    }

  return <div {...props}>{children}</div>;
}
