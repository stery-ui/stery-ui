import React from "react";

type DatepickerContextProps = {
  open?: boolean;
  format?: string | undefined;
  dispatch: CallableFunction,
};
const DatepickerContext = React.createContext<DatepickerContextProps>({
  open: false,
  format: undefined,
  dispatch: (p: any) => {},
});

DatepickerContext.displayName = "DatepickerContext";

const useDatepickerContext = () =>
  React.useContext<DatepickerContextProps>(DatepickerContext);

export { DatepickerContext, useDatepickerContext };
