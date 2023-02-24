import React, { HTMLInputTypeAttribute } from "react";
import { splitExpiry } from "../../utils/cc-splitter";
import { omit } from "../../utils/omit";
import type { CardDetails, CardProps } from "../types";
import { useCardInputContext } from "../contexts/card-input-context";

export default function CardExpiry(props: CardProps) {
  const context = useCardInputContext();

  const dispatchExpiry = (str?: string) => {
    if (typeof context.onChange === "function") {
      let cardDetails: CardDetails = {
        name: context.name,
        cvc: context.cvc,
        expiry: str,
        number: context.number,
      };
      context.onChange(cardDetails);
    }
  };

  let events = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = splitExpiry(e.target.value);

      dispatchExpiry(e.target.value);

      if (typeof props.onChange === "function") {
        props.onChange(e);
      }
    },
  };

  let theirProps = omit(props, ["onChange", "maxLength", "type"]);

  let mergedProps = {
    ...theirProps,
    ...events,
  };

  return <input type="tel" maxLength={5} {...mergedProps} />;
}
