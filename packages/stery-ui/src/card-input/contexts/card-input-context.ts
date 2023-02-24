import React from "react";
import { CardInputContextProps } from "../types";

const CardInputContext = React.createContext<CardInputContextProps>({
  acceptedCards: [],
  cvc: "",
  expiry: "",
  name: "",
  number: "",
  cardType: null
});

CardInputContext.displayName = "CardInputContext";

const useCardInputContext = () =>
  React.useContext<CardInputContextProps>(CardInputContext);

export { CardInputContext, useCardInputContext };
