import React, { useEffect } from "react";
import { DatepickerContext } from "./contexts/datepicker-context";
import { DatepickerProps } from "./types";
import { useStateReducer } from "../utils/use-reducer";


export const render = (props: DatepickerProps): React.ReactNode => {

  let {children} = props

  if(typeof children === 'undefined') {
    throw Error(`<Datepicker/> component is expected to have a child component\nTry adding a \`<Datepicker.Input/>\``)
  }

  
  if(typeof children === 'function') {
    let slotProps = children(props)
    return slotProps
  }
  return children
}

export default function Datepicker(props: DatepickerProps) {

  const {state, dispatch} = useStateReducer({open: (props.open ?? false)})

  console.group('Datepicker')
  console.log(state)
  console.groupEnd()

  let renderProps = {
    open: state.open ?? false,
    format: state.format ?? 'MM/DD/YYYY',
    dispatch,
  }  
  
  return (
    <DatepickerContext.Provider value={renderProps}>
      {render(props)}
    </DatepickerContext.Provider>
  );
}
