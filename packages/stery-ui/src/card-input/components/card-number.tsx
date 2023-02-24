import React from "react";
import { omit } from "../../utils/omit";
import { splitCardNumber } from "../../utils/cc-splitter";
import { CardDetails, CardProps } from "../types";
import { useCardInputContext } from "../contexts/card-input-context";
import Payment from 'payment';

export default function CardNumber(props: CardProps) {
  const context = useCardInputContext();

  const dispatchNumber = (str?: string) => {
    if (typeof context.onChange === "function") {
      let cardDetails: CardDetails = {
        name: str,
        cvc: context.cvc,
        expiry: context.expiry,
        number: context.number,
      };
      context.onChange(cardDetails);
    }
  };

  let events = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = splitCardNumber(e.target.value);
      if(typeof context.setCardType === 'function') {
          context.setCardType(Payment.fns.cardType(e.target.value))
      }
      dispatchNumber(e.target.value);
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
    maxLength: 22,
  };
  return <input {...mergedProps} />;
}
