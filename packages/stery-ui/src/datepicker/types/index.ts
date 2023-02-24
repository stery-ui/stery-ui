export type DatepickerStateProps = {
  open?: boolean;
};

export type ChildrenProps<T = any> =
  | string
  | number
  | React.ReactNode
  | ((states: T) => React.ReactNode);

export type DatepickerProps = {
  open?: boolean;
  format?: string | undefined;
  children?: ChildrenProps<DatepickerStateProps>;
};

interface DivElement
  extends React.DOMAttributes<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement>,
    React.ClassAttributes<HTMLDivElement>,
    React.Attributes {}

export interface ButtonElement
  extends React.DOMAttributes<HTMLButtonElement>,
    React.HTMLAttributes<HTMLButtonElement>,
    React.ClassAttributes<HTMLButtonElement>,
    React.Attributes {}
export type PanelProps = DivElement & {
  open?: boolean;
  children?: ChildrenProps<DatepickerStateProps>;
};

interface T
  extends React.DOMAttributes<HTMLInputElement>,
    React.HTMLAttributes<HTMLInputElement>,
    React.ClassAttributes<HTMLInputElement>,
    React.Attributes {}
type InputElement = T & {
  value?: string;
};

export type ToggleProps = Omit<ButtonElement, "onClick" | 'className'> & {
  open?: boolean;
  className?: string | undefined | ((state: DatepickerStateProps) => string);
  children?: ChildrenProps | undefined;
  onClick?: (e: React.MouseEvent<ButtonElement>) => void;
};
