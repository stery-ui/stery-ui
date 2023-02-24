import React, { HTMLInputTypeAttribute } from "react";
import { omit } from "../../utils/omit";
import type { CardDetails, CardProps } from "../types";
import { numericEntry } from "../../utils/cc-splitter";
import { useCardInputContext } from "../contexts/card-input-context";

export default function CardCvc(props: CardProps) {
  const context = useCardInputContext();

  const dispatchCvc = (str?: string) => {
    if (typeof context.onChange === "function") {
      let cardDetails: CardDetails = {
        name: context.name,
        cvc: str,
        expiry: context.expiry,
        number: context.number,
      };
      context.onChange(cardDetails);
    }
  };

  let events = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(numericEntry(e.target.value))
      e.target.value = numericEntry(e.target.value);

      dispatchCvc(e.target.value)
      if (typeof props.onChange === "function") {
        props.onChange(e);
      }
    },
  };

  let theirProps = omit(props, ["onChange"]);

  let mergedProps = {
    ...theirProps,
    ...events,
    type: "tel",
    maxLength: 4,
  };
  return <input {...mergedProps} />;
}
