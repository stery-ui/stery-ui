import React from "react";
import { useDatepickerContext } from "./contexts/datepicker-context";
import { dateFormat } from "../utils/date-format";
import { ActionTypes, useStateReducer } from "../utils/use-reducer";

interface T
  extends React.DOMAttributes<HTMLInputElement>,
    React.HTMLAttributes<HTMLInputElement>,
    React.ClassAttributes<HTMLInputElement>,
    React.Attributes {}
type InputElement = T & {
  value?: string;
};

type ForwardRefType = {
  props?: any;
  ref?: any;
  as?: keyof React.ReactHTML;
};

declare interface EventTarget {
  value?: string | null;
}

type PropsType<TRef, TProps> = React.ForwardRefRenderFunction<TRef, TProps>;

let matchMonths = "01|[0][1-9]|[1][0-2]";
let matchDays = "01|[0-2][1-9]|[1-2][0-2]|[3][0-1]";
let matchYears = "[0-9]{4}";
let matchSep = "[~._ -]{1}[~._ -]{1}";

// let matchInput = (str: string) => {
//     let match = str.match()
// }
export default function Input(e: InputElement): JSX.Element {
  // console.log(e)
  // let {ref, key} = e

  let context = useDatepickerContext();

  const { open, dispatch } = context;
  let defaultFormat = "MM/DD/YYYY";

  let events = {
    onChange: (e: React.ChangeEvent<InputElement>) => {
      console.log(e.target.value);
    },
    onKeyUp: (e: React.KeyboardEvent<InputElement>) => {
      // console.log(e, e.target.value, e.target.value.length, new RegExp('([\/\ \.\,\-])'))
    },
    onFocus: (e: React.FocusEvent<InputElement>) => {
      let stateAction = {
        type: ActionTypes.SetOpen,
        value: true,
      };
      dispatch({ ...stateAction });
    },
    onBlur: (e: React.FocusEvent<InputElement>) => {
      let stateAction = {
        type: ActionTypes.SetOpen,
        value: false,
      };
      dispatch({ ...stateAction });
    },
  };

  let stateProps = {
    "data-state-open": context.open ? "true" : "false",
    "data-format": context.format ?? defaultFormat,
  };

  let props = {
    ...e,
    ...events,
    ...stateProps,
  };

  // const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     console.log(e.key)
  // }

  //     return <input type="text" onKeyDown={handleChange} {...e} {...stateProps} />
  return React.createElement("input", props);
}
