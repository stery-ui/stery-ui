export type CardDetails = {
  name?: string;
  number?: string | number;
  expiry?: string;
  cvc?: string | number;
};

export type CardErrors = {
  number?: string;
  expiry?: string;
  cvc?: string;
};

export type CardInputProps = {
  acceptedCards?: string[];
  cvc: string | number;
  expiry: string;
  name: string;
  number: string | number;
  children?: any;
  onChange?: (card: CardDetails) => void;
};

export type CardInputContextProps = {
  acceptedCards?: string[];
  cvc: string | number;
  expiry: string;
  name: string;
  number: string | number;
  onChange?: (card: CardDetails) => void;
  cardType?: string | null
  setCardType?: React.Dispatch<React.SetStateAction<string | null>>
};

export type CardProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
