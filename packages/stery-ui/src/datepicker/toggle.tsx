import { useStateReducer } from "../utils/use-reducer"
import { useDatepickerContext } from "./contexts/datepicker-context"
import { ButtonElement, ChildrenProps, DatepickerStateProps, ToggleProps } from "./types"
import { ActionTypes } from "../utils/use-reducer"

export default function Toggle(e: ToggleProps) {
    let context = useDatepickerContext()

    const {open, dispatch} = context

    let events = {
        onClick: (el: React.MouseEvent<ButtonElement>) => {
            let stateAction = {
                type: ActionTypes.SetOpen,
                value: !(open ?? false)
            }
            dispatch({...stateAction})
            
            if(typeof e.onClick === 'function') {
                e.onClick(el)
            }
        }
    }

    let stateProps = {
        'data-state-open': open ?? 'false',
    }

    let className = e.className

    if(typeof className === 'function') {
        className = className(context)
    }
    let props = {
        className,
        ...stateProps,
        ...events
    }

    let children = e.children

    if(typeof children === 'function') {
        children = children(context)
    }

    return <button type="button" {...props}>{children}</button>
}