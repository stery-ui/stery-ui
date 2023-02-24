import { useState } from "react";
import { CardInputContext } from "../contexts/card-input-context";
import { CardInputProps } from "../types";

declare global {
  interface EventTarget {
    value?: any;
  }
}

export default function CardInput({ children, ...props }: CardInputProps) {
  const [cardType, setCardType] = useState<string | null>(null);

  let mergedProps = {
    ...props,
    cardType,
    setCardType,
  };

  return (
    <CardInputContext.Provider value={mergedProps}>
      {children}
    </CardInputContext.Provider>
  );
}
